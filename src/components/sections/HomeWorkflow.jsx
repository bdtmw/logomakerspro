'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/** Adds direction-aware callbacks at given times of a scrubbed timeline (helper from the original theme JS). */
function addPanelCallbacks(tl, { start, end, onEnter, onLeave, onEnterBack, onLeaveBack }) {
  const noop = () => {};
  if (!tl.direction) {
    const prevUpdate = tl.eventCallback('onUpdate');
    let last = tl.time();
    tl.direction = tl.reversed() ? -1 : 1;
    tl.eventCallback('onUpdate', () => {
      const now = tl.time();
      if (last !== now) {
        tl.direction = now < last ? -1 : 1;
        last = now;
      }
      if (prevUpdate) prevUpdate.call(tl);
    });
  }
  if (start >= 0) tl.add(() => ((tl.direction < 0 ? onLeaveBack : onEnter) || noop)(), start);
  if (end <= tl.duration()) tl.add(() => ((tl.direction < 0 ? onEnterBack : onLeave) || noop)(), end);
}

/**
 * "What We Do / Why Choose Us / CTA" panels. On screens wider than 1200px the section pins and the
 * panels slide horizontally while scrolling, each panel scaling in as it arrives. Same timeline as the live site.
 */
export default function HomeWorkflow({ children }) {
  const wrapRef = useRef(null);

  useGSAP(
    () => {
      if (window.innerWidth <= 1200) return;
      const panels = gsap.utils.toArray('.wf_panel', wrapRef.current);
      if (panels.length < 2) return;
      const duration = 1;
      const step = duration / (panels.length - 1);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, pin: true, scrub: 1, start: 'top top', end: '+=5000' },
      });
      tl.to(panels, { xPercent: -100 * (panels.length - 1), duration, ease: 'none' });
      panels.forEach((panel, i) => {
        const intro = gsap.from(panel, { opacity: 0, scale: 0.6, duration: 0.5, force3D: true, paused: true });
        addPanelCallbacks(tl, {
          start: step * (i - 0.99),
          end: step * (i + 0.99),
          onEnter: () => intro.play(),
          onLeave: () => intro.reverse(),
          onEnterBack: () => intro.play(),
          onLeaveBack: () => intro.reverse(),
        });
        // Starting state as rendered on the live site: the first panel sits at 0.6 scale and the others at
        // full size (a side effect of the theme's refresh order). Use `i === 0 ? 1 : 0` for the "intended" look.
        intro.progress(i === 0 ? 0 : 1);
      });
    },
    { scope: wrapRef },
  );

  return (
    <section className="workflow__area-3">
      <div className="workflow__wrapper-3" ref={wrapRef}>
        {children}
      </div>
    </section>
  );
}
