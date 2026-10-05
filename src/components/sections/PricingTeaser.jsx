import { packageCategories } from '@/data/packages';
import MagneticButton from '@/components/ui/MagneticButton';

/** "Packages and pricing" band on a service page: three package summaries + a link to the full price list. */
export default function PricingTeaser({ category, ids }) {
  const cat = packageCategories[category];
  if (!cat) return null;
  const picks = ids.map((id) => cat.cards.find((c) => c.id === id)).filter(Boolean);
  const startsAt = cat.cards[0];

  return (
    <section className="workflow__area-6 lmp-pricing-teaser">
      <div className="container g-0 line pb-130">
        <div className="col-sm-12">
          <h2 className="workflow-head">Packages and pricing</h2>
        </div>
        <div className="line-3" />
        <div className="workflow__wrapper-6">
          <div className="row">
            {picks.map((pkg) => (
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4" key={pkg.id}>
                <div className="workflow__slide-6">
                  <h3 className="workflow__title-6">{pkg.title.join(' ')}</h3>
                  <p className="lmp-pricing-teaser__price">
                    {pkg.priceLabel}
                    {pkg.period ? ` ${pkg.period.toLowerCase()}` : ''}
                  </p>
                  <p>{pkg.features.slice(0, 4).join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lmp-pricing-teaser__cta">
            <p>
              {cat.cards.length} {cat.heading.toLowerCase()} from {startsAt.priceLabel}
              {startsAt.period ? ` ${startsAt.period.toLowerCase()}` : ''}.
            </p>
            <MagneticButton href={`/${category}-package`} className="wc-btn-primary btn-hover btn-item">
              See all <br />
              packages <i className="fa-solid fa-arrow-right" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
