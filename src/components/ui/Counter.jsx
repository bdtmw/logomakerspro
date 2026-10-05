'use client';

import { useEffect, useRef, useState } from 'react';

/** Counts the number in `value` (e.g. "1000+") up from 0 when fully in view, like counterUp. */
export default function Counter({ value, className = 'counter__number', duration = 1000 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = String(value).match(/^(\D*)(\d[\d,]*)(.*)$/);
    if (!el || !match) return undefined;
    const [, pre, num, post] = match;
    const target = Number(num.replace(/,/g, ''));
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          setDisplay(`${pre}${Math.round(target * p).toLocaleString('en-US').replace(/,/g, num.includes(',') ? ',' : '')}${post}`);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <h2 className={className} ref={ref}>
      {display}
    </h2>
  );
}
