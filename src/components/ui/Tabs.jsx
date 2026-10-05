'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

/** Bootstrap "nav-pills" tabs without Bootstrap JS. tabs: [{ label, content }] */
export default function Tabs({ tabs, fade = false, idPrefix = 'pills', footer = null }) {
  const [active, setActive] = useState(0);
  const first = useRef(true);

  // Page height changes when switching tabs; recalculate scroll-trigger positions.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    ScrollTrigger.refresh();
  }, [active]);

  return (
    <>
      <div className="packagestabs">
        <ul className="nav nav-pills mb-3" role="tablist">
          {tabs.map((t, i) => (
            <li className="nav-item" role="presentation" key={t.label}>
              <button
                className={`nav-link${active === i ? ' active' : ''}`}
                id={`${idPrefix}-${i + 1}-tab`}
                type="button"
                role="tab"
                aria-controls={`${idPrefix}-${i + 1}`}
                aria-selected={active === i}
                onClick={() => setActive(i)}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="packagescontent">
        <div className="tab-content">
          {tabs.map((t, i) => (
            <div
              key={t.label}
              className={`tab-pane${fade ? ' fade' : ''}${active === i ? ' show active' : ''}`}
              id={`${idPrefix}-${i + 1}`}
              role="tabpanel"
              aria-labelledby={`${idPrefix}-${i + 1}-tab`}
            >
              {t.content}
            </div>
          ))}
        </div>
        {footer}
      </div>
    </>
  );
}
