import Counter from '@/components/ui/Counter';
import { trustStats } from '@/data/copy';

/** Proof right under the hero: the same project counts as the home page. */
export default function TrustStrip() {
  return (
    <section className="lmp-trust" aria-label="Our track record">
      <div className="container">
        <ul className="lmp-trust__list">
          {trustStats.map((s) => (
            <li key={s.label}>
              <Counter value={s.value} className="lmp-trust__value" as="span" />
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
