import { seo } from '@/data/seo';
import { site } from '@/data/site';

/** Absolute URL on the production domain (canonicals, Open Graph, schema). */
export const absoluteUrl = (route = '/') => (route === '/' ? `${site.url}/` : `${site.url}${route}`);

/** Next.js metadata for a route: title, description, canonical, Open Graph and Twitter card. */
export function pageMetadata(route, overrides = {}) {
  const entry = seo[route] || {};
  const title = entry.title || site.name;
  const url = absoluteUrl(route);
  return {
    title,
    ...(entry.description ? { description: entry.description } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_US',
      url,
      title,
      ...(entry.description ? { description: entry.description } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      ...(entry.description ? { description: entry.description } : {}),
    },
    ...overrides,
  };
}
