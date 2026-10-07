import QuoteForm from '@/components/forms/QuoteForm';
import TrackedLink from '@/components/ui/TrackedLink';
import { site } from '@/data/site';

/** Closing section on service pages: the quote form again, plus phone and email for people who prefer them. */
export default function ServiceQuote({ serviceName }) {
  return (
    <section className="lmp-service-quote" id="service-quote">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <p className="lmp-hero__eyebrow">Ready when you are</p>
            <h2 className="lmp-section-title lmp-section-title--light">Start your {serviceName.toLowerCase()} project</h2>
            <p className="lmp-service-quote__text">
              Send us a few details and we’ll come back with ideas, a recommended package and a clear price.
            </p>
            <ul className="lmp-service-quote__contact">
              <li>
                <TrackedLink href={`tel:${site.phoneE164}`} cta="call" location="closing">
                  <i className="fa-solid fa-phone" aria-hidden="true" /> {site.phone}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink href={`mailto:${site.email}`} cta="email" location="closing">
                  <i className="fa-solid fa-envelope" aria-hidden="true" /> {site.email}
                </TrackedLink>
              </li>
            </ul>
          </div>
          <div className="col-lg-7">
            <div className="lmp-hero__card">
              <QuoteForm variant="service-footer" subject={`${serviceName} quote`} idPrefix="closing-quote" submitLabel="Send my project details" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
