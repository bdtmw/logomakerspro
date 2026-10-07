'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import QuoteButton from '@/components/ui/QuoteButton';
import TrackedLink from '@/components/ui/TrackedLink';

/**
 * Phone-only bar pinned to the bottom of service pages once the hero (and its form) has scrolled away:
 * Get a quote + Call. Hidden while the hero or the closing quote form is on screen.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = ['service-hero', 'service-quote'].map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return undefined;
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setShow(visible.size === 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('has-sticky-cta', show);
    return () => document.body.classList.remove('has-sticky-cta');
  }, [show]);

  return (
    <div className={`lmp-sticky-cta${show ? ' is-visible' : ''}`} aria-hidden={!show}>
      <QuoteButton location="sticky" className="lmp-btn lmp-btn--accent">
        Get a free quote
      </QuoteButton>
      <TrackedLink href={`tel:${site.phoneE164}`} cta="call" location="sticky" className="lmp-btn lmp-btn--dark" tabIndex={show ? 0 : -1}>
        <i className="fa-solid fa-phone" aria-hidden="true" /> Call
      </TrackedLink>
    </div>
  );
}
