'use client';

import { usePathname } from 'next/navigation';
import { ScrollSmoother, ScrollTrigger, useGSAP } from '@/lib/gsap';

// ScrollSmoother setup from the theme: smooth 1.35, data-speed/data-lag effects on screens >= 1025px.
// Recreated on every route change so new pages' data-speed elements are picked up.
export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.35,
        effects: window.innerWidth >= 1025,
        smoothTouch: false,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });
      if (!window.location.hash) smoother.scrollTop(0);
      // Images loading late change the page height; keep trigger positions accurate.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      return () => {
        window.removeEventListener('load', refresh);
        smoother.kill();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
