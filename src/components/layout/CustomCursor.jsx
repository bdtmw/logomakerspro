'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

// The theme's two-dot cursor that trails the pointer.
export default function CustomCursor() {
  const c1 = useRef(null);
  const c2 = useRef(null);

  useGSAP(() => {
    const x1 = gsap.quickTo(c1.current, 'x', { duration: 0.5, ease: 'power2.out' });
    const y1 = gsap.quickTo(c1.current, 'y', { duration: 0.5, ease: 'power2.out' });
    const x2 = gsap.quickTo(c2.current, 'x', { duration: 0.1, ease: 'power2.out' });
    const y2 = gsap.quickTo(c2.current, 'y', { duration: 0.1, ease: 'power2.out' });
    const move = (e) => {
      x1(e.clientX);
      y1(e.clientY);
      x2(e.clientX);
      y2(e.clientY);
    };
    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  });

  return (
    <>
      <div className="cursor1" ref={c1} />
      <div className="cursor2" ref={c2} />
    </>
  );
}
