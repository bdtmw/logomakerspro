'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/admin/actions';

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: 'fa-solid fa-gauge' },
  { href: '/admin/leads', label: 'Leads', icon: 'fa-solid fa-address-book' },
  { href: '/admin/pipeline', label: 'Pipeline', icon: 'fa-solid fa-table-columns' },
  { href: '/admin/analytics', label: 'Analytics', icon: 'fa-solid fa-chart-column' },
  { href: '/admin/leads/new', label: 'Add lead', icon: 'fa-solid fa-user-plus' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const active = (href) =>
    href === '/admin' ? pathname === '/admin' : href === '/admin/leads' ? pathname.startsWith('/admin/leads') && pathname !== '/admin/leads/new' : pathname === href;

  return (
    <nav className="crm-nav" aria-label="CRM">
      <Link href="/admin" className="crm-nav__brand">
        Logo Makers Pro <span>CRM</span>
      </Link>
      <ul>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={active(l.href) ? 'crm-nav__link is-active' : 'crm-nav__link'} aria-current={active(l.href) ? 'page' : undefined}>
              <i className={l.icon} aria-hidden="true" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="crm-nav__foot">
        <a href="/api/admin/export" className="crm-nav__link">
          <i className="fa-solid fa-file-csv" aria-hidden="true" />
          Export CSV
        </a>
        <a href="/" className="crm-nav__link" target="_blank" rel="noopener">
          <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
          View site
        </a>
        <form action={logout}>
          <button type="submit" className="crm-nav__link">
            <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
            Log out
          </button>
        </form>
      </div>
    </nav>
  );
}
