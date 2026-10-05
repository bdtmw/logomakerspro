'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { portfolioTabs } from '@/data/portfolio';
import Lightbox from '@/components/ui/Lightbox';
import MagneticButton from '@/components/ui/MagneticButton';
import Tabs from '@/components/ui/Tabs';

/** "Our Portfolio" tabbed gallery used on the home and portfolio pages. */
export default function PortfolioSection() {
  // One gallery across all tabs, like the original data-fancybox="gallery".
  const all = useMemo(() => portfolioTabs.flatMap((t) => t.items.map((it) => ({ src: it.full, alt: it.thumb.alt }))), []);
  const [open, setOpen] = useState(null);

  let offset = 0;
  const tabs = portfolioTabs.map((tab) => {
    const start = offset;
    offset += tab.items.length;
    return {
      label: tab.label,
      content: (
        <div className="row">
          {tab.items.map((it, i) => (
            <div className="col-sm-3" key={it.thumb.src + i}>
              <a
                href={it.full}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(start + i);
                }}
              >
                <div className="img-box-logo">
                  <Image src={it.thumb.src} alt={it.thumb.alt} width={it.thumb.width} height={it.thumb.height} sizes="(min-width: 576px) 25vw, 100vw" />
                </div>
              </a>
            </div>
          ))}
        </div>
      ),
    };
  });

  return (
    <section className="home-portfolio__area">
      <div className="container-fluid">
        <div className="row">
          <h2 className="home-portfolio__text">Our Portfolio</h2>
          <div className="col-md-12 col-sm-12 col-lg-12">
            <Tabs
              tabs={tabs}
              fade
              footer={
                <div className="row">
                  <div className="col-xxl-12">
                    <MagneticButton
                      href="/packages"
                      className="wc-btn-secondary btn-hover btn-item"
                      wrapperClassName="portfolio__btn"
                      wrapperProps={{ 'data-speed': '1', 'data-lag': '0.2' }}
                    >
                      Our Packages
                    </MagneticButton>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
      {open !== null && <Lightbox images={all} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}
