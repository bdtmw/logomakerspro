import QuoteButton from '@/components/ui/QuoteButton';
import { testimonials } from '@/data/testimonials';

/**
 * Client reviews on service pages as cards (all at once, no slider), skipping the one already quoted in the
 * hero, plus a closing card that turns the proof into a quote request.
 */
export default function TestimonialGrid({ exclude }) {
  const items = testimonials.filter((t) => t !== exclude);
  return (
    <section className="lmp-reviews">
      <div className="container">
        <p className="lmp-hero__eyebrow">Client stories</p>
        <h2 className="lmp-section-title">What our clients say</h2>
        <div className="lmp-reviews__grid">
          {items.map((t) => (
            <figure className="lmp-reviews__card" key={t.name}>
              <i className="fa-solid fa-quote-left lmp-reviews__mark" aria-hidden="true" />
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="lmp-reviews__avatar" aria-hidden="true">
                  {t.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <span>
                  <strong>{t.name}</strong>
                  <small>Logo Makers Pro client</small>
                </span>
              </figcaption>
            </figure>
          ))}
          <div className="lmp-reviews__card lmp-reviews__card--cta">
            <p className="lmp-reviews__cta-title">Your project could be next</p>
            <p>Tell us what you need and get ideas and a clear price, with no obligation.</p>
            <QuoteButton location="reviews">Get a free quote</QuoteButton>
          </div>
        </div>
      </div>
    </section>
  );
}
