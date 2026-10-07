'use client';

import { trackCta } from '@/lib/track';
import { useUI } from './UIContext';

/** Opens the quote popup and records which button did it. */
export default function QuoteButton({ location, className = 'lmp-btn lmp-btn--accent', children = 'Get a free quote' }) {
  const { openQuote } = useUI();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        trackCta('quote', location);
        openQuote();
      }}
    >
      {children}
    </button>
  );
}
