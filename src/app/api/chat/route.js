import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { site } from '@/data/site';
import { buildSystemPrompt } from '@/lib/server/chat-knowledge';
import { sendSubmission } from '@/lib/server/mailer';
import { clean, clientIp, isEmail } from '@/lib/server/request';

// Website chatbot. The browser sends the visible conversation (text only); this streams the reply back as
// newline-delimited JSON: {"t":"text","v":"..."} chunks, {"t":"lead","ok":true} when a lead was sent, then
// {"t":"done"} or {"t":"error","v":"..."}. Needs ANTHROPIC_API_KEY on the server.

export const maxDuration = 60;

const MODEL = 'claude-opus-5-5';
const MAX_TURNS = 20; // visible messages kept from the conversation
const MAX_CHARS = 2000; // per visitor message
const MAX_TOOL_ROUNDS = 2;

// The prompt never changes between requests, so build it once and let prompt caching reuse it.
const SYSTEM = [{ type: 'text', text: buildSystemPrompt(), cache_control: { type: 'ephemeral' } }];

const LEAD_TOOL = {
  name: 'submit_lead',
  description:
    "Send the visitor's contact details and project summary to the Logo Makers Pro team so they can follow up with a quote or to take an order. Use it once you have the visitor's name, email and a short description of what they need.",
  strict: true,
  eager_input_streaming: true,
  input_schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      name: { type: 'string', description: "The visitor's name." },
      email: { type: 'string', description: "The visitor's email address." },
      phone: { type: 'string', description: 'Phone number, or an empty string if they did not give one.' },
      package_interest: { type: 'string', description: 'Package or service they are interested in, or an empty string.' },
      project: { type: 'string', description: 'Short summary of what they need, in their words where possible.' },
    },
    required: ['name', 'email', 'phone', 'package_interest', 'project'],
  },
};

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

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) {
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

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj) => controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`));
      // Within one request the conversation is append-only: each assistant turn goes back exactly as returned.
      const messages = turns.map((m) => ({ role: m.role, content: m.content }));
      try {
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          const reply = client.beta.messages.stream(
            {
              model: MODEL,
              max_tokens: 4096,
              betas: ['server-side-fallback-2026-07-01'],
              fallbacks: 'default',
              output_config: { effort: 'low' },
              system: SYSTEM,
              tools: [LEAD_TOOL],
              messages,
            },
            { signal: request.signal },
          );
          reply.on('text', (delta) => send({ t: 'text', v: delta }));

          let message;
          try {
            message = await reply.finalMessage();
          } catch (err) {
            if (err instanceof Anthropic.APIError) throw err;
            // A tool input that could not be parsed at all: ask once more.
            if (round < MAX_TOOL_ROUNDS) continue;
            throw err;
          }

          if (message.stop_reason === 'refusal') {
            send({ t: 'text', v: `Sorry, I can't help with that here. For anything else, call us on ${site.phone}.` });
            break;
          }
          // Anything but a complete tool call (end_turn, or max_tokens cutting a tool input off) ends the turn.
          const toolUses = message.content.filter((b) => b.type === 'tool_use');
          if (message.stop_reason !== 'tool_use' || !toolUses.length) break;

          messages.push({ role: 'assistant', content: message.content });
          const results = [];
          for (const tool of toolUses) {
            const result =
              tool.name === 'submit_lead'
                ? await submitLead(tool.input, { turns, ip, pageUrl })
                : { ok: false, error: 'Unknown tool.' };
            if (tool.name === 'submit_lead') send({ t: 'lead', ok: result.ok });
            results.push({
              type: 'tool_result',
              tool_use_id: tool.id,
              content: JSON.stringify(result),
              ...(result.ok ? {} : { is_error: true }),
            });
          }
          messages.push({ role: 'user', content: results });
          send({ t: 'text', v: '\n\n' });
        }
        send({ t: 'done' });
      } catch (err) {
        if (request.signal.aborted) {
          // Visitor closed the chat or navigated away.
        } else if (err instanceof Anthropic.RateLimitError) {
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
