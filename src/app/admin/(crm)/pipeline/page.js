import Link from 'next/link';
import { moveLead } from '@/app/admin/actions';
import { STATUSES, sourceLabel } from '@/lib/crm-constants';
import { fmtDay, fmtMoney, isDue } from '@/lib/crm-format';
import { pipeline } from '@/lib/server/crm';
import { requireAdmin } from '@/lib/server/admin-auth';

export const metadata = { title: 'Pipeline' };

function MoveButton({ id, to, label, icon }) {
  return (
    <form action={moveLead}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={to} />
      <button type="submit" className="crm-move" title={`Move to ${label}`} aria-label={`Move to ${label}`}>
        <i className={icon} aria-hidden="true" />
      </button>
    </form>
  );
}

export default async function PipelinePage() {
  await requireAdmin();
  const columns = await pipeline();
  return (
    <>
      <header className="crm-head">
        <h1>Pipeline</h1>
        <p className="crm-muted">Open leads by stage. Won and lost show the last 30 days.</p>
      </header>
      <div className="crm-board">
        {columns.map((col, i) => {
          const total = col.leads.reduce((n, l) => n + (l.value ? Number(l.value) : 0), 0);
          const prev = STATUSES[i - 1];
          const next = STATUSES[i + 1];
          return (
            <section key={col.id} className="crm-board__col" aria-label={col.label}>
              <h2>
                <span className={col.badge}>{col.label}</span>
                <span className="crm-board__sum">
                  {col.leads.length}
                  {total ? ` · ${fmtMoney(total)}` : ''}
                </span>
              </h2>
              {col.leads.map((l) => (
                <article key={l.id} className="crm-board__card">
                  <Link href={`/admin/leads/${l.id}`}>
                    <strong>{l.name || l.email || 'No name'}</strong>
                    <span>{l.interest || sourceLabel(l.source)}</span>
                  </Link>
                  <div className="crm-board__foot">
                    <span>
                      {fmtMoney(l.value)}
                      {l.follow_up && <span className={isDue(l.follow_up) ? 'crm-due' : 'crm-muted'}> {fmtDay(l.follow_up)}</span>}
                    </span>
                    <span className="crm-board__moves">
                      {prev && <MoveButton id={l.id} to={prev.id} label={prev.label} icon="fa-solid fa-chevron-left" />}
                      {next && <MoveButton id={l.id} to={next.id} label={next.label} icon="fa-solid fa-chevron-right" />}
                    </span>
                  </div>
                </article>
              ))}
              {!col.leads.length && <p className="crm-empty">None</p>}
            </section>
          );
        })}
      </div>
    </>
  );
}
