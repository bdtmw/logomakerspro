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
| Package cards (all prices) | `src/data/packages.js` |
| Portfolio gallery | `src/data/portfolio.js` |
| Testimonials | `src/data/testimonials.js` |
| Page titles / descriptions | `src/data/seo.js` |
| Phone, email, nav, tracking IDs, schema | `src/data/site.js` |
| Header, off-canvas menu, footer, smooth scroll | `src/components/layout/` |
| Quote popup, buttons, tabs, lightbox, counters | `src/components/ui/` |
| Form endpoints (email) | `src/app/api/lead`, `src/app/api/order` |
| Theme CSS (original) / additions | `src/styles/vendor/theme.css`, `src/styles/site.css` |

## Forms and orders

- Quote popup and contact form POST to `/api/lead` (replaces `assets/include/bannerFormController.php`).
- Package "ORDER NOW" buttons go to `/order/order-now?package=<id>`; the order form POSTs to `/api/order`.
  Package name and price are looked up on the server from `packages.js`, so they can't be edited in the browser.
- Both endpoints verify reCAPTCHA v3 (when `RECAPTCHA_SECRET_KEY` is set) and email the submission via SMTP
  (when `SMTP_HOST` is set; otherwise they log to the console). No payment gateway is wired in; add it in
  `src/app/api/order/route.js` if needed.

## SEO

- Clean URLs (`/logo-design`). Every old `.php` URL permanently redirects (308) to its clean route (`next.config.mjs`).
- Per-page titles, descriptions and canonicals carried over; Organization JSON-LD and Google site verification kept.
- `sitemap.xml` and `robots.txt` are generated (`src/app/sitemap.js`, `src/app/robots.js`).

## Tracking (kept from the live site)

GA4, Meta Pixel, Zendesk chat, reCAPTCHA v3, plus the Google Ads tag on the order page. IDs default to the live ones
and can be overridden with the `NEXT_PUBLIC_*` variables in `.env.example`.

## Differences from the live site

- **Italics bug fixed.** `/logo-design` and `/web-design` have an unclosed `<i>` tag on the live site, which makes
  everything after the intro italic and stacks the two intro images. This version renders them as intended.
- **Meta Pixel fixed.** The live pixel loads `fbevents.js` from a broken relative path, so it never loads; here it uses
  Facebook's URL.
- **"Let's talk" buttons** call Tawk on the live site (not installed). Here they open Zendesk chat, or the quote popup
  if chat hasn't loaded.
- **Order page** uses the main site layout. The live one uses an older template (broken logo, links to pages that
  don't exist).
- **Missing titles filled** for Branding, Combo and SEO packages, Terms and Privacy (empty on the live site).
- **Font Awesome** is self-hosted from npm (the live site's local icon fonts are broken placeholders; it relies on a
  domain-locked kit).
- Home "What We Do" panel starts at 0.6 scale, matching what the live site actually shows. See the comment in
  `src/components/sections/HomeWorkflow.jsx` to switch to the intended full-size start.

## Carried over as-is (worth fixing)

- Nav links to `/wordpress`, which is a 404 on the live site too.
- Home service cards: copy mentions "Team WebbMight", and "UI/UX DESIGN" / "LOGO DESIGN" / "ANIMATION" link to
  `/logo-design`, `/web-design` and `/mobile-app-services`.
- E-commerce page title reads "Log oMakers Pro".
- Two portfolio full-size images are missing on the server (`lg-016.jpeg`, `lg-25.jpeg`); the lightbox shows the
  thumbnail instead.
