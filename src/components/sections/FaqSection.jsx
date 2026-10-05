'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

/** FAQ accordion in the theme's faq__area-6 style. Answers stay in the HTML when collapsed. */
export default function FaqSection({ title = 'Frequently asked questions', intro, items, idPrefix = 'faq' }) {
  const [open, setOpen] = useState(0);
  const first = useRef(true);

  // The page height changes as answers open and close; keep scroll-trigger positions accurate.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    ScrollTrigger.refresh();
  }, [open]);

  if (!items?.length) return null;

  return (
    <section className="faq__area-6 lmp-faq">
      <div className="container g-0 line pb-140">
        <div className="line-3" />
        <div className="row">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
            <div className="sec-title-wrapper">
              <h2 className="sec-title">{title}</h2>
              {intro && <p>{intro}</p>}
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
            <div className="faq__list-6">
              <div className="accordion">
                {items.map((item, i) => {
                  const isOpen = open === i;
                  const hid = `${idPrefix}-h-${i}`;
                  const bid = `${idPrefix}-b-${i}`;
                  return (
                    <div className="accordion-item" key={item.q}>
                      <h3 className="accordion-header" id={hid}>
                        <button
                          className={`accordion-button${isOpen ? '' : ' collapsed'}`}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={bid}
                          onClick={() => setOpen(isOpen ? -1 : i)}
                        >
                          {item.q}
                        </button>
                      </h3>
                      <div
                        id={bid}
                        className={`accordion-collapse collapse${isOpen ? ' show' : ''}`}
                        role="region"
                        aria-labelledby={hid}
                      >
                        <div className="accordion-body">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
