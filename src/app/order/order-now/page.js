import Script from 'next/script';
import Link from 'next/link';
import CheckoutForm from '@/components/order/CheckoutForm';
import { findPackage } from '@/data/packages';
import { tracking } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/order/order-now', { robots: { index: false, follow: true } });

// Package cards link here as /order/order-now?package=<id> (the live site POSTed name/price/services instead).
export default async function OrderNowPage({ searchParams }) {
  const { package: id } = await searchParams;
  const pkg = id ? findPackage(String(id)) : null;
  const name = pkg ? pkg.orderName || pkg.title.join(' ') : null;

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
              <h1>Checkout</h1>
              <p>You&apos;re ordering the {name} package. Fill in your details and our team will get started.</p>
              <div className="checkout-content">
                <div className="checkout-form-container">
                  <CheckoutForm packageId={pkg.id} packageName={name} price={pkg.price} />
                </div>
                <aside className="service-details">
                  <h2>{name}</h2>
                  <div className="service-details__price">
                    {pkg.priceLabel}
                    {pkg.period ? <small> {pkg.period}</small> : null}
                  </div>
                  <ul>
                    {pkg.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </aside>
              </div>
            </>
          ) : (
            <div className="checkout-empty">
              <h1>Invalid order request.</h1>
              <p>
                Please choose a package from our <Link href="/packages">packages page</Link>.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
