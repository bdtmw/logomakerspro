import QuoteButton from '@/components/ui/QuoteButton';
import Stars from '@/components/ui/Stars';
import TrackedLink from '@/components/ui/TrackedLink';
import { reviewProfiles } from '@/data/site';
import { testimonials } from '@/data/testimonials';

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/**
 * Client reviews on service pages as cards (all at once, no slider), skipping the one already quoted in the
 * hero, plus a closing card that turns the proof into a quote request.
 */
export default function TestimonialGrid({ exclude, max = 5 }) {
  // Platform reviews (rated, with a source) first, newest first; then the site's own testimonials.
  const items = testimonials
    .filter((t) => t !== exclude)
    .sort((a, b) => Number(Boolean(b.source)) - Number(Boolean(a.source)) || (b.date || '').localeCompare(a.date || ''))
    .slice(0, max);
  return (
    <section className="lmp-reviews">
      <div className="container">
        <p className="lmp-hero__eyebrow">Client stories</p>
        <h2 className="lmp-section-title">What our clients say</h2>
        <div className="lmp-reviews__grid">
          {items.map((t) => (
            <figure className="lmp-reviews__card" key={t.name + (t.date || '')}>
              {t.rating ? (
                <Stars value={t.rating} />
              ) : (
                <i className="fa-solid fa-quote-left lmp-reviews__mark" aria-hidden="true" />
              )}
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
                  <small>
                    {t.source ? (
                      <>
                        {t.url ? (
                          <a href={t.url} target="_blank" rel="noopener noreferrer">
                            via {t.source}
                          </a>
                        ) : (
                          `via ${t.source}`
                        )}
                        {t.date && ` · ${formatDate(t.date)}`}
                      </>
                    ) : (
                      'Logo Makers Pro client'
                    )}
                  </small>
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
        {reviewProfiles.length > 0 && (
          <ul className="lmp-reviews__profiles">
            {reviewProfiles.map((p) => (
              <li key={p.name}>
                {p.rating && p.count && (
                  <>
                    <Stars value={p.rating} />
                    <span>
                      Rated {p.rating}/5 from {p.count} reviews on {p.name}.
                    </span>{' '}
                  </>
                )}
                <TrackedLink href={p.url} cta={`reviews_${p.name.toLowerCase()}`} location="reviews" target="_blank" rel="noopener noreferrer">
                  Read all our reviews on {p.name} <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </TrackedLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
