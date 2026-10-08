import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';
import { SOURCES, STATUSES, sourceLabel } from '@/lib/crm-constants';
import { fmtAgo, fmtDay, fmtMoney, isDue } from '@/lib/crm-format';
import { listLeads } from '@/lib/server/crm';
import { requireAdmin } from '@/lib/server/admin-auth';

export const metadata = { title: 'Leads' };

const one = (v) => (Array.isArray(v) ? v[0] : v) || '';

export default async function LeadsPage({ searchParams }) {
  await requireAdmin();
  const sp = await searchParams;
  const filters = { q: one(sp.q), status: one(sp.status), source: one(sp.source), page: Number(one(sp.page)) || 1 };
  const { rows, count, pageSize } = await listLeads(filters);
  const pages = Math.max(1, Math.ceil(count / pageSize));
  const pageHref = (page) => {
    const p = new URLSearchParams();
    for (const k of ['q', 'status', 'source']) if (filters[k]) p.set(k, filters[k]);
    if (page > 1) p.set('page', String(page));
    const s = p.toString();
    return s ? `/admin/leads?${s}` : '/admin/leads';
  };
  const filtered = filters.q || filters.status || filters.source;

  return (
    <>
      <header className="crm-head">
        <h1>
          Leads <span className="crm-head__count">{count}</span>
        </h1>
        <Link href="/admin/leads/new" className="crm-btn crm-btn--primary">
          <i className="fa-solid fa-plus" aria-hidden="true" /> Add lead
        </Link>
      </header>

      <form className="crm-filters" role="search">
        <input type="search" name="q" defaultValue={filters.q} placeholder="Search name, email, phone, company…" aria-label="Search leads" />
        <select name="status" defaultValue={filters.status} aria-label="Status">
          <option value="">All stages</option>
          <option value="open">Open (new, contacted, quoted)</option>
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <select name="source" defaultValue={filters.source} aria-label="Source">
          <option value="">All sources</option>
          {Object.entries(SOURCES).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
        <button type="submit" className="crm-btn">
          Filter
        </button>
        {filtered && (
          <Link href="/admin/leads" className="crm-btn crm-btn--ghost">
            Clear
          </Link>
        )}
      </form>

      <div className="crm-card crm-table-wrap">
        {rows.length ? (
          <table className="crm-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Interested in</th>
                <th>Source</th>
                <th>Stage</th>
                <th className="crm-num">Value</th>
                <th>Follow up</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id}>
                  <td>
                    <Link href={`/admin/leads/${l.id}`} className="crm-table__lead">
                      <strong>{l.name || 'No name'}</strong>
                      <span>{l.email || l.phone}</span>
                    </Link>
                  </td>
                  <td>{l.interest}</td>
                  <td>{sourceLabel(l.source)}</td>
                  <td>
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="crm-num">{fmtMoney(l.value)}</td>
                  <td>{l.follow_up ? <span className={isDue(l.follow_up) ? 'crm-due' : undefined}>{fmtDay(l.follow_up)}</span> : ''}</td>
                  <td>{fmtAgo(l.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="crm-empty">{filtered ? 'No leads match these filters.' : 'No leads yet. Website forms, orders and chatbot leads appear here automatically.'}</p>
        )}
      </div>

      {pages > 1 && (
        <nav className="crm-pager" aria-label="Pages">
          {filters.page > 1 && <Link href={pageHref(filters.page - 1)}>← Previous</Link>}
          <span>
            Page {filters.page} of {pages}
          </span>
          {filters.page < pages && <Link href={pageHref(filters.page + 1)}>Next →</Link>}
        </nav>
      )}
    </>
  );
}
