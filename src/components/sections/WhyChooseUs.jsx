/**
 * "Why choose us" on service pages: the service's intro copy beside four concrete reasons (icon cards). Each
 * reason comes from `whyChooseUs` in src/data/copy.js and is backed by the package data.
 */
export default function WhyChooseUs({ title, intro, items = [] }) {
  if (!items.length) return null;
  return (
    <section className="lmp-why">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <p className="lmp-hero__eyebrow">Why choose us</p>
            <h2 className="lmp-section-title">{title}</h2>
            {intro && <p className="lmp-why__intro">{intro}</p>}
          </div>
          <div className="col-lg-8">
            <ul className="lmp-why__grid">
              {items.map((it) => (
                <li key={it.title} className="lmp-why__card">
                  <span className="lmp-why__icon" aria-hidden="true">
                    <i className={`fa-solid ${it.icon}`} />
                  </span>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
