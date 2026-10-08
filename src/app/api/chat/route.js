import { NextResponse } from 'next/server';
import { site } from '@/data/site';
import { buildSystemPrompt } from '@/lib/server/chat-knowledge';
import { sendSubmission } from '@/lib/server/mailer';
import { clean, clientIp, isEmail } from '@/lib/server/request';

// Website chatbot, powered by Google Gemini. The browser sends the visible conversation (text only); this streams
// the reply back as newline-delimited JSON: {"t":"text","v":"..."} chunks, {"t":"lead","ok":true} when a lead was
// sent, then {"t":"done"} or {"t":"error","v":"..."}.
// Needs GEMINI_API_KEY on the server. Several keys can be given, comma-separated: when one is out of quota or
// failing, the next one is tried.

export const maxDuration = 60;

const MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';
// Used when the main model is overloaded (Gemini returns 503 "high demand" fairly often).
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || 'gemini-flash-lite-latest';
const API = process.env.GEMINI_API_BASE || 'https://generativelanguage.googleapis.com/v1beta/models';
const MAX_TURNS = 20; // visible messages kept from the conversation
const MAX_CHARS = 2000; // per visitor message
const MAX_TOOL_ROUNDS = 2;

const SYSTEM = { parts: [{ text: buildSystemPrompt() }] };

const LEAD_TOOL = {
  functionDeclarations: [
    {
      name: 'submit_lead',
      description:
        "Send the visitor's contact details and project summary to the Logo Makers Pro team so they can follow up with a quote or to take an order. Use it once you have the visitor's name, email and a short description of what they need.",
      parameters: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING', description: "The visitor's name." },
          email: { type: 'STRING', description: "The visitor's email address." },
          phone: { type: 'STRING', description: 'Phone number, or an empty string if they did not give one.' },
          package_interest: { type: 'STRING', description: 'Package or service they are interested in, or an empty string.' },
          project: { type: 'STRING', description: 'Short summary of what they need, in their words where possible.' },
        },
        required: ['name', 'email', 'project'],
      },
    },
  ],
};

const apiKeys = () =>
  (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);

// Rotates the starting key between requests so the load spreads across keys.
let keyCursor = 0;

// Best-effort per-IP limit (per server instance): 30 messages per 10 minutes.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 30;
}

/** Keep only well-formed text turns, starting and ending with the visitor. */
function sanitize(messages) {
  if (!Array.isArray(messages)) return null;
  const turns = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: clean(m.content, MAX_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_TURNS);
  while (turns.length && turns[0].role !== 'user') turns.shift();
  if (!turns.length || turns.at(-1).role !== 'user') return null;
  return turns;
}

const transcriptOf = (turns) =>
  turns.map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n\n').slice(-6000);

async function submitLead(input, { turns, ip, pageUrl }) {
  const name = clean(input?.name, 200);
  const email = clean(input?.email, 200);
  const project = clean(input?.project, 3000);
  if (!name || !isEmail(email) || !project) {
    return { ok: false, error: 'Missing or invalid name, email or project summary. Ask the visitor for what is missing.' };
  }
  try {
    await sendSubmission({
      subject: `New chatbot lead: ${name}`,
      replyTo: email,
      fields: {
        Name: name,
        Email: email,
        Phone: clean(input?.phone, 50),
        'Interested in': clean(input?.package_interest, 200),
        Project: project,
        Form: 'chatbot',
        Page: clean(pageUrl, 500),
        IP: ip,
        Transcript: transcriptOf(turns),
      },
    });
    return { ok: true };
  } catch (err) {
    console.error('chatbot lead mail failed', err);
    return { ok: false, error: 'The lead could not be sent. Give the visitor the phone number and email instead.' };
  }
}

class GeminiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Starts a streaming request. On quota, auth or server errors it tries the next key; when the model is overloaded it
 * retries once after a short pause, then moves to the fallback model.
 */
async function openStream(contents, signal) {
  const keys = apiKeys();
  const start = keyCursor++ % keys.length;
  const models = [...new Set([MODEL, FALLBACK_MODEL].filter(Boolean))];
  const attempts = models.flatMap((model, m) =>
    keys.flatMap((_, i) => {
      const key = keys[(start + i) % keys.length];
      // The main model gets a second try on the first key, since overload spikes are usually brief.
      return m === 0 && i === 0 ? [{ model, key }, { model, key, wait: 1000 }] : [{ model, key }];
    }),
  );
  let lastError;
  for (const { model, key, wait } of attempts) {
    if (wait) await sleep(wait);
    const res = await fetch(`${API}/${model}:streamGenerateContent?alt=sse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: SYSTEM,
        contents,
        tools: [LEAD_TOOL],
        generationConfig: { maxOutputTokens: 2048, temperature: 0.4 },
      }),
      signal,
    });
    if (res.ok && res.body) return res;
    const detail = await res.text().catch(() => '');
    lastError = new GeminiError(res.status, `Gemini ${model} ${res.status}: ${detail.slice(0, 300)}`);
    // 400 is a bad request: another key or model won't help.
    if (res.status === 400) break;
  }
  throw lastError;
}

/** Reads one streamed reply. Calls onText for each text chunk; returns the model turn and its function calls. */
async function readStream(res, onText) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  const parts = [];
  let finishReason = '';
  let blocked = false;
  let buffer = '';

  const handle = (data) => {
    const chunk = JSON.parse(data);
    if (chunk.promptFeedback?.blockReason) blocked = true;
    const cand = chunk.candidates?.[0];
    if (!cand) return;
    if (cand.finishReason) finishReason = cand.finishReason;
    for (const part of cand.content?.parts || []) {
      if (part.thought) continue;
      if (typeof part.text === 'string' && part.text) onText(part.text);
      // Parts go back to the model exactly as received (function calls carry signatures Gemini checks).
      parts.push(part);
    }
  };

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop();
    for (const event of events) {
      const data = event
        .split(/\r?\n/)
        .filter((l) => l.startsWith('data:'))
        .map((l) => l.slice(5).trim())
        .join('');
      if (data) handle(data);
    }
  }
  if (buffer.trim().startsWith('data:')) handle(buffer.trim().slice(5).trim());

  return {
    content: { role: 'model', parts },
    calls: parts.filter((p) => p.functionCall).map((p) => p.functionCall),
    finishReason,
    blocked,
  };
}

export async function POST(request) {
  if (!apiKeys().length) {
    return NextResponse.json({ ok: false, error: 'Chat is not available right now.' }, { status: 503 });
  }
  const ip = clientIp(request);
  if (rateLimited(ip || 'unknown')) {
    return NextResponse.json({ ok: false, error: 'Too many messages. Please wait a few minutes.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  const turns = sanitize(body?.messages);
  if (!turns) return NextResponse.json({ ok: false, error: 'Invalid conversation.' }, { status: 400 });
  const pageUrl = clean(body?.pageUrl, 500);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj) => controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`));
      const contents = turns.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }));
      try {
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          let wrote = false;
          const res = await openStream(contents, request.signal);
          const reply = await readStream(res, (text) => {
            wrote = true;
            send({ t: 'text', v: text });
          });

          if (reply.blocked || reply.finishReason === 'SAFETY' || reply.finishReason === 'PROHIBITED_CONTENT') {
            send({ t: 'text', v: `Sorry, I can't help with that here. For anything else, call us on ${site.phone}.` });
            break;
          }
          // No function call (or one cut off by the token limit) ends the turn.
          if (!reply.calls.length || reply.finishReason === 'MAX_TOKENS') break;

          contents.push(reply.content);
          const responses = [];
          for (const call of reply.calls) {
            const result =
              call.name === 'submit_lead'
                ? await submitLead(call.args, { turns, ip, pageUrl })
                : { ok: false, error: 'Unknown tool.' };
            if (call.name === 'submit_lead') send({ t: 'lead', ok: result.ok });
            responses.push({ functionResponse: { name: call.name, ...(call.id ? { id: call.id } : {}), response: result } });
          }
          contents.push({ role: 'user', parts: responses });
          if (wrote) send({ t: 'text', v: '\n\n' });
        }
        send({ t: 'done' });
      } catch (err) {
        if (request.signal.aborted) {
          // Visitor closed the chat or navigated away.
        } else if (err instanceof GeminiError && err.status === 429) {
          console.error('chatbot quota', err.message);
          send({ t: 'error', v: 'The assistant is busy right now. Please try again in a moment.' });
        } else {
          console.error('chatbot error', err);
          send({ t: 'error', v: 'Something went wrong. Please try again, or call us.' });
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
