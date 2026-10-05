/** @type {import('next').NextConfig} */

// Old PHP URLs -> clean routes (301) so existing rankings and backlinks carry over.
const legacyPages = [
  'logo-design', 'web-design', 'e-commerce', 'wordpress', 'video-animation', 'brand-services',
  'digital-marketing-services', 'mobile-app-services', 'portfolio', 'packages', 'web-design-package',
  'logo-design-package', 'e-commerce-package', 'digital-marketing-package', 'animation-package',
  'branding-package', 'seo-package', 'combo-package', 'about', 'contact', 'terms-conditions', 'privacy-policy',
];

const nextConfig = {
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
