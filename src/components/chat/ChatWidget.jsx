'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CHAT_OPEN_EVENT } from '@/lib/chat';
import { site } from '@/data/site';
import { useUI } from '@/components/ui/UIContext';

const STORAGE_KEY = 'lmp_chat';
const GREETING = 'Hi! I can answer questions about our logo, website and branding packages, prices and timelines, or pass your project to our team. What are you working on?';
const SUGGESTIONS = ['How much does a logo cost?', 'Which website package is right for me?', 'How long does a logo take?', 'I’d like a quote'];

const track = (event, params) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', event, params);
};

function loadSaved() {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || 'null');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

/** Assistant text: line breaks (kept as \n, the bubble is pre-wrap), plus [label](/path) links to pages on this site. Anything else stays plain text. */
function RichText({ text }) {
  return text.split('\n').map((line, i, all) => {
    const parts = [];
    const re = /\[([^\]]+)\]\((\/[^\s)]*)\)/g;
    let last = 0;
    let m;
    while ((m = re.exec(line))) {
      if (m.index > last) parts.push(line.slice(last, m.index));
      parts.push(
        <Link key={m.index} href={m[2]}>
          {m[1]}
        </Link>,
      );
      last = m.index + m[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return (
      <Fragment key={i}>
        {parts.map((p) => (typeof p === 'string' ? p.replace(/\*\*/g, '') : p))}
        {i < all.length - 1 && '\n'}
      </Fragment>
    );
  });
}

/**
 * Site-wide AI assistant (replaces the Zendesk messenger). Streams replies from /api/chat, keeps the conversation
 * for the browser session, and opens from the bubble or any "Let's talk" button (window event CHAT_OPEN_EVENT).
 */
export default function ChatWidget() {
  const { openQuote } = useUI();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => setMessages(loadSaved()), []);
  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      // Storage blocked: the conversation just won't survive a page reload.
    }
  }, [messages]);

  const show = useCallback((source) => {
    setOpen(true);
    track('chat_open', { source });
  }, []);

  useEffect(() => {
    const onOpen = () => show('button');
    window.addEventListener(CHAT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, onOpen);
  }, [show]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text) {
    const content = text.trim();
    if (!content || busy) return;
    const history = [...messages, { role: 'user', content }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);
    track('chat_message', { count: history.filter((m) => m.role === 'user').length });

    const append = (delta) =>
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { ...next[next.length - 1], content: next[next.length - 1].content + delta };
        return next;
      });

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, pageUrl: window.location.href }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const json = await res.json().catch(() => ({}));
        if (res.status === 503) setUnavailable(true);
        throw new Error(json.error || 'Something went wrong. Please try again.');
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.trim()) continue;
          const evt = JSON.parse(line);
          if (evt.t === 'text') append(evt.v);
          else if (evt.t === 'error') append(`${evt.v}`);
          else if (evt.t === 'lead' && evt.ok) {
            track('generate_lead', { form: 'chatbot' });
            if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') append(err.message);
    } finally {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && !last.content.trim()) {
          const next = [...prev];
          next[next.length - 1] = { ...last, content: `Sorry, I couldn’t reply just now. You can call us on ${site.phone}.` };
          return next;
        }
        return prev;
      });
      setBusy(false);
      abortRef.current = null;
    }
  }

  return (
    <>
      <button
        type="button"
        className={`lmp-chat-launcher${open ? ' is-hidden' : ''}`}
        aria-label="Chat with us"
        onClick={() => show('bubble')}
      >
        <i className="fa-solid fa-comments" aria-hidden="true" />
        <span>Chat with us</span>
      </button>

      {open && (
        <section className="lmp-chat" role="dialog" aria-label="Chat with Logo Makers Pro">
          <header className="lmp-chat__header">
            <div>
              <p className="lmp-chat__title">Logo Makers Pro assistant</p>
              <p className="lmp-chat__subtitle">Ask about packages, prices and timelines</p>
            </div>
            <button type="button" className="lmp-chat__close" aria-label="Close chat" onClick={() => setOpen(false)}>
              ×
            </button>
          </header>

          <div className="lmp-chat__list" ref={listRef} aria-live="polite">
            <div className="lmp-chat__msg lmp-chat__msg--assistant">{GREETING}</div>
            {messages.map((m, i) => (
              <div key={i} className={`lmp-chat__msg ${m.role === 'user' ? 'lmp-chat__msg--user' : 'lmp-chat__msg--assistant'}`}>
                {m.role === 'assistant' ? (
                  m.content ? <RichText text={m.content} /> : <span className="lmp-chat__typing" aria-label="Typing" />
                ) : (
                  m.content
                )}
              </div>
            ))}
            {messages.length === 0 && !unavailable && (
              <div className="lmp-chat__suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {unavailable && (
              <div className="lmp-chat__fallback">
                <a href={`tel:${site.phoneE164}`}>Call {site.phone}</a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openQuote();
                  }}
                >
                  Get a free quote
                </button>
              </div>
            )}
          </div>

          <form
            className="lmp-chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="lmp-chat-input" className="visually-hidden">
              Your message
            </label>
            <textarea
              id="lmp-chat-input"
              ref={inputRef}
              rows={1}
              maxLength={2000}
              placeholder="Type your question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
            </button>
          </form>
          <p className="lmp-chat__note">
            AI assistant: it can make mistakes, and our team confirms every quote and order. Prefer a person? Call{' '}
            <a href={`tel:${site.phoneE164}`}>{site.phone}</a>.
          </p>
        </section>
      )}
    </>
  );
}
