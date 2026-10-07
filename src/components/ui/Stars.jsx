/** Star rating (whole and half stars), with the number for screen readers. */
export default function Stars({ value, max = 5, className = 'lmp-stars' }) {
  return (
    <span className={className} role="img" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => {
        const icon = value >= i + 1 ? 'fa-star' : value >= i + 0.5 ? 'fa-star-half-stroke' : 'fa-star lmp-stars__off';
        return <i key={i} className={`fa-solid ${icon}`} aria-hidden="true" />;
      })}
    </span>
  );
}
