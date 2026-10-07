import { posts } from '@/data/blog';
import { industrySlugs } from '@/data/industries';
import { packageCategories } from '@/data/packages';
import { services } from '@/data/services';
import { site } from '@/data/site';

// lastmod for Google: bump SITE_UPDATED when copy changes site-wide, or add a route to CONTENT_UPDATED when only
// that page changes. Never set it to the build time, or every deploy claims every page changed.
const SITE_UPDATED = '2026-10-05';
const CONTENT_UPDATED = {
  '/blog': posts[0]?.updated,
  ...Object.fromEntries(posts.map((p) => [`/blog/${p.slug}`, p.updated])),
};

export default function sitemap() {
  const routes = [
    '/', '/services', '/portfolio', '/packages', '/about', '/contact', '/terms-conditions', '/privacy-policy',
    ...Object.keys(services).map((s) => `/${s}`),
    ...industrySlugs.map((s) => `/logo-design/${s}`),
    '/blog',
    ...posts.map((p) => `/blog/${p.slug}`),
    ...Object.keys(packageCategories).map((c) => `/${c}-package`),
  ];
  return routes.map((r) => ({
    url: `${site.url}${r === '/' ? '/' : r}`,
    lastModified: CONTENT_UPDATED[r] || SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: r === '/' ? 1 : 0.7,
  }));
}
