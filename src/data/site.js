// Global site settings, navigation and contact details.

export const site = {
  name: 'Logo Makers Pro',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://logomakerspro.com',
  phone: '(307) 218-3240',
  phoneE164: '+1-307-218-3240',
  email: 'support@logomakerspro.com',
  address: '1309 Coffeen Ave. STE 1200, Sheridan, WY 82801',
  googleSiteVerification: 'OOMK1jvTC7AsFD-EyedpuDIcNDZUKv-67LlBrG0d2RE',
  footerBlurb:
    'We’re a team of strategic designers and digital architects, connected in our quest for mastery and bright curiosity.',
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/logomakerspro?mibextid=JRoKGi' },
    { label: 'Instagram', href: 'https://www.instagram.com/logomakerspro?igsh=MXN4ZW5zMXRiOGRzcw==' },
  ],
};

export const tracking = {
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? 'G-ZPXY7DQZ8D',
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? 'AW-10973222728',
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '861664211729887',
  zendeskKey: process.env.NEXT_PUBLIC_ZENDESK_KEY ?? 'd9bf55c7-7b4e-40f2-8fa5-d7ad83b0b767',
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '6LekOy8rAAAAADfvTHUIgOap9Xb7Z6s6OH8TW6sV',
};

// Discount popup (lead magnet). The code itself is server-only (OFFER_CODE) and is only revealed after signup.
export const leadOffer = {
  enabled: process.env.NEXT_PUBLIC_OFFER_ENABLED !== 'false',
  percent: Number(process.env.NEXT_PUBLIC_OFFER_PERCENT) || 15,
  delayMs: 30000, // timed trigger; desktop also opens on exit intent
  snoozeDays: 14, // after "No thanks", wait this long before showing again
  excludePaths: ['/order/order-now', '/contact', '/terms-conditions', '/privacy-policy'],
};

export const serviceLinks = [
  { label: 'Logo Design', href: '/logo-design' },
  { label: 'Web Design', href: '/web-design' },
  { label: 'E-Commerce', href: '/e-commerce' },
  { label: 'Wordpress', href: '/wordpress' },
  { label: 'Animation', href: '/video-animation' },
  { label: 'Branding', href: '/brand-services' },
  { label: 'Digital Marketing', href: '/digital-marketing-services' },
  { label: 'Mobile Application', href: '/mobile-app-services' },
];

export const packageLinks = [
  { label: 'Web Design', href: '/web-design-package' },
  { label: 'Logo Design', href: '/logo-design-package' },
  { label: 'E-Commerce', href: '/e-commerce-package' },
  { label: 'Digital Marketing', href: '/digital-marketing-package' },
  { label: 'Animation', href: '/animation-package' },
  { label: 'Branding', href: '/branding-package' },
  { label: 'SEO', href: '/seo-package' },
  { label: 'Combo', href: '/combo-package' },
];

// Header uses lowercase "home"; the off-canvas menu uses "Home" and shorter labels (as on the live site).
export const headerNav = [
  { label: 'home', href: '/', className: 'has-megamenu' },
  { label: 'Services', href: '/services', children: serviceLinks },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Packages', href: '/packages', children: packageLinks },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export const offcanvasNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', children: serviceLinks },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Packages', href: '/packages', children: packageLinks },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = [
  { label: 'Packages', href: '/packages' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

// Other schema (Service, WebSite, offers) points at this node by its @id.
export const organizationId = `${site.url}/#organization`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: site.name,
  url: `${site.url}/`,
  logo: `${site.url}/assets/imgs/logo/logo-black.webp`,
  sameAs: ['https://www.facebook.com/logomakerspro', 'https://www.instagram.com/logomakerspro'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.phoneE164,
    contactType: 'Customer Service',
    areaServed: 'US',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1309 Coffeen Ave. STE 1200',
    addressLocality: 'Sheridan',
    addressRegion: 'Wyoming',
    postalCode: '82801',
    addressCountry: 'US',
  },
  description:
    'Logo Makers Pro is a digital design agency dedicated to helping businesses elevate their online presence through outstanding design. We specialize in logo design and web design, creating visually striking and functional solutions that reflect your brand identity.',
  email: site.email,
  telephone: site.phoneE164,
};
