import { packageCategories } from '@/data/packages';
import { services } from '@/data/services';
import { site } from '@/data/site';

export default function sitemap() {
  const routes = [
    '/', '/portfolio', '/packages', '/about', '/contact', '/terms-conditions', '/privacy-policy',
    ...Object.keys(services).map((s) => `/${s}`),
    ...Object.keys(packageCategories).map((c) => `/${c}-package`),
  ];
  return routes.map((r) => ({ url: `${site.url}${r === '/' ? '/' : r}`, changeFrequency: 'monthly', priority: r === '/' ? 1 : 0.7 }));
}
