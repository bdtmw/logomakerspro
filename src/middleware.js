import { NextResponse } from 'next/server';

// Hosts allowed in search results. Everything else (vercel.app previews, staging, localhost) gets noindex,
// so the copy on *.vercel.app never competes with the real domain.
const PRODUCTION_HOSTS = (process.env.PRODUCTION_HOSTS || 'logomakerspro.com')
  .split(',')
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);

export function middleware(request) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();

  // One canonical host: www -> apex.
  if (host === 'www.logomakerspro.com') {
    const url = request.nextUrl.clone();
    url.host = 'logomakerspro.com';
    url.port = '';
    url.protocol = 'https';
    return NextResponse.redirect(url, 308);
  }

  const res = NextResponse.next();
  if (!PRODUCTION_HOSTS.includes(host)) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets/|favicon).*)'],
};
