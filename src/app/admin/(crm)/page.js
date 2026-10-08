import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';
import { OPEN_STATUSES, STATUSES, sourceLabel } from '@/lib/crm-constants';
import { fmtAgo, fmtDay, fmtMoney } from '@/lib/crm-format';
import { dashboard } from '@/lib/server/crm';
import { requireAdmin } from '@/lib/server/admin-auth';

export const metadata = { title: 'Dashboard' };

function LeadRow({ lead, extra }) {
  return (
    <li>
      <Link href={`/admin/leads/${lead.id}`} className="crm-list__row">
        <span className="crm-list__main">
          <strong>{lead.name || lead.email || 'No name'}</strong>
          <span>{lead.interest || sourceLabel(lead.source)}</span>
        </span>
        <span className="crm-list__meta">{extra}</span>
      </Link>
    </li>
  );
}

export default async function Dashboard() {
  await requireAdmin();
  const { byStatus, bySource, totals, due, recent } = await dashboard();
  const stage = Object.fromEntries(byStatus.map((r) => [r.status, r]));
  const openCount = OPEN_STATUSES.reduce((n, s) => n + (stage[s]?.count || 0), 0);
  const openValue = OPEN_STATUSES.reduce((n, s) => n + (stage[s]?.value || 0), 0);
  const maxStage = Math.max(1, ...STATUSES.map((s) => stage[s.id]?.count || 0));

  return (
    <>
      <header className="crm-head">
        <h1>Dashboard</h1>
        <Link href="/admin/leads/new" className="crm-btn crm-btn--primary">
          <i className="fa-solid fa-plus" aria-hidden="true" /> Add lead
        </Link>
      </header>

      <section className="crm-stats" aria-label="Summary">
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">New leads, last 7 days</span>
          <strong className="crm-stat__value">{totals.week}</strong>
          <span className="crm-stat__sub">{totals.month} in the last 30 days</span>
        </div>
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">Open leads</span>
          <strong className="crm-stat__value">{openCount}</strong>
          <span className="crm-stat__sub">{stage.new?.count || 0} not contacted yet</span>
        </div>
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">Open pipeline value</span>
          <strong className="crm-stat__value">{fmtMoney(openValue)}</strong>
          <span className="crm-stat__sub">From leads with a deal value</span>
        </div>
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">Won, last 30 days</span>
          <strong className="crm-stat__value">{totals.won_month}</strong>
          <span className="crm-stat__sub">{fmtMoney(totals.won_value_month)}</span>
        </div>
      </section>

      <div className="crm-grid">
        <section className="crm-card">
          <h2>Follow-ups due</h2>
          {due.length ? (
            <ul className="crm-list">
              {due.map((l) => (
                <LeadRow key={l.id} lead={l} extra={<span className="crm-due">{fmtDay(l.follow_up)}</span>} />
              ))}
            </ul>
          ) : (
            <p className="crm-empty">Nothing due. Set a follow-up date on a lead to see it here.</p>
          )}
        </section>

        <section className="crm-card">
          <h2>
            New leads <Link href="/admin/leads?status=new">See all</Link>
          </h2>
          {recent.length ? (
            <ul className="crm-list">
              {recent.map((l) => (
                <LeadRow key={l.id} lead={l} extra={fmtAgo(l.created_at)} />
              ))}
            </ul>
          ) : (
            <p className="crm-empty">No new leads. Website forms, orders and chatbot leads appear here automatically.</p>
          )}
        </section>

        <section className="crm-card">
          <h2>
            Pipeline <Link href="/admin/pipeline">Open board</Link>
          </h2>
          <ul className="crm-bars">
            {STATUSES.map((s) => (
              <li key={s.id}>
                <Link href={`/admin/leads?status=${s.id}`}>
                  <StatusBadge status={s.id} />
                  <span className="crm-bars__track">
                    <span className="crm-bars__fill" style={{ width: `${((stage[s.id]?.count || 0) / maxStage) * 100}%` }} />
                  </span>
                  <span className="crm-bars__num">
                    {stage[s.id]?.count || 0}
                    {stage[s.id]?.value ? <small>{fmtMoney(stage[s.id].value)}</small> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="crm-card">
          <h2>Where leads came from, last 30 days</h2>
          {bySource.length ? (
            <ul className="crm-list">
              {bySource.map((r) => (
                <li key={r.source}>
                  <Link href={`/admin/leads?source=${r.source}`} className="crm-list__row">
                    <span className="crm-list__main">
                      <strong>{sourceLabel(r.source)}</strong>
                    </span>
                    <span className="crm-list__meta">{r.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="crm-empty">No leads in the last 30 days.</p>
          )}
        </section>
      </div>
    </>
  );
}
