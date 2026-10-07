'use client';

import Link from 'next/link';
import { trackCta } from '@/lib/track';

/** A link (internal, tel: or mailto:) that records a cta_click event before navigating. */
export default function TrackedLink({ href, cta, location, children, ...rest }) {
  const onClick = () => trackCta(cta, location);
  if (/^(tel|mailto):/.test(href) || href.startsWith('#')) {
    return (
      <a href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
