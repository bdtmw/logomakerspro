'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { offcanvasNav, site } from '@/data/site';
import { useUI } from '@/components/ui/UIContext';
import MenuText from './MenuText';

// React version of the jQuery MeanMenu markup the theme CSS expects inside the off-canvas panel.
function MeanMenu({ onNavigate }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="offcanvas__menu-wrapper mean-container">
      <div className="mean-bar">
        <nav className="mean-nav">
          <ul className="menu-anim">
            {offcanvasNav.map((item, i) => {
              const isOpen = expanded === item.label;
              return (
                <li key={item.label} className={i === offcanvasNav.length - 1 ? 'mean-last' : undefined}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === '#') {
                        e.preventDefault();
                        setExpanded(isOpen ? null : item.label);
                      } else onNavigate();
                    }}
                  >
                    <MenuText>{item.label}</MenuText>
                  </Link>
                  {item.children && (
                    <>
                      <ul className="main-dropdown" style={{ display: isOpen ? 'block' : 'none' }}>
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} onClick={onNavigate}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <a
                        className={`mean-expand${isOpen ? ' mean-clicked' : ''}`}
                        href="#"
                        style={{ fontSize: 36 }}
                        aria-expanded={isOpen}
                        onClick={(e) => {
                          e.preventDefault();
                          setExpanded(isOpen ? null : item.label);
                        }}
                      >
                        {isOpen ? '-' : '+'}
                      </a>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mean-push" />
    </div>
  );
}

export default function Offcanvas() {
  const { offcanvasOpen, setOffcanvasOpen } = useUI();
  const pathname = usePathname();
  const close = () => setOffcanvasOpen(false);

  useEffect(() => {
    setOffcanvasOpen(false);
  }, [pathname, setOffcanvasOpen]);

  useEffect(() => {
    if (!offcanvasOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOffcanvasOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [offcanvasOpen, setOffcanvasOpen]);

  return (
    <div
      className="offcanvas__area"
      style={{ opacity: offcanvasOpen ? 1 : 0, visibility: offcanvasOpen ? 'visible' : 'hidden' }}
      aria-hidden={!offcanvasOpen}
    >
      <div className="offcanvas__body">
        <div className="offcanvas__left">
          <div className="offcanvas__logo">
            <Link href="/" onClick={close}>
              <Image src="/assets/imgs/logo/site-logo-white-2.webp" alt="Logo Makers Pro" width={150} height={83} />
            </Link>
          </div>
          <div className="offcanvas__social">
            <h3 className="social-title">Follow Us</h3>
            <ul>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="offcanvas__links">
            <ul>
              <li>
                <Link href="/about" onClick={close}>About</Link>
              </li>
              <li>
                <Link href="/contact" onClick={close}>contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="offcanvas__mid">
          <MeanMenu onNavigate={close} />
        </div>
        <div className="offcanvas__right">
          <div className="offcanvas__search" />
          <div className="offcanvas__contact">
            <h3>Get in touch</h3>
            <ul>
              <li>
                <a href={`tel:${site.phone}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>{site.address}</li>
            </ul>
          </div>
          <Image src="/assets/imgs/shape/11.png" alt="" className="shape-1" width={189} height={94} />
          <Image src="/assets/imgs/shape/12.png" alt="" className="shape-2" width={81} height={80} />
        </div>
        <div className="offcanvas__close">
          <button id="close_offcanvas" type="button" aria-label="Close menu" onClick={close}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
    </div>
  );
}
