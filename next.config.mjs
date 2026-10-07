/** @type {import('next').NextConfig} */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// PurgeCSS (postcss.config.js) keeps only selectors whose names appear in src/. Webpack caches each stylesheet's
// purged output and only redoes it when that stylesheet changes, so a class newly used in src/ (a Font Awesome
// icon, a Bootstrap utility) would stay purged on cached builds, including Vercel's. Hashing the set of names in
// src/ into the cache version throws the cache away whenever that set changes.
function srcTokenHash(dir = 'src') {
  const tokens = new Set();
  const walk = (d) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const path = join(d, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.(jsx?|mjs)$/.test(entry.name)) (readFileSync(path, 'utf8').match(/[A-Za-z0-9_-]+/g) || []).forEach((t) => tokens.add(t));
    }
  };
  walk(dir);
  return createHash('sha1').update([...tokens].sort().join(' ')).digest('hex').slice(0, 12);
}

// Old PHP URLs -> clean routes (301) so existing rankings and backlinks carry over.
const legacyPages = [
  'logo-design', 'web-design', 'e-commerce', 'wordpress', 'video-animation', 'brand-services',
  'digital-marketing-services', 'mobile-app-services', 'portfolio', 'packages', 'web-design-package',
  'logo-design-package', 'e-commerce-package', 'digital-marketing-package', 'animation-package',
  'branding-package', 'seo-package', 'combo-package', 'about', 'contact', 'terms-conditions', 'privacy-policy',
];

const nextConfig = {
  webpack(config, { dev }) {
    if (!dev && config.cache && typeof config.cache === 'object') {
      config.cache.version = `${config.cache.version || ''}|purge-${srcTokenHash()}`;
    }
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/terms.php', destination: '/terms-conditions', permanent: true },
      { source: '/order/order-now.php', destination: '/order/order-now', permanent: true },
      ...legacyPages.flatMap((slug) => [
        { source: `/${slug}.php`, destination: `/${slug}`, permanent: true },
        { source: `/${slug}.html`, destination: `/${slug}`, permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
