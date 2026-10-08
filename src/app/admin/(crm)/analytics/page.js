import Link from 'next/link';
import ColumnChart from '@/components/admin/ColumnChart';
import { sourceLabel } from '@/lib/crm-constants';
import { fmtMoney } from '@/lib/crm-format';
import { requireAdmin } from '@/lib/server/admin-auth';
import { ANALYTICS_RANGES, analytics } from '@/lib/server/crm';

export const metadata = { title: 'Analytics' };

const RANGE_LABELS = { 7: 'Last 7 days', 30: 'Last 30 days', 90: 'Last 90 days', 365: 'Last 12 months' };

// Bucket starts arrive as YYYY-MM-DD dates; format them as calendar dates (UTC) so they never shift a day.
const day = (iso, opts) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });

function bucketLabels(iso, bucket) {
  if (bucket === 'month') return { label: day(iso, { month: 'long', year: 'numeric' }), tick: day(iso, { month: 'short' }) };
  const short = day(iso, { month: 'short', day: 'numeric' });
  if (bucket === 'week') return { label: `Week of ${day(iso, { month: 'short', day: 'numeric', year: 'numeric' })}`, tick: short };
  return { label: day(iso, { weekday: 'short', month: 'short', day: 'numeric' }), tick: short };
}

const pct = (n, d) => (d ? `${Math.round((n / d) * 100)}%` : '–');

function duration(seconds) {
  if (seconds === null || seconds === undefined) return '–';
  const h = seconds / 3600;
  if (h < 1) return `${Math.max(1, Math.round(seconds / 60))} min`;
  if (h < 48) return `${Math.round(h)} h`;
  return `${Math.round(h / 24)} days`;
}

/** Change vs the previous period, with an arrow and words so it never relies on color. */
function Delta({ now, before, money = false }) {
  if (!before && !now) return <span className="crm-stat__sub">No change vs previous period</span>;
  if (!before) return <span className="crm-stat__sub">None in the previous period</span>;
  const change = Math.round(((now - before) / before) * 100);
  const prev = money ? fmtMoney(before) : before.toLocaleString('en-US');
  if (change === 0) return <span className="crm-stat__sub">Same as previous period ({prev})</span>;
  const up = change > 0;
  return (
    <span className={up ? 'crm-delta crm-delta--up' : 'crm-delta crm-delta--down'}>
      <i className={up ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'} aria-hidden="true" />
      {Math.abs(change)}% {up ? 'up' : 'down'} <span>vs {prev} in the previous period</span>
    </span>
  );
}

/** A count with a thin magnitude bar behind it, for ranking tables. */
function CountBar({ value, max }) {
  return (
    <span className="crm-countbar">
      <span className="crm-countbar__track" aria-hidden="true">
        <span style={{ width: `${max ? (value / max) * 100 : 0}%` }} />
      </span>
      {value.toLocaleString('en-US')}
    </span>
  );
}

export default async function AnalyticsPage({ searchParams }) {
  await requireAdmin();
  const { range } = await searchParams;
  const a = await analytics(Number(range) || 30);
  const { totals, previous, speed } = a;
  const open = totals.leads - totals.won - totals.lost;
  const avgDeal = totals.won_valued ? totals.revenue / totals.won_valued : null;
  const chart = a.series.map((r) => ({ key: r.day, value: r.leads, ...bucketLabels(r.day, a.bucket) }));
  const per = { day: 'day', week: 'week', month: 'month' }[a.bucket];
  const sourceMax = Math.max(0, ...a.bySource.map((r) => r.leads));
  const pageMax = Math.max(0, ...a.byPage.map((r) => r.leads));
  const interestMax = Math.max(0, ...a.byInterest.map((r) => r.leads));

  return (
    <>
      <header className="crm-head">
        <h1>Analytics</h1>
      </header>

      <nav className="crm-range" aria-label="Date range">
        {ANALYTICS_RANGES.map((d) => (
          <Link key={d} href={d === 30 ? '/admin/analytics' : `/admin/analytics?range=${d}`} className={d === a.days ? 'is-active' : undefined} aria-current={d === a.days ? 'true' : undefined}>
            {RANGE_LABELS[d]}
          </Link>
        ))}
      </nav>

      <section className="crm-stats crm-stats--six" aria-label="Summary">
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">Leads</span>
          <strong className="crm-stat__value">{totals.leads.toLocaleString('en-US')}</strong>
          <Delta now={totals.leads} before={previous.leads} />
        </div>
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">Won</span>
          <strong className="crm-stat__value">{totals.won.toLocaleString('en-US')}</strong>
          <Delta now={totals.won} before={previous.won} />
        </div>
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">Win rate</span>
          <strong className="crm-stat__value">{pct(totals.won, totals.leads)}</strong>
          <span className="crm-stat__sub">
            {totals.won} won · {totals.lost} lost · {open} still open
          </span>
        </div>
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">Revenue won</span>
          <strong className="crm-stat__value">{fmtMoney(totals.revenue)}</strong>
          <Delta now={totals.revenue} before={previous.revenue} money />
        </div>
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">Average deal</span>
          <strong className="crm-stat__value">{avgDeal === null ? '–' : fmtMoney(avgDeal)}</strong>
          <span className="crm-stat__sub">
            {totals.won_valued
              ? `Across ${totals.won_valued} won ${totals.won_valued === 1 ? 'lead' : 'leads'} with a deal value`
              : 'No won leads with a deal value yet'}
          </span>
        </div>
        <div className="crm-card crm-stat">
          <span className="crm-stat__label">Time to first contact</span>
          <strong className="crm-stat__value">{duration(speed.median_seconds)}</strong>
          <span className="crm-stat__sub">
            Median, {speed.contacted} of {totals.leads} leads moved on from New
          </span>
        </div>
      </section>

      <section className="crm-card crm-section">
        <h2>
          Leads per {per}
          <span className="crm-muted">{RANGE_LABELS[a.days]}</span>
        </h2>
        <ColumnChart data={chart} title={`Leads per ${per}`} />
      </section>

      <section className="crm-card crm-section">
        <h2>Lead sources</h2>
        {a.bySource.length ? (
          <div className="crm-table-scroll">
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Leads</th>
                  <th className="crm-num">Won</th>
                  <th className="crm-num">Win rate</th>
                  <th className="crm-num">Revenue won</th>
                </tr>
              </thead>
              <tbody>
                {a.bySource.map((r) => (
                  <tr key={r.source}>
                    <td>
                      <Link href={`/admin/leads?source=${r.source}`}>{sourceLabel(r.source)}</Link>
                    </td>
                    <td>
                      <CountBar value={r.leads} max={sourceMax} />
                    </td>
                    <td className="crm-num">{r.won}</td>
                    <td className="crm-num">{pct(r.won, r.leads)}</td>
                    <td className="crm-num">{r.revenue ? fmtMoney(r.revenue) : '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="crm-empty">No leads in this period.</p>
        )}
      </section>

      <div className="crm-grid">
        <section className="crm-card">
          <h2>Pages that brought leads</h2>
          {a.byPage.length ? (
            <table className="crm-table crm-table--compact">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Leads</th>
                </tr>
              </thead>
              <tbody>
                {a.byPage.map((r) => (
                  <tr key={r.page}>
                    <td className="crm-table__path">{r.page}</td>
                    <td>
                      <CountBar value={r.leads} max={pageMax} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="crm-empty">No page data in this period. Orders and manual leads don’t record a page.</p>
          )}
        </section>

        <section className="crm-card">
          <h2>What leads asked for</h2>
          {a.byInterest.length ? (
            <table className="crm-table crm-table--compact">
              <thead>
                <tr>
                  <th>Interested in</th>
                  <th>Leads</th>
                  <th className="crm-num">Won</th>
                </tr>
              </thead>
              <tbody>
                {a.byInterest.map((r) => (
                  <tr key={r.interest}>
                    <td>{r.interest}</td>
                    <td>
                      <CountBar value={r.leads} max={interestMax} />
                    </td>
                    <td className="crm-num">{r.won}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="crm-empty">No leads in this period.</p>
          )}
        </section>
      </div>

      <p className="crm-muted crm-footnote">
        Counts are leads that came in during the period, by their current stage. Visitor traffic is in Google
        Analytics.
      </p>
    </>
  );
}
