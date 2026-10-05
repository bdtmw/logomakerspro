'use client';

import { tracking } from '@/data/site';

/** Get a fresh reCAPTCHA v3 token (null if the script hasn't loaded, e.g. blocked by an ad blocker). */
export function getRecaptchaToken(action = 'submit') {
  return new Promise((resolve) => {
    const g = typeof window !== 'undefined' ? window.grecaptcha : null;
    if (!g || !tracking.recaptchaSiteKey) return resolve(null);
    g.ready(() => {
      g.execute(tracking.recaptchaSiteKey, { action }).then(resolve, () => resolve(null));
    });
  });
}
