'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap, useGSAP } from '@/lib/gsap';
import { useUI } from './UIContext';

/**
 * The theme's "#btn_wrapper" button: magnetic hover, ripple span that follows the pointer,
 * and a bounce-in when scrolled into view.
 *
 * action: 'link' (href) | 'quote' (opens the quote popup) | 'chat' (opens live chat) | 'submit' (form button)
 */
export default function MagneticButton({
  href = '#',
  action = 'link',
  className = 'wc-btn-primary btn-hover btn-item',
  wrapperClassName,
  reveal = true,
  disabled = false,
  wrapperProps,
  children,
}) {
  const { openQuote, openChat } = useUI();
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!reveal) return;
      gsap.from(wrapRef.current, {
        scrollTrigger: { trigger: wrapRef.current, start: 'top center+=150' },
        opacity: 0,
        y: -70,
        ease: 'bounce',
        duration: 1.5,
      });
    },
    { scope: wrapRef },
  );

  const onMove = contextSafe((e) => {
    const r = wrapRef.current.getBoundingClientRect();
    gsap.to(btnRef.current, {
      x: ((e.clientX - r.left - r.width / 2) / r.width) * 80,
      y: ((e.clientY - r.top - r.height / 2) / r.height) * 80,
      duration: 0.5,
      ease: 'power2.out',
    });
  });
  const onLeave = contextSafe(() => gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' }));

  const placeRipple = (e) => {
    const r = btnRef.current.getBoundingClientRect();
    if (spanRef.current) {
      spanRef.current.style.top = `${e.clientY - r.top}px`;
      spanRef.current.style.left = `${e.clientX - r.left}px`;
    }
  };

  const content = (
    <>
      <span ref={spanRef} />
      {children}
    </>
  );
  const common = { ref: btnRef, className, onMouseEnter: placeRipple, onMouseOut: placeRipple };

  let button;
  if (action === 'submit') {
    button = (
      <button type="submit" disabled={disabled} {...common}>
        {content}
      </button>
    );
  } else if (action === 'quote' || action === 'chat') {
    button = (
      <a
        href="#"
        role="button"
        {...common}
        onClick={(e) => {
          e.preventDefault();
          if (action === 'quote') openQuote();
          else openChat();
        }}
      >
        {content}
      </a>
    );
  } else {
    button = (
      <Link href={href} {...common}>
        {content}
      </Link>
    );
  }

  return (
    <div id="btn_wrapper" className={wrapperClassName} {...wrapperProps} ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      {button}
    </div>
  );
}
