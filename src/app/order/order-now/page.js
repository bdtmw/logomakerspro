import Script from 'next/script';
import Link from 'next/link';
import CheckoutForm from '@/components/order/CheckoutForm';
import { heroQuoteFor } from '@/components/sections/TestimonialGrid';
import Stars from '@/components/ui/Stars';
import { findPackage, packageCategories } from '@/data/packages';
import { reviewProfiles, site, tracking } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/order/order-now', { robots: { index: false, follow: true } });

// Guarantees and rights listed on the package itself; shown as "Included" beside the form.
const ASSURANCE = /guarantee|ownership|satisfaction/i;
// The package's own timing line ("48 to 72 hours TAT", "Website Initial Concepts in 48 Hours", "6 Weeks Delivery
// Time"), quoted as written in the next-steps list so it never claims more than the package does.
const TIMING = /\d+\s*(?:-|to)?\s*\d*\s*(business\s+)?(hours|days|weeks)/i;
const clean = (f) => f.replace(/\s*\*+\s*$/, '').trim();

// Package cards link here as /order/order-now?package=<id> (the live site POSTed name/price/services instead).
export default async function OrderNowPage({ searchParams }) {
  const { package: id } = await searchParams;
  const pkg = id ? findPackage(String(id)) : null;
  const name = pkg ? pkg.orderName || pkg.title.join(' ') : null;

  const assurances = pkg ? pkg.features.filter((f) => ASSURANCE.test(f)).map(clean) : [];
  const included = pkg ? pkg.features.filter((f) => !ASSURANCE.test(f)).map(clean) : [];
  const timing = pkg?.features.find((f) => TIMING.test(f));
  const review = heroQuoteFor(pkg?.category === 'logo-design');
  const trustpilot = reviewProfiles.find((p) => p.fiveStarPct && p.count);
  const category = pkg ? packageCategories[pkg.category] : null;

  return (
    <section className="checkout-section">
      {/* Google Ads tag that the live order page loads. */}
      {tracking.googleAdsId && (
        <Script id="gads-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${tracking.googleAdsId}');`}
        </Script>
      )}
      {tracking.googleAdsId && (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${tracking.googleAdsId}`} strategy="afterInteractive" />
      )}
      <div className="container">
        <div className="checkout-container">
          {pkg ? (
            <>
              <p className="lmp-hero__eyebrow">Checkout</p>
              <h1>Order your {name} package</h1>
              <p>Fill in your details and our team will get in touch to confirm everything and get started.</p>
              {trustpilot && (
                <a className="lmp-checkout__rating" href={trustpilot.url} target="_blank" rel="noopener noreferrer">
                  <Stars value={5} /> {trustpilot.fiveStarPct}% five-star reviews on {trustpilot.name} ({trustpilot.count} reviews)
                </a>
              )}
              <div className="checkout-content">
                <div className="checkout-form-container">
                  <h2 className="lmp-checkout__heading">Your details</h2>
                  <CheckoutForm packageId={pkg.id} packageName={name} price={pkg.price} />
                </div>
                <aside className="service-details">
                  <p className="lmp-checkout__label">Your package</p>
                  <h2>{name}</h2>
                  <div className="service-details__price">
                    {pkg.priceLabel}
                    {pkg.period ? <small> {pkg.period}</small> : null}
                  </div>
                  <ul>
                    {included.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  {category && (
                    <p className="lmp-checkout__change">
                      <Link href={`/${category.slug}-package`}>Change package</Link>
                    </p>
                  )}
                  {assurances.length > 0 && (
                    <div className="lmp-checkout__assurance">
                      <p className="lmp-checkout__label">Included with this package</p>
                      <ul>
                        {assurances.map((a) => (
                          <li key={a}>
                            <i className="fa-solid fa-shield-halved" aria-hidden="true" /> {a}
                          </li>
                        ))}
                      </ul>
                      <p className="lmp-checkout__terms">
                        * See our <Link href="/terms-conditions">terms and conditions</Link> for the details.
                      </p>
                    </div>
                  )}
                  {review && (
                    <figure className="lmp-checkout__review">
                      {review.rating && <Stars value={review.rating} />}
                      <blockquote>“{review.quote}”</blockquote>
                      <figcaption>
                        {review.name}
                        {review.source && `, via ${review.source}`}
                      </figcaption>
                    </figure>
                  )}
                  <p className="lmp-checkout__help">
                    Questions before you order? Call <a href={`tel:${site.phoneE164}`}>{site.phone}</a> or email{' '}
                    <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </p>
                </aside>
              </div>
              <div className="lmp-checkout__steps">
                <h2>What happens next</h2>
                <ol>
                  <li>
                    <strong>We confirm your order</strong>
                    <span>Our team contacts you to go over your details and arrange payment.</span>
                  </li>
                  <li>
                    <strong>We get to work</strong>
                    <span>
                      Your team starts on your brief.{timing ? ` This package lists: ${clean(timing)}.` : ''}
                    </span>
                  </li>
                  <li>
                    <strong>You review and receive your files</strong>
                    <span>Request changes as your package allows, then receive your final files.</span>
                  </li>
                </ol>
              </div>
            </>
          ) : (
            <div className="checkout-empty">
              <h1>Choose a package to order</h1>
              <p>This link doesn’t include a package. Pick one below to continue.</p>
              <ul className="lmp-checkout__categories">
                {Object.values(packageCategories).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}-package`}>{c.heading}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
