import { site } from '@/data/site';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/order/'] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
