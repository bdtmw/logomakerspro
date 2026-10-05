'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { footerNav, site } from '@/data/site';
import { useUI } from '@/components/ui/UIContext';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import MenuText from './MenuText';

const WAVE_COLORS = gsap.utils.interpolate(['#F9D371', '#F47340', '#EF2F88', '#8843F2']);

export default function Footer() {
  const { openChat } = useUI();
  const endRef = useRef(null);

  // Looping letter "wave" on the big "Let's talk" link.
  useGSAP(() => {
    const el = endRef.current;
    gsap.set(el, { opacity: 0 });
    gsap.to(el, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'bottom 100%-=50px', once: true },
    });
    const chars = new SplitText(el, { type: 'words,chars' }).chars;
    const tl = gsap.timeline({ repeat: -1, delay: 0.5, scrollTrigger: { trigger: el, start: 'bottom 100%-=50px' } });
    tl.to(chars, { duration: 0.5, scaleY: 0.6, ease: 'power3.out', stagger: 0.04, transformOrigin: 'center bottom' })
      .to(chars, { yPercent: -20, ease: 'elastic', stagger: 0.03, duration: 0.8 }, 0.5)
      .to(chars, { scaleY: 1, ease: 'elastic.out(2.5, 0.2)', stagger: 0.03, duration: 1.5 }, 0.5)
      .to(chars, { color: (i, t, all) => WAVE_COLORS(i / all.length), ease: 'power2.out', stagger: 0.03, duration: 0.3 }, 0.5)
      .to(chars, { yPercent: 0, ease: 'back', stagger: 0.03, duration: 0.8 }, 0.7)
      .to(chars, { color: '#c9f31d', duration: 1.4, stagger: 0.05 });
  });

  return (
    <footer className="footer__area-3">
      <div className="footer__top-3">
        <div className="footer__top-wrapper-3">
          <div className="footer__logo-3 pt-120">
            <Image src="/assets/imgs/logo/site-logo-white-2.webp" alt="Logo Makers Pro" width={150} height={83} />
            <p>{site.footerBlurb}</p>
          </div>
          <div className="footer__social-3">
            <ul>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label === 'Facebook' ? 'facebook' : s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__contact-3">
            <a
              className="end"
              href="#"
              ref={endRef}
              onClick={(e) => {
                e.preventDefault();
                openChat();
              }}
            >
              Let’s talk
            </a>
          </div>
        </div>
      </div>
      <div className="footer__btm-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <div className="footer__copyright-3">
                <p>
                  © {new Date().getFullYear()}{' '}
                  <Link href="/">{site.name}</Link>. All rights reserved.{' '}
                </p>
              </div>
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="footer__nav-2">
                <ul className="footer-menu-2 menu-anim">
                  {footerNav.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>
                        <MenuText>{l.label}</MenuText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
