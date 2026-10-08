import 'server-only';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// One-password login for /admin. The session cookie is "<expiry>.<HMAC>", signed with a key derived from
// ADMIN_PASSWORD (plus ADMIN_SESSION_SECRET if set), so changing the password signs everyone out.

export const COOKIE = 'lmp_admin';
const SESSION_DAYS = 14;

const password = () => process.env.ADMIN_PASSWORD || '';
export const adminConfigured = () => password().length >= 8;

const key = () => createHash('sha256').update(`lmp-admin|${password()}|${process.env.ADMIN_SESSION_SECRET || ''}`).digest();
const sign = (value) => createHmac('sha256', key()).update(value).digest('base64url');

const sameText = (a, b) => {
  const ha = createHash('sha256').update(String(a)).digest();
  const hb = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(ha, hb);
};

export const passwordMatches = (input) => adminConfigured() && sameText(input, password());

export function sessionCookie() {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const value = `${expires}.${sign(String(expires))}`;
  return {
    name: COOKIE,
    value,
    options: { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', expires: new Date(expires) },
  };
}

function validSession(value) {
  if (!adminConfigured() || typeof value !== 'string') return false;
  const [expires, mac] = value.split('.');
  if (!expires || !mac || Number(expires) < Date.now()) return false;
  return sameText(mac, sign(expires));
}

export async function isAdmin() {
  const jar = await cookies();
  return validSession(jar.get(COOKIE)?.value);
}

/** For admin pages and server actions: sends anyone without a valid session to the login page. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}

// Login attempts: 10 per 15 minutes per IP (per server instance).
const attempts = new Map();
export function loginLimited(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 5000) attempts.clear();
  return recent.length > 10;
}
