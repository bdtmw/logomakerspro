# Logo Makers Pro (Next.js)

Next.js 15 (App Router, JavaScript) port of logomakerspro.com. Same pages, copy, images and theme CSS as the live
PHP site, with jQuery, Bootstrap JS, Fancybox and MeanMenu replaced by React components. GSAP (ScrollSmoother,
ScrollTrigger, SplitText) drives the same animations through `@gsap/react`.

## Run

```bash
npm install
cp .env.example .env.local   # fill in SMTP + reCAPTCHA secret
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Deploys to Vercel as-is (no extra config). Node 18.18+.

## Where things live

| What | Where |
| --- | --- |
| Pages | `src/app/**/page.js` (`[slug]` renders the 7 service pages and 8 package pages) |
| Service page content | `src/data/services.jsx` |
| Industry logo pages (`/logo-design/<industry>`) | `src/data/industries.js` |
| Blog posts (`/blog/<slug>`) | `src/data/blog.jsx` |
| Package cards (all prices) | `src/data/packages.js` |
| Portfolio gallery | `src/data/portfolio.js` |
| Testimonials | `src/data/testimonials.js` |
| Page titles / descriptions | `src/data/seo.js` |
| FAQs (service, package, general) | `src/data/faqs.js` |
| Package page intros, service page extras | `src/data/copy.js` |
| Structured data builders | `src/lib/schema.js` |
| Phone, email, nav, tracking IDs, schema | `src/data/site.js` |
| Header, off-canvas menu, footer, smooth scroll | `src/components/layout/` |
| Quote popup, buttons, tabs, lightbox, counters | `src/components/ui/` |
| Form endpoints (email) | `src/app/api/lead`, `src/app/api/order`, `src/app/api/offer` |
| Theme CSS (original) / additions | `src/styles/vendor/theme.css`, `src/styles/site.css` |

## Forms and orders

- Quote popup and contact form POST to `/api/lead` (replaces `assets/include/bannerFormController.php`).
- Package "ORDER NOW" buttons go to `/order/order-now?package=<id>`; the order form POSTs to `/api/order`.
  Package name and price are looked up on the server from `packages.js`, so they can't be edited in the browser.
- Both endpoints verify reCAPTCHA v3 (when `RECAPTCHA_SECRET_KEY` is set) and email the submission via SMTP
  (when `SMTP_HOST` is set; otherwise they log to the console). No payment gateway is wired in; add it in
  `src/app/api/order/route.js` if needed.

## Discount popup (lead magnet)

- `src/components/ui/OfferPopup.jsx` offers 15% off the first package for an email address. It opens once per visit
  after 30 seconds, or earlier when a desktop visitor moves to leave the page. On phones it is a bottom sheet.
  It never shows on the order, contact or legal pages, or while the quote popup is open.
- "No thanks" hides it for 14 days. After signup it never shows again on that browser.
- Signups POST to `/api/offer`, which emails the team and sends the visitor their code (and shows it on screen).
- The checkout form has a Discount Code field, prefilled with a claimed code. `/api/order` rejects unknown codes
  and adds the discount and discounted price to the order email. Nothing is charged online, so the team applies it
  when confirming payment.
- Settings: `OFFER_CODE` (server-only, default `GOOGLE`), `NEXT_PUBLIC_OFFER_PERCENT` (default 15),
  `NEXT_PUBLIC_OFFER_ENABLED=false` to switch it off. Timing and excluded pages: `leadOffer` in `src/data/site.js`.
- Tracking: GA4 `view_promotion` when it opens, GA4 `generate_lead` (form `discount_popup`) and Meta `Lead` on signup.

## SEO

- Clean URLs (`/logo-design`). Every old `.php` URL permanently redirects (308) to its clean route (`next.config.mjs`).
- Titles (50 to 60 characters) and meta descriptions (140 to 160) for every page in `src/data/seo.js`, from the
  October 2026 audit. Canonicals point at `https://logomakerspro.com`.
- One H1 per page, headings in order (no skipped levels). Open Graph and Twitter tags on every page, with a
  generated 1200x630 share image (`src/app/opengraph-image.js`) set explicitly in `pageMetadata()`.
- `/services` hub lists all 8 services and is the target of the "Services" menu item.
- Industry logo pages (`/logo-design/restaurant`, `/logo-design/real-estate`) come from `src/data/industries.js`.
  Add an entry there plus a title and description in `src/data/seo.js` to publish another; the route, sitemap,
  schema and the "Logo design by industry" links on `/logo-design` pick it up. Give each page its own copy, styles
  and FAQs, not a copy of another industry with the name swapped, or Google treats them as doorway pages.
  To show your own niche logos, put the files in `public/assets/imgs/industries/<industry>/` and list them in that
  industry's `work.items` as `{ src, alt, width, height, caption }`.
- Blog: `/blog` and `/blog/<slug>` come from `src/data/blog.jsx` (newest post first). Each post carries its own
  title and description, BlogPosting + FAQPage + BreadcrumbList schema, `og:type` article with published and
  modified times, and a sitemap entry whose `lastmod` is the post's `updated` date. A `packages` block renders live
  prices from `packages.js`, so posts never quote an old price.
- Structured data: Organization (`@id` `/#organization`, referenced by Service, offers and WebSite) and WebSite
  site-wide, Service (with price range) on service pages, OfferCatalog on package pages, ItemList on `/services`,
  FAQPage wherever FAQs show, BreadcrumbList on inner pages.
- `sitemap.xml` and `robots.txt` are generated (`src/app/sitemap.js`, `src/app/robots.js`). Sitemap `lastmod`
  comes from `SITE_UPDATED` / `CONTENT_UPDATED` in `sitemap.js`: bump them when copy changes. robots.txt blocks only
  `/api/`; the order page is kept out of the index by its own `noindex` (which Google can only see if it may crawl it).
- `src/middleware.js` sends `X-Robots-Tag: noindex` on any host that isn't in `PRODUCTION_HOSTS` (so the
  `*.vercel.app` copy never competes with the real domain) and 308-redirects `www.` to the bare domain.
  When the domain is connected in Vercel, the production host is indexable automatically.

## Performance

- Unused CSS is purged at build time (`postcss.config.js`): about 738 KB of stylesheets down to about 160 KB
  (25 KB gzipped). Purging only runs in production builds. If you paste in markup from the original theme,
  check that its class names appear somewhere in `src/`, or add them to the safelist.
- reCAPTCHA v3 loads only when someone focuses a form, not on every page view.
- Images go through `next/image` (AVIF/WebP, lazy loading, fixed dimensions); hero images load with priority.

## Tracking (kept from the live site)

GA4, Meta Pixel, Zendesk chat, reCAPTCHA v3, plus the Google Ads tag on the order page. IDs default to the live ones
and can be overridden with the `NEXT_PUBLIC_*` variables in `.env.example`.

GA4 sends every page view and event to two properties: `G-VX4M5HDTGV` (new) and `G-ZPXY7DQZ8D` (the old PHP
site's). `NEXT_PUBLIC_GA_ID` takes a comma-separated list; set it to `G-VX4M5HDTGV` alone to stop sending to the old
property.

## Differences from the live site

- **Italics bug fixed.** `/logo-design` and `/web-design` have an unclosed `<i>` tag on the live site, which makes
  everything after the intro italic and stacks the two intro images. This version renders them as intended.
- **Meta Pixel fixed.** The live pixel loads `fbevents.js` from a broken relative path, so it never loads; here it uses
  Facebook's URL.
- **"Let's talk" buttons** call Tawk on the live site (not installed). Here they open Zendesk chat, or the quote popup
  if chat hasn't loaded.
- **Order page** uses the main site layout. The live one uses an older template (broken logo, links to pages that
  don't exist).
- **Every title and meta description rewritten** (5 titles and 11 descriptions were empty on the live site).
- **New `/wordpress` service page.** The live nav links to `wordpress.php`, which is a 404.
- **New sections:** FAQs on all service and package pages, a pricing band and related work on service pages,
  unique intros on the 8 package pages.
- **Home page** targets "custom logo design services" (H1 and title); service cards rewritten and relinked.
- **Package card fixes:** Google+ removed (shut down in 2019), typos fixed ("Branding Ultimate", "500 Business
  Cards", "Stationery", "Up to", "Signage", "Envelope").
- **Font Awesome** is self-hosted from npm (the live site's local icon fonts are broken placeholders; it relies on a
  domain-locked kit).
- Home "What We Do" panel starts at 0.6 scale, matching what the live site actually shows. See the comment in
  `src/components/sections/HomeWorkflow.jsx` to switch to the intended full-size start.

## Still to do (outside the code)

- Two portfolio full-size images are missing on the server (`lg-016.jpeg`, `lg-25.jpeg`); the lightbox shows the
  thumbnail instead.
- Search Console: submit `sitemap.xml` once the domain points here, and check that Googlebot isn't blocked by the
  old host's bot protection.
- Off-site work from the audit (directory listings, guest posts, reviews) and the new industry and style pages.
