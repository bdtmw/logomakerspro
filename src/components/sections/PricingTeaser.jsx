import { packageCategories } from '@/data/packages';
import QuoteButton from '@/components/ui/QuoteButton';
import OfferCallout from './OfferCallout';
import TrackedLink from '@/components/ui/TrackedLink';

// Lines every package shares (guarantees, rights); left off the cards so the differences stand out.
const COMMON = /guarantee|satisfaction|ownership|money back|dedicated (support|account)/i;

/**
 * "Packages and pricing" on a service page (anchor #packages): three package cards, each with its key features
 * and an Order now button, then a link to the full price list and a quote option for undecided visitors.
 */
export default function PricingTeaser({ category, ids, note, popular }) {
  const cat = packageCategories[category];
  if (!cat) return null;
  const picks = ids.map((id) => cat.cards.find((c) => c.id === id)).filter(Boolean);
  const startsAt = cat.cards[0];

  return (
    <section className="lmp-pricing" id="packages">
      <div className="container">
        <div className="lmp-pricing__head">
          <h2 className="lmp-section-title">Packages and pricing</h2>
          {note && <p>{note}</p>}
        </div>
        <OfferCallout />
        <div className="row g-4">
          {picks.map((pkg) => (
            <div className="col-lg-4" key={pkg.id}>
              <div className={`lmp-pricing__card${pkg.id === popular ? ' is-popular' : ''}`}>
                {pkg.id === popular && <span className="lmp-pricing__badge">Most popular</span>}
                <h3>{pkg.title.join(' ')}</h3>
                <p className="lmp-pricing__price">
                  {pkg.priceLabel}
                  {pkg.period && <small> {pkg.period.toLowerCase()}</small>}
                </p>
                <ul>
                  {pkg.features
                    .filter((f) => !COMMON.test(f))
                    .slice(0, 5)
                    .map((f) => (
                      <li key={f}>
                        <i className="fa-solid fa-check" aria-hidden="true" /> {f.replace(/\s*\*$/, '')}
                      </li>
                    ))}
                </ul>
                <TrackedLink
                  href={`/order/order-now?package=${encodeURIComponent(pkg.id)}`}
                  cta={`order_${pkg.id}`}
                  location="pricing"
                  className="lmp-btn lmp-btn--dark lmp-btn--block"
                >
                  Order now
                </TrackedLink>
              </div>
            </div>
          ))}
        </div>
        <div className="lmp-pricing__foot">
          <p>
            {cat.cards.length} {cat.heading.toLowerCase()} from {startsAt.priceLabel}
            {startsAt.period ? ` ${startsAt.period.toLowerCase()}` : ''}.{' '}
            <TrackedLink href={`/${category}-package`} cta="all_packages" location="pricing">
              Compare all packages
            </TrackedLink>
          </p>
          <QuoteButton location="pricing">Not sure? Get a free quote</QuoteButton>
        </div>
      </div>
    </section>
  );
}
