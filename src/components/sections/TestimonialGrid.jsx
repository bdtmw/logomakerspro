import QuoteButton from '@/components/ui/QuoteButton';
import Stars from '@/components/ui/Stars';
import TrackedLink from '@/components/ui/TrackedLink';
import { reviewProfiles } from '@/data/site';
import { platformReviews, testimonials } from '@/data/testimonials';

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/**
 * Client reviews on service pages as cards (all at once, no slider), skipping the one already quoted in the
 * hero, plus a closing card that turns the proof into a quote request.
 */
/**
 * Pick the reviews for a page: 5-star only, minus the hero quote. Reviews about this page's topic come first.
 * Featured reviews follow, rotated by topic so different pages show a different mix, then other platform reviews
 * (newest first), then the site's own testimonials. Reviews tagged with another topic are left out.
 */
function pickReviews({ exclude, topic, max }) {
  const pool = [...platformReviews, ...testimonials].filter(
    (t) => t !== exclude && (t.rating === undefined || t.rating === 5) && (!t.topics || t.topics.includes(topic)),
  );
  const onTopic = pool.filter((t) => t.topics?.includes(topic));
  const featured = pool.filter((t) => t.featured && !onTopic.includes(t));
  const shift = [...(topic || '')].reduce((n, c) => n + c.charCodeAt(0), 0) % (featured.length || 1);
  const rotated = [...featured.slice(shift), ...featured.slice(0, shift)];
  const rest = pool
    .filter((t) => !onTopic.includes(t) && !featured.includes(t))
    .sort((a, b) => Number(Boolean(b.source)) - Number(Boolean(a.source)) || (b.date || '').localeCompare(a.date || ''));
  return [...onTopic, ...rotated, ...rest].slice(0, max);
}

export default function TestimonialGrid({ exclude, topic, max = 5 }) {
  const items = pickReviews({ exclude, topic, max });
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
                    .slice(0, 2)
                    .toUpperCase()}
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
                {p.fiveStarPct && p.count && (
                  <>
                    <Stars value={5} />
                    <span>
                      {p.fiveStarPct}% of our {p.count} {p.name} reviews are 5 stars.
                    </span>{' '}
                  </>
                )}
                {p.rating && p.count && (
                  <span>
                    Rated {p.rating}/5 from {p.count} reviews on {p.name}.
                  </span>
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
