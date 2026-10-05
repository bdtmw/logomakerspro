'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { leadOffer } from '@/data/site';
import { getRecaptchaToken, loadRecaptcha } from '@/lib/recaptcha-client';
import { useUI } from './UIContext';

export const OFFER_STORAGE_KEY = 'lmp_offer';

/** { state: 'dismissed' | 'claimed', at, code? } from localStorage, or null (also when storage is blocked). */
export function readOfferState() {
  try {
    return JSON.parse(window.localStorage.getItem(OFFER_STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

function writeOfferState(value) {
  try {
    window.localStorage.setItem(OFFER_STORAGE_KEY, JSON.stringify({ ...value, at: Date.now() }));
  } catch {
    // Storage blocked (private mode): the popup may show again next visit, which is acceptable.
  }
}

function shouldOffer() {
  const saved = readOfferState();
  if (!saved) return true;
  if (saved.state === 'claimed') return false;
  return Date.now() - (saved.at || 0) > leadOffer.snoozeDays * 86400000;
}

/**
 * Lead magnet: "Get N% off your first package" popup. Opens once per visit after leadOffer.delayMs, or earlier on
 * exit intent (desktop only). On phones it is a bottom sheet so it never covers the whole page.
 */
export default function OfferPopup() {
  const pathname = usePathname();
  const { quoteOpen } = useUI();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const shown = useRef(false);
  const blocked = useRef(false);
  const emailRef = useRef(null);
  const lastFocus = useRef(null);

  // Read the latest page and quote-popup state inside timers/listeners without re-arming them.
  blocked.current = quoteOpen || leadOffer.excludePaths.includes(pathname);

  const show = useCallback(() => {
    if (shown.current || blocked.current || !shouldOffer()) return;
    shown.current = true;
    lastFocus.current = document.activeElement;
    setOpen(true);
    if (typeof window.gtag === 'function') window.gtag('event', 'view_promotion', { promotion_name: 'discount_popup' });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (!result) writeOfferState({ state: 'dismissed' });
    lastFocus.current?.focus?.();
  }, [result]);

  useEffect(() => {
    if (!leadOffer.enabled || !shouldOffer()) return undefined;
    const timer = setTimeout(show, leadOffer.delayMs);
    const desktop = window.matchMedia('(pointer: fine)').matches;
    const onLeave = (e) => {
      if (!e.relatedTarget && e.clientY <= 0) show();
    };
    if (desktop) document.addEventListener('mouseout', onLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [show]);

  useEffect(() => {
    if (!open) return undefined;
    emailRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus({ state: 'sending', message: '' });
    try {
      const recaptchaToken = await getRecaptchaToken('offer');
      const res = await fetch('/api/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, pageUrl: window.location.href, recaptchaToken }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      writeOfferState({ state: 'claimed', code: json.code });
      setResult(json);
      setStatus({ state: 'idle', message: '' });
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'Discount popup' });
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form: 'discount_popup', page: pathname });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
    } catch {
      // Clipboard blocked: the code is on screen and in their inbox.
    }
  }

  if (!open) return null;

  return (
    <div className="lmp-offer" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="lmp-offer__dialog" role="dialog" aria-modal="true" aria-labelledby="lmp-offer-title">
        <button className="lmp-offer__close" type="button" aria-label="Close" onClick={close}>
          ×
        </button>
        {result ? (
          <div className="lmp-offer__done">
            <p className="lmp-offer__eyebrow">You&apos;re in</p>
            <p className="lmp-offer__title" id="lmp-offer-title">
              Here&apos;s your {result.percent}% off code
            </p>
            <div className="lmp-offer__code">
              <span>{result.code}</span>
              <button type="button" onClick={copyCode}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="lmp-offer__text">
              We&apos;ve emailed it to you too. Enter it at checkout on any package.
            </p>
            <Link href="/packages" className="lmp-offer__submit" onClick={close}>
              Browse packages
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} onFocus={() => loadRecaptcha()}>
            <p className="lmp-offer__eyebrow">Limited offer</p>
            <p className="lmp-offer__title" id="lmp-offer-title">
              Get {leadOffer.percent}% off your first package
            </p>
            <p className="lmp-offer__text">
              Logo, website or branding: join our list and we&apos;ll send your discount code straight away.
            </p>
            <input id="lmp-offer-name" name="name" type="text" placeholder="Name" aria-label="Name" autoComplete="name" />
            <input
              ref={emailRef}
              id="lmp-offer-email"
              name="email"
              type="email"
              placeholder="Email *"
              aria-label="Email"
              autoComplete="email"
              required
            />
            <button className="lmp-offer__submit" type="submit" disabled={status.state === 'sending'}>
              {status.state === 'sending' ? 'Sending…' : 'Send my code'}
            </button>
            {status.message && (
              <p className={`form-status form-status--${status.state}`} role="status" aria-live="polite">
                {status.message}
              </p>
            )}
            <button className="lmp-offer__decline" type="button" onClick={close}>
              No thanks
            </button>
            <p className="lmp-offer__fine">
              One code per customer, valid on your first order. Unsubscribe any time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
