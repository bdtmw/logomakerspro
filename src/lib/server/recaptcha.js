import 'server-only';

/** Verify a reCAPTCHA v3 token. Skips verification when no secret is configured (local dev). */
export async function verifyRecaptcha(token, ip) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };
  if (!token) return { ok: false, reason: 'missing-token' };
  const body = new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) });
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body });
  const data = await res.json();
  const min = Number(process.env.RECAPTCHA_MIN_SCORE ?? 0.5);
  return { ok: Boolean(data.success) && (data.score ?? 1) >= min, score: data.score, reason: data['error-codes'] };
}
