'use client';

/** GA4 event for a call-to-action click, so each button's share of conversions can be compared. */
export function trackCta(cta, location) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', { cta, location, page: window.location.pathname });
  }
}
