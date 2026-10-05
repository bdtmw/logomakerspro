'use client';

import { tracking } from '@/data/site';

let loading = null;

/**
 * Load reCAPTCHA v3 on demand (first focus on a form, or on submit) instead of on every page view.
 * Resolves to window.grecaptcha, or null if it can't load (blocked by an ad blocker, offline).
 */
export function loadRecaptcha() {
  if (typeof window === 'undefined' || !tracking.recaptchaSiteKey) return Promise.resolve(null);
  if (window.grecaptcha?.execute) return Promise.resolve(window.grecaptcha);
  if (!loading) {
    loading = new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = `https://www.google.com/recaptcha/api.js?render=${tracking.recaptchaSiteKey}`;
      s.async = true;
      s.onload = () => resolve(window.grecaptcha || null);
      s.onerror = () => {
        loading = null;
        resolve(null);
      };
      document.head.appendChild(s);
    });
  }
  return loading;
}

/** Get a fresh reCAPTCHA v3 token (null when reCAPTCHA is unavailable; the server then decides). */
export async function getRecaptchaToken(action = 'submit') {
  const g = await loadRecaptcha();
  if (!g) return null;
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 8000);
    g.ready(() => {
      g.execute(tracking.recaptchaSiteKey, { action }).then(
        (token) => {
          clearTimeout(timer);
          resolve(token);
        },
        () => {
          clearTimeout(timer);
          resolve(null);
        },
      );
    });
  });
}
