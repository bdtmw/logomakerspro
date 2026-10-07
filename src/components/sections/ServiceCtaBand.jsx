import QuoteButton from '@/components/ui/QuoteButton';
import TrackedLink from '@/components/ui/TrackedLink';
import { site } from '@/data/site';

/** Mid-page prompt for visitors who have read the pricing but haven't picked a package. */
export default function ServiceCtaBand() {
  return (
    <section className="lmp-cta-band">
      <div className="container">
        <div className="lmp-cta-band__inner">
          <div>
            <h2>Not sure which package fits?</h2>
            <p>Tell us about your project and we’ll recommend one, free and with no obligation.</p>
          </div>
          <div className="lmp-cta-band__actions">
            <QuoteButton location="mid">Get a free quote</QuoteButton>
            <TrackedLink href={`tel:${site.phoneE164}`} cta="call" location="mid" className="lmp-btn lmp-btn--ghost-light">
              <i className="fa-solid fa-phone" aria-hidden="true" /> {site.phone}
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
