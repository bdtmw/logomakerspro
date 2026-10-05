import { seo } from '@/data/seo';
import { site } from '@/data/site';

/** Build Next.js metadata for a route from the titles/descriptions carried over from the live site. */
export function pageMetadata(route, overrides = {}) {
  const entry = seo[route] || {};
  return {
    title: entry.title || site.name,
    ...(entry.description ? { description: entry.description } : {}),
    alternates: { canonical: route === '/' ? `${site.url}/` : `${site.url}${route}` },
    ...overrides,
  };
}
