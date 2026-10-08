import Link from 'next/link';
import { notFound } from 'next/navigation';
import ConfirmButton from '@/components/admin/ConfirmButton';
import LeadFields from '@/components/admin/LeadFields';
import StatusBadge from '@/components/admin/StatusBadge';
import { removeLead, saveLead, saveNote } from '@/app/admin/actions';
import { sourceLabel, statusOf } from '@/lib/crm-constants';
import { fmtAgo, fmtDateTime, fmtMoney } from '@/lib/crm-format';
import { getLead } from '@/lib/server/crm';
import { requireAdmin } from '@/lib/server/admin-auth';

export const metadata = { title: 'Lead' };

// Fields already shown elsewhere on the page, or not useful to read.
const HIDDEN = new Set(['Transcript', 'reCAPTCHA score']);

function Activity({ a }) {
  if (a.kind === 'note') {
    return (
      <>
        <p className="crm-timeline__title">
          <i className="fa-solid fa-note-sticky" aria-hidden="true" /> Note
        </p>
        <p className="crm-timeline__text">{a.body}</p>
      </>
    );
  }
  if (a.kind === 'status') {
    const [from, to] = a.body.split(' → ');
    return (
      <p className="crm-timeline__title">
        <i className="fa-solid fa-arrow-right-arrow-left" aria-hidden="true" /> Stage changed from {statusOf(from).label} to{' '}
        {statusOf(to).label}
      </p>
    );
  }
  const data = a.data || {};
  const all = Array.isArray(data.fields) ? data.fields : [];
  const transcript = all.find(([k]) => k === 'Transcript')?.[1];
  const entries = all.filter(([k]) => !HIDDEN.has(k));
  return (
    <>
      <p className="crm-timeline__title">
        <i className="fa-solid fa-inbox" aria-hidden="true" /> {sourceLabel(data.source)}
        {a.body ? `: ${a.body}` : ''}
      </p>
      {entries.length > 0 && (
        <dl className="crm-dl">
          {entries.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{k === 'Page' && /^https?:\/\//.test(String(v)) ? <a href={String(v)} target="_blank" rel="noopener noreferrer">{String(v)}</a> : String(v)}</dd>
            </div>
          ))}
        </dl>
      )}
      {transcript && (
        <details className="crm-transcript">
          <summary>Chat transcript</summary>
          <pre>{transcript}</pre>
        </details>
      )}
    </>
  );
}

export default async function LeadPage({ params, searchParams }) {
  await requireAdmin();
  const { id } = await params;
  const { saved } = await searchParams;
  const found = await getLead(id);
  if (!found) notFound();
  const { lead, activities } = found;

  return (
    <>
      <p className="crm-back">
        <Link href="/admin/leads">← All leads</Link>
      </p>
      <header className="crm-head">
        <div>
          <h1>{lead.name || lead.email || 'No name'}</h1>
          <p className="crm-muted">
            <StatusBadge status={lead.status} /> {sourceLabel(lead.source)} · added {fmtAgo(lead.created_at)}
            {lead.submissions > 1 ? ` · ${lead.submissions} submissions` : ''}
            {lead.value !== null ? ` · ${fmtMoney(lead.value)}` : ''}
          </p>
        </div>
        <div className="crm-head__actions">
          {lead.email && (
            <a className="crm-btn" href={`mailto:${lead.email}`}>
              <i className="fa-solid fa-envelope" aria-hidden="true" /> Email
            </a>
          )}
          {lead.phone && (
            <a className="crm-btn" href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}>
              <i className="fa-solid fa-phone" aria-hidden="true" /> Call
            </a>
          )}
        </div>
      </header>

      {saved && (
        <p className="crm-flash" role="status">
          Saved.
        </p>
      )}

      <div className="crm-detail">
        <div>
          <form action={saveLead} className="crm-card crm-form">
            <h2>Details</h2>
            <input type="hidden" name="id" value={lead.id} />
            <LeadFields lead={lead} />
            <div className="crm-actions">
              <button type="submit" className="crm-btn crm-btn--primary">
                Save changes
              </button>
            </div>
          </form>

          {lead.message && (
            <section className="crm-card">
              <h2>First message</h2>
              <p className="crm-timeline__text">{lead.message}</p>
            </section>
          )}

          <form action={removeLead} className="crm-danger">
            <input type="hidden" name="id" value={lead.id} />
            <ConfirmButton className="crm-btn crm-btn--danger" message="Delete this lead and its history? This can't be undone.">
              Delete lead
            </ConfirmButton>
          </form>
        </div>

        <section className="crm-card">
          <h2>Activity</h2>
          <form action={saveNote} className="crm-note">
            <input type="hidden" name="id" value={lead.id} />
            <label htmlFor="crm-note-body" className="visually-hidden">
              Add a note
            </label>
            <textarea id="crm-note-body" name="body" rows={3} required placeholder="Add a note: call summary, quote sent, next step…" />
            <button type="submit" className="crm-btn crm-btn--primary">
              Add note
            </button>
          </form>
          <ol className="crm-timeline">
            {activities.map((a) => (
              <li key={a.id}>
                <time dateTime={new Date(a.created_at).toISOString()}>{fmtDateTime(a.created_at)}</time>
                <Activity a={a} />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
