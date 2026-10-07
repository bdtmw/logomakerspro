import QuoteForm from '@/components/forms/QuoteForm';
import TrackedLink from '@/components/ui/TrackedLink';
import { site } from '@/data/site';

/**
 * Above-the-fold block for service pages: the promise (H1 + lead), three verified highlights, the starting
 * price and two ways to act (see pricing, call), with a short quote form beside it.
 */
export default function ServiceHero({ eyebrow, title, lead, highlights = [], price, serviceName }) {
  return (
    <section className="lmp-hero" id="service-hero">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-7">
            {eyebrow && <p className="lmp-hero__eyebrow">{eyebrow}</p>}
            <h1 className="lmp-hero__title">{title}</h1>
            {lead && <p className="lmp-hero__lead">{lead}</p>}
            {highlights.length > 0 && (
              <ul className="lmp-hero__highlights">
                {highlights.map((h) => (
                  <li key={h}>
                    <i className="fa-solid fa-check" aria-hidden="true" /> {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="lmp-hero__actions">
              {price && (
                <TrackedLink href="#packages" cta="see_pricing" location="hero" className="lmp-btn lmp-btn--dark">
                  See packages {price.label} <i className="fa-solid fa-arrow-down" aria-hidden="true" />
                </TrackedLink>
              )}
              <TrackedLink href={`tel:${site.phoneE164}`} cta="call" location="hero" className="lmp-btn lmp-btn--ghost">
                <i className="fa-solid fa-phone" aria-hidden="true" /> {site.phone}
              </TrackedLink>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="lmp-hero__card">
              <p className="lmp-hero__card-title">Get a free quote</p>
              <p className="lmp-hero__card-text">Tell us what you need. No obligation, just ideas and a clear price.</p>
              <QuoteForm variant="service-hero" subject={`${serviceName} quote`} idPrefix="hero-quote" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
