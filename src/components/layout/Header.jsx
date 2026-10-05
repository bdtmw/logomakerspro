'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { headerNav } from '@/data/site';
import { useUI } from '@/components/ui/UIContext';
import MenuText from './MenuText';

export default function Header() {
  const { setOffcanvasOpen } = useUI();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header__area-3${sticky ? ' sticky-3' : ''}`}>
      <div className="header__inner-3">
        <div className="header__logo-2">
          <Link className="logo-dark" href="/">
            <Image src="/assets/imgs/logo/logo-black.webp" alt="Site Logo" width={150} height={83} priority />
          </Link>
          <Link className="logo-light" href="/">
            <Image src="/assets/imgs/logo/site-logo-white-2.webp" alt="Site Logo" width={150} height={83} />
          </Link>
        </div>
        <div className="header__nav-2">
          <ul className="main-menu-3 menu-anim">
            {headerNav.map((item) => (
              <li key={item.label} className={item.className}>
                <Link href={item.href}>
                  <MenuText>{item.label}</MenuText>
                </Link>
                {item.children && (
                  <ul className="main-dropdown">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href}>{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="header__nav-icon-3">
          <button id="open_offcanvas" type="button" aria-label="Open menu" onClick={() => setOffcanvasOpen(true)}>
            <Image src="/assets/imgs/icon/menu-black.png" alt="Menubar Icon" width={21} height={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
