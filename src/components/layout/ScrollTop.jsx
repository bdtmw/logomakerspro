'use client';

import { useEffect, useState } from 'react';
import { ScrollSmoother } from '@/lib/gsap';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, true);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className="scroll-top"
      id="scroll_top"
      type="button"
      aria-label="Scroll to top"
      onClick={toTop}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
}
