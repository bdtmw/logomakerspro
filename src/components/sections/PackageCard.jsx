'use client';

import Form from 'next/form';
import { site } from '@/data/site';
import { useUI } from '@/components/ui/UIContext';
import { trackCta } from '@/lib/track';

/**
 * One pricing card. Cards with an orderName go to the order page (/order/order-now?package=<id>);
 * the rest (and every card when forceQuote is set) open the quote popup.
 */
export default function PackageCard({ pkg, forceQuote = false, popular = false }) {
  const { openQuote } = useUI();
  const quote = forceQuote || pkg.action === 'quote' || !pkg.orderName;

  return (
    <div className={`price__item${popular ? ' is-popular' : ''}`}>
      {popular && <span className="lmp-pricing__badge">Most popular</span>}
      <div className="price__info">
        <h3 className="price__title">
          {pkg.title.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h3>
        <ul className={pkg.listClass}>
          {pkg.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        {quote ? (
          <button
            className="as-btn"
            type="button"
            onClick={() => {
              trackCta(`quote_${pkg.id}`, 'package_card');
              openQuote();
            }}
          >
            ORDER NOW
          </button>
        ) : (
          <Form action="/order/order-now" onSubmit={() => trackCta(`order_${pkg.id}`, 'package_card')}>
            <input type="hidden" name="package" value={pkg.id} />
            <button className={pkg.buttonClass} type="submit">
              ORDER NOW
            </button>
          </Form>
        )}
      </div>
      <div className={`price__amount${pkg.monthly ? ' monthly' : ''}`}>
        <p>
          {pkg.priceLabel}
          {pkg.oldPrice && <span>{pkg.oldPrice}</span>}
        </p>
        {pkg.period && <span>{pkg.period}</span>}
        <div className="number">
          <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
        </div>
      </div>
    </div>
  );
}
