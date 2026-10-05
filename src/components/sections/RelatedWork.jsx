import Image from 'next/image';
import Link from 'next/link';
import { portfolioTabs } from '@/data/portfolio';

/** Four portfolio pieces related to a service, linking to the full portfolio. */
export default function RelatedWork({ tab, from = 0, count = 4 }) {
  const group = portfolioTabs.find((t) => t.label === tab);
  if (!group) return null;
  const items = group.items.slice(from, from + count);

  return (
    <section className="workflow__area-6 lmp-related-work">
      <div className="container g-0 line pb-130">
        <div className="col-sm-12">
          <h2 className="workflow-head">Recent {tab.toLowerCase()} work</h2>
        </div>
        <div className="line-3" />
        <div className="row">
          {items.map((it) => (
            <div className="col-sm-3" key={it.thumb.src}>
              <Link href="/portfolio" className="lmp-related-work__item">
                <div className="img-box-logo">
                  <Image
                    src={it.thumb.src}
                    alt={it.thumb.alt}
                    width={it.thumb.width}
                    height={it.thumb.height}
                    sizes="(min-width: 576px) 25vw, 100vw"
                  />
                </div>
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
