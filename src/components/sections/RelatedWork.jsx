import Image from 'next/image';
import Link from 'next/link';
import { portfolioTabs } from '@/data/portfolio';

/** Portfolio item `index` from tab `label`, or undefined. */
const pick = (label, index) => portfolioTabs.find((t) => t.label === label)?.items[index];

/**
 * Four portfolio pieces related to a service, linking to the full portfolio. Pass `tab`/`from`/`count` for a run
 * from one tab, or `picks` ([{ tab, index, caption }]) to hand-pick pieces from any tab with a caption each.
 */
export default function RelatedWork({ tab, from = 0, count = 4, picks, heading, intro }) {
  const items = picks
    ? picks.map((p) => ({ ...pick(p.tab, p.index), caption: p.caption })).filter((it) => it.thumb)
    : (portfolioTabs.find((t) => t.label === tab)?.items || []).slice(from, from + count);
  if (!items.length) return null;

  return (
    <section className="workflow__area-6 lmp-related-work">
      <div className="container g-0 line pb-130">
        <div className="col-sm-12">
          <h2 className="workflow-head">{heading || `Recent ${tab.toLowerCase()} work`}</h2>
          {intro && <p className="lmp-related-work__intro">{intro}</p>}
        </div>
        <div className="line-3" />
        <div className="row">
          {items.map((it) => (
            <div className={items.length === 3 ? 'col-sm-4' : 'col-sm-3'} key={it.thumb.src}>
              <Link href="/portfolio" className="lmp-related-work__item">
                <div className="img-box-logo">
                  <Image
                    src={it.thumb.src}
                    alt={it.thumb.alt}
                    width={it.thumb.width}
                    height={it.thumb.height}
                    sizes={items.length === 3 ? "(min-width: 576px) 33vw, 100vw" : "(min-width: 576px) 25vw, 100vw"}
                  />
                </div>
                {it.caption && <p className="lmp-related-work__caption">{it.caption}</p>}
              </Link>
            </div>
          ))}
        </div>
        <p className="lmp-related-work__more">
          <Link href="/portfolio">See the full portfolio</Link>
        </p>
      </div>
    </section>
  );
}
