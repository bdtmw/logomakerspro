// Page intros and per-page settings shared by several components.

export const PACKAGES_INTRO = {
  title: 'Logo, Website and Branding Packages',
  // Hero highlights on /packages; each holds across the package data (money-back: most design packages list it).
  highlights: [
    'Clear prices for every package, listed upfront',
    'A money-back guarantee on most design packages',
    'Order online in minutes, or let us recommend one',
  ],
  text: 'Every package lists its price and exactly what’s included, so you can compare logos, websites, online stores, video, branding and marketing side by side, then order online or ask us to recommend one.',
};

export const SERVICES_INTRO = {
  title: 'Logo Design, Web Design and Branding Services',
  text: 'Everything a growing business needs to look professional online, from a custom logo to a full website, store or app. Pick a service to see how we work, what you get and what it costs.',
};

// One card per service on /services. Order = order on the page.
export const servicesHub = [
  { slug: 'logo-design', text: 'Original logo concepts from professional designers, unlimited revisions on most packages and every final file you need.' },
  { slug: 'web-design', text: 'Responsive, SEO-friendly websites from 3 to 20 pages that look sharp on every screen and turn visitors into enquiries.' },
  { slug: 'e-commerce', text: 'Online stores with product search, secure checkout and payment setup, built to be easy for you to manage.' },
  { slug: 'wordpress', text: 'Custom WordPress themes, WooCommerce stores and plugin setup, tuned for speed so your site is quick and easy to update.' },
  { slug: 'brand-services', text: 'A consistent identity across your logo, stationery, social media and brand guidelines, so every touchpoint looks like you.' },
  { slug: 'video-animation', text: 'Explainer and promo videos with script, voice-over and custom 2D or 3D animation that make your offer easy to grasp.' },
  { slug: 'digital-marketing-services', text: 'SEO, paid ads, social media and content marketing that grow traffic and leads, with a progress report every month.' },
  { slug: 'mobile-app-services', text: 'iOS and Android apps designed for speed and a great user experience, from first wireframe to app store launch.' },
];

export const PORTFOLIO_INTRO = {
  title: 'Selected Logo & Web Design Projects',
  text: 'Our experts work closely with you to grasp your business objectives and unlock pathways to success. Partner with a leading digital agency to kickstart your journey toward success.',
};

// Unique intro for each package category page (the H1 + two short paragraphs).
export const packageIntros = {
  'logo-design': {
    title: 'Logo design packages for every stage of your business',
    text: [
      'Whether you need a simple mark to launch or a full identity with stationery and social media artwork, there is a logo package that fits. Prices start at $29, and every logo is designed from scratch.',
      'Compare concepts, designers and revisions below. Silver and above add unlimited revisions and every source file, while Gold, Platinum and The Boss include business card, letterhead and envelope designs.',
    ],
  },
  'web-design': {
    title: 'Website design packages with no monthly fees',
    text: [
      'From a 3-page starter site to a 20-page custom build, every website package includes custom layout design, complete deployment and full ownership of your source files, with no monthly or hidden fees.',
      'Professional and higher add a CMS so you can edit content yourself, and Corporate and Platinum include customized WordPress or PHP development with fully responsive design.',
    ],
  },
  'e-commerce': {
    title: 'Ecommerce website packages built to sell',
    text: [
      'Launch a store your customers can browse, search and buy from with confidence. Every ecommerce package includes a content management system, mobile responsive design, a shopping cart and payment integration.',
      'Choose by catalogue size: up to 100 products on Beginners, 250 on Corporate and 500 on Elite, which also includes a complete brand identity. Automated is built for catalogues in the thousands.',
    ],
  },
  seo: {
    title: 'Monthly SEO packages that build rankings over time',
    text: [
      'Our SEO packages combine keyword optimization, content and link building in one monthly plan. Choose how many keywords to target, from 10 on Basic to 100 on Enterprise.',
      'Every plan includes blog writing, blog posting links, social bookmarking and press releases, with guest blogging links added on Professional and Enterprise.',
    ],
  },
  'digital-marketing': {
    title: 'Social media marketing packages for growing brands',
    text: [
      'Keep your social profiles active and on-brand without doing it all yourself. Plans start at $299 a month with profile optimization, creative image posts and regular status updates.',
      'Startup and above add content creation, a social media strategy and copywriting, while Scaling and Venture include ad campaign management and reputation management.',
    ],
  },
  animation: {
    title: 'Video animation packages for explainers and promos',
    text: [
      'Explain your product, promote an offer or introduce your brand with a professionally animated video. Each 30-second package includes script writing and HD delivery.',
      'Startup adds a professional voice-over and hand-drawn illustrations, Classic adds custom 2D characters, and the 3D Video package brings your product to life with 3D models in about six weeks.',
    ],
  },
  branding: {
    title: 'Branding packages: logo, stationery and website together',
    text: [
      'Get your logo, stationery and website designed as one consistent identity. Every branding package includes logo concepts with unlimited revisions, business card, letterhead and envelope designs, and a custom website.',
      'Branding Plus adds a WordPress CMS, flyer design and social media artwork. Classic and Ultimate add a 10+ page website and a brochure or menu design, with printed stationery included in Ultimate.',
    ],
  },
  combo: {
    title: 'Logo and website combo packages for new businesses',
    text: [
      'Launch with a professional logo and a website in one order. Combo packages start at $449.99 with 5 logo concepts, business stationery, a 5-page responsive website and social media page designs.',
      'Higher combos add unlimited logo concepts, a CMS, brochure and presentation designs, ecommerce features on Corporate and fully custom development on Elite.',
    ],
  },
};

// Extra sections on each service page: a pricing teaser (package ids) and related portfolio work.
export const serviceExtras = {
  'logo-design': {
    // popular: badge shown on that card. Only set it where it is true (logo FAQ: Silver and Gold sell most).
    packages: { category: 'logo-design', ids: ['logo-design--logo-basic', 'logo-design--logo-silver', 'logo-design--logo-gold'], popular: 'logo-design--logo-silver' },
    portfolio: { tab: 'Logo', from: 0, count: 4 },
  },
  'web-design': {
    packages: { category: 'web-design', ids: ['web-design--basic-website', 'web-design--startup-website', 'web-design--professional-website'] },
    portfolio: { tab: 'Web Design', from: 0, count: 4 },
  },
  wordpress: {
    packages: { category: 'web-design', ids: ['web-design--professional-website', 'web-design--corporate-website', 'web-design--platinum-website'] },
    portfolio: { tab: 'Web Design', from: 4, count: 4 },
  },
  'e-commerce': {
    packages: { category: 'e-commerce', ids: ['e-commerce--beginners-e-commerce-package', 'e-commerce--corporate-e-commerce-package', 'e-commerce--elite-e-commerce-package'] },
    portfolio: { tab: 'E-Commerce', from: 0, count: 4 },
  },
  'video-animation': {
    packages: { category: 'animation', ids: ['animation--teaser', 'animation--startup', 'animation--classic'] },
  },
  'brand-services': {
    packages: { category: 'branding', ids: ['branding--branding-startup', 'branding--branding-plus', 'branding--branding-classic'] },
    portfolio: { tab: 'Branding Design', from: 0, count: 4 },
  },
  'digital-marketing-services': {
    packages: { category: 'seo', ids: ['seo--seo-basic', 'seo--seo-standard', 'seo--seo-professional'] },
  },
  'mobile-app-services': {
    portfolio: { tab: 'Mobile Apps', from: 0, count: 4 },
  },
};

// Service page hero: three promises per service, each backed by the package features in src/data/packages.js
// (check them there before changing). Industry logo pages use the 'logo-design' set.
export const serviceHighlights = {
  'logo-design': ['First logo concepts in 24 to 72 hours', 'Unlimited revisions from the Silver package up', '100% ownership of your final logo'],
  'web-design': ['No monthly or hidden fees', 'Unlimited revisions from the Startup package up', '100% ownership and a money-back guarantee'],
  wordpress: ['An easy-to-edit CMS, included from Professional up', 'No monthly or hidden fees', '100% ownership and a money-back guarantee'],
  'e-commerce': ['A CMS to manage products and orders', 'Mobile-responsive store design', '100% ownership and a money-back guarantee'],
  'video-animation': ['Script writing and HD delivery on every package', 'Unlimited revisions from the Startup package up', '100% ownership and a money-back guarantee'],
  'brand-services': ['Logo, stationery and website in one identity', 'Unlimited revisions', '100% ownership of every design'],
  'digital-marketing-services': ['SEO, social media and paid ads in one team', 'Plans for 10 to 100 target keywords', 'Blog writing and link building on every SEO plan'],
  'mobile-app-services': ['Apps for iOS and Android', 'UX design and development in one team', 'A custom quote for your app’s scope'],
};

// Figures shown in the trust strip on service pages (same numbers as the home page counters).
export const trustStats = [
  { value: '1000+', label: 'Logos designed' },
  { value: '200+', label: 'Websites built' },
  { value: '150+', label: 'Ecommerce stores' },
  { value: '100+', label: 'Mobile apps' },
];

// "Why choose us" on service pages: four reasons per service, each tied to package features in packages.js
// (same rule as serviceHighlights: check the data before changing a claim). Industry logo pages use 'logo-design'.
const ownRiskFree = {
  icon: 'fa-shield-halved',
  title: 'You own it, risk free',
  text: 'Full ownership rights to the final work, plus our money-back guarantee. See our terms for the details.',
};
export const whyChooseUs = {
  'logo-design': [
    { icon: 'fa-pen-nib', title: 'Designed from scratch', text: 'Every concept is drawn for your brand by our designers, never pulled from a template, under our unique design guarantee.' },
    { icon: 'fa-users', title: 'Real choice', text: 'Get from 4 concepts up to unlimited concepts by as many as 10 designers, so you pick from genuinely different directions.' },
    { icon: 'fa-rotate', title: 'Fast, with room to refine', text: 'First concepts in 24 to 72 hours, then unlimited revisions from the Silver package up until it feels right.' },
    ownRiskFree,
  ],
  'web-design': [
    { icon: 'fa-pen-ruler', title: 'Custom design, not a theme', text: 'Every site starts from a custom layout built around your brand and your customers.' },
    { icon: 'fa-receipt', title: 'One price, no surprises', text: 'No monthly or hidden fees. The package price is what you pay for the design and build.' },
    { icon: 'fa-rotate', title: 'Revisions included', text: 'Unlimited revisions from the Startup package up, and first concepts within 48 hours on the Basic to Professional packages.' },
    ownRiskFree,
  ],
  wordpress: [
    { icon: 'fa-pen-ruler', title: 'Custom design, not a theme', text: 'Your WordPress site is designed around your brand, then built so it stays fast and easy to manage.' },
    { icon: 'fa-pen-to-square', title: 'Edit it yourself', text: 'A content management system is included from the Professional package up, so you can update pages without a developer.' },
    { icon: 'fa-receipt', title: 'One price, no surprises', text: 'No monthly or hidden fees. The package price covers the design and build.' },
    ownRiskFree,
  ],
  'e-commerce': [
    { icon: 'fa-cart-shopping', title: 'Built to sell', text: 'Easy product search and payment integration on every store package, so customers can find and buy quickly.' },
    { icon: 'fa-sliders', title: 'Run it yourself', text: 'A content management system on every package lets you add products and manage orders without a developer.' },
    { icon: 'fa-mobile-screen', title: 'Shoppable on any device', text: 'Every store is mobile responsive, because many of your customers will shop from their phones.' },
    ownRiskFree,
  ],
  'video-animation': [
    { icon: 'fa-file-lines', title: 'Script to screen', text: 'Script writing and HD delivery come with every animation package, so you don’t need to hire a writer.' },
    { icon: 'fa-palette', title: 'Made for your brand', text: 'Custom artwork on our starter video, custom 2D characters on Classic and full 3D models on our 3D package.' },
    { icon: 'fa-rotate', title: 'Revisions included', text: 'Unlimited revisions from the Startup package up, and unlimited storyboard revisions on 3D videos.' },
    ownRiskFree,
  ],
  'brand-services': [
    { icon: 'fa-layer-group', title: 'One consistent identity', text: 'Your logo, business card, letterhead, envelope and website designed together, so everything matches.' },
    { icon: 'fa-users', title: 'Plenty of logo options', text: 'From 6 unique logo concepts up to unlimited concepts, depending on the package.' },
    { icon: 'fa-rotate', title: 'Unlimited revisions', text: 'Every branding package includes unlimited revisions on your designs.' },
    { icon: 'fa-key', title: '100% yours', text: 'Full ownership rights to every design we create for your brand.' },
  ],
  'digital-marketing-services': [
    { icon: 'fa-bullhorn', title: 'One team for every channel', text: 'SEO, social media and paid ads planned together, so every channel pushes the same message.' },
    { icon: 'fa-chart-line', title: 'Plans that grow with you', text: 'SEO plans target from 10 to 100 keywords, so you can start small and scale up.' },
    { icon: 'fa-pen-fancy', title: 'Content done for you', text: 'Blog writing and link building on every SEO plan, and content creation on our larger social plans.' },
    { icon: 'fa-file-signature', title: 'Clear pricing', text: 'Monthly plans from $299, with the deliverables for each plan listed upfront.' },
  ],
  'mobile-app-services': [
    { icon: 'fa-mobile-screen-button', title: 'iOS and Android', text: 'Apps planned for the platforms your customers actually use.' },
    { icon: 'fa-object-group', title: 'Design and code together', text: 'UX designers and developers work as one team, so what you approve is what gets built.' },
    { icon: 'fa-gauge-high', title: 'Built for speed', text: 'We balance design, copy and performance so your app feels fast and easy to use.' },
    { icon: 'fa-file-invoice-dollar', title: 'A clear quote first', text: 'Tell us your app idea and get a custom quote based on its scope.' },
  ],
};

// Package pages (/<category>-package): which service's highlights, reasons and reviews to borrow, plus highlights
// for categories that don't map to one service. Same rule: every line is backed by that category in packages.js.
export const packageService = {
  'logo-design': 'logo-design',
  'web-design': 'web-design',
  'e-commerce': 'e-commerce',
  animation: 'video-animation',
  branding: 'brand-services',
  seo: 'digital-marketing-services',
  'digital-marketing': 'digital-marketing-services',
  combo: null,
};
export const packageHighlights = {
  combo: ['A logo and a website in one order', 'Unique design guarantee on every package', 'Money-back guarantee on every package'],
  'digital-marketing': [
    'Regular posting on Facebook, Twitter and Instagram',
    'Content creation from the Startup plan up',
    'Monthly progress reports on the Startup and Scaling plans',
  ],
};
