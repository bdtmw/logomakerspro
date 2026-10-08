import 'server-only';
import { site } from '@/data/site';
import { OPEN_STATUSES, STATUSES } from '@/lib/crm-constants';
import { db, dbConfigured } from './db';

// CRM storage. Website forms call recordSubmission(); the /admin pages use the rest.

const STATUS_IDS = STATUSES.map((s) => s.id);
const PAGE_SIZE = 50;

const str = (v, max = 5000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const money = (v) => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(String(v).replace(/[$,\s]/g, ''));
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : null;
};
const date = (v) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null);

/**
 * Save a website submission. A new submission from an email that already has an open lead is added to that lead
 * (blank contact fields are filled in, the activity is logged) instead of creating a duplicate.
 * Returns { id, isNew }, or null when no database is configured or saving failed (the email still goes out).
 */
export async function recordSubmission({ source, name, email, phone, company, interest, value, message, pageUrl, summary, fields }) {
  if (!dbConfigured()) return null;
  try {
    const sql = await db();
    const lead = {
      name: str(name, 200),
      email: str(email, 200).toLowerCase(),
      phone: str(phone, 50),
      company: str(company, 200),
      interest: str(interest, 300),
      value: money(value),
      message: str(message),
      page_url: str(pageUrl, 500),
    };
    // Stored as [label, value] pairs: jsonb doesn't keep object key order, and the email's field order reads best.
    const entries = Object.entries(fields || {})
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => [k, String(v)]);
    return await sql.begin(async (tx) => {
      const [open] = lead.email
        ? await tx`
            SELECT id FROM crm_leads
            WHERE lower(email) = ${lead.email} AND status = ANY(${OPEN_STATUSES})
            ORDER BY updated_at DESC LIMIT 1 FOR UPDATE`
        : [];
      // A discount signup says little about what they want, so it never replaces a more specific interest.
      const strongInterest = source === 'discount' ? '' : lead.interest;
      let id;
      if (open) {
        id = open.id;
        await tx`
          UPDATE crm_leads SET
            updated_at = now(),
            submissions = submissions + 1,
            name = CASE WHEN name = '' THEN ${lead.name} ELSE name END,
            phone = CASE WHEN phone = '' THEN ${lead.phone} ELSE phone END,
            company = CASE WHEN company = '' THEN ${lead.company} ELSE company END,
            interest = CASE WHEN ${strongInterest} <> '' THEN ${strongInterest} WHEN interest = '' THEN ${lead.interest} ELSE interest END,
            value = COALESCE(${lead.value}, value),
            message = CASE WHEN message = '' THEN ${lead.message} ELSE message END
          WHERE id = ${id}`;
      } else {
        [{ id }] = await tx`
          INSERT INTO crm_leads ${tx({ ...lead, source, submissions: 1 })}
          RETURNING id`;
      }
      await tx`
        INSERT INTO crm_activities (lead_id, kind, body, data)
        VALUES (${id}, 'submission', ${summary || ''}, ${tx.json({ source, fields: entries })})`;
      return { id: String(id), isNew: !open };
    });
  } catch (err) {
    console.error('crm: could not save submission', err);
    return null;
  }
}

/** Link to a saved lead, for the notification email. */
export const leadUrl = (saved) => (saved ? `${site.url}/admin/leads/${saved.id}` : undefined);

/** Lead list with optional status, source and text filters. */
export async function listLeads({ status = '', source = '', q = '', page = 1 } = {}) {
  const sql = await db();
  const term = str(q, 100);
  const like = `%${term.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
  const where = sql`
    WHERE TRUE
    ${STATUS_IDS.includes(status) ? sql`AND status = ${status}` : status === 'open' ? sql`AND status = ANY(${OPEN_STATUSES})` : sql``}
    ${source ? sql`AND source = ${source}` : sql``}
    ${term ? sql`AND (name ILIKE ${like} OR email ILIKE ${like} OR phone ILIKE ${like} OR company ILIKE ${like} OR interest ILIKE ${like})` : sql``}`;
  const offset = (Math.max(1, Number(page) || 1) - 1) * PAGE_SIZE;
  const [rows, [{ count }]] = await Promise.all([
    sql`SELECT * FROM crm_leads ${where} ORDER BY updated_at DESC LIMIT ${PAGE_SIZE} OFFSET ${offset}`,
    sql`SELECT count(*)::int AS count FROM crm_leads ${where}`,
  ]);
  return { rows, count, pageSize: PAGE_SIZE };
}

export async function getLead(id) {
  if (!/^\d+$/.test(String(id))) return null;
  const sql = await db();
  const [lead] = await sql`SELECT * FROM crm_leads WHERE id = ${id}`;
  if (!lead) return null;
  const activities = await sql`SELECT * FROM crm_activities WHERE lead_id = ${id} ORDER BY created_at DESC, id DESC`;
  return { lead, activities };
}

/** Edit a lead from the admin. Status changes are logged on the timeline. */
export async function updateLead(id, input) {
  const sql = await db();
  const fields = {
    name: str(input.name, 200),
    email: str(input.email, 200).toLowerCase(),
    phone: str(input.phone, 50),
    company: str(input.company, 200),
    interest: str(input.interest, 300),
    value: money(input.value),
    follow_up: date(input.follow_up),
    status: STATUS_IDS.includes(input.status) ? input.status : 'new',
  };
  await sql.begin(async (tx) => {
    const [before] = await tx`SELECT status FROM crm_leads WHERE id = ${id} FOR UPDATE`;
    if (!before) return;
    await tx`UPDATE crm_leads SET ${tx(fields)}, updated_at = now() WHERE id = ${id}`;
    if (before.status !== fields.status) {
      await tx`INSERT INTO crm_activities (lead_id, kind, body) VALUES (${id}, 'status', ${`${before.status} → ${fields.status}`})`;
    }
  });
}

export async function setStatus(id, status) {
  if (!STATUS_IDS.includes(status)) return;
  const sql = await db();
  await sql.begin(async (tx) => {
    const [before] = await tx`SELECT status FROM crm_leads WHERE id = ${id} FOR UPDATE`;
    if (!before || before.status === status) return;
    await tx`UPDATE crm_leads SET status = ${status}, updated_at = now() WHERE id = ${id}`;
    await tx`INSERT INTO crm_activities (lead_id, kind, body) VALUES (${id}, 'status', ${`${before.status} → ${status}`})`;
  });
}

export async function addNote(id, body) {
  const text = str(body, 5000);
  if (!text) return;
  const sql = await db();
  await sql`INSERT INTO crm_activities (lead_id, kind, body) VALUES (${id}, 'note', ${text})`;
  await sql`UPDATE crm_leads SET updated_at = now() WHERE id = ${id}`;
}

export async function createLead(input) {
  const sql = await db();
  const [{ id }] = await sql`
    INSERT INTO crm_leads ${sql({
      name: str(input.name, 200),
      email: str(input.email, 200).toLowerCase(),
      phone: str(input.phone, 50),
      company: str(input.company, 200),
      interest: str(input.interest, 300),
      value: money(input.value),
      follow_up: date(input.follow_up),
      message: str(input.message),
      status: STATUS_IDS.includes(input.status) ? input.status : 'new',
      source: 'manual',
    })}
    RETURNING id`;
  return String(id);
}

export async function deleteLead(id) {
  const sql = await db();
  await sql`DELETE FROM crm_leads WHERE id = ${id}`;
}

/** Numbers for the dashboard. */
export async function dashboard() {
  const sql = await db();
  const [byStatus, bySource, [totals], due, recent] = await Promise.all([
    sql`SELECT status, count(*)::int AS count, coalesce(sum(value), 0)::float AS value FROM crm_leads GROUP BY status`,
    sql`SELECT source, count(*)::int AS count FROM crm_leads WHERE created_at > now() - interval '30 days' GROUP BY source ORDER BY count DESC`,
    sql`
      SELECT
        count(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS week,
        count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS month,
        count(*) FILTER (WHERE status = 'won' AND updated_at > now() - interval '30 days')::int AS won_month,
        coalesce(sum(value) FILTER (WHERE status = 'won' AND updated_at > now() - interval '30 days'), 0)::float AS won_value_month
      FROM crm_leads`,
    sql`
      SELECT * FROM crm_leads
      WHERE follow_up IS NOT NULL AND follow_up <= current_date AND status = ANY(${OPEN_STATUSES})
      ORDER BY follow_up LIMIT 20`,
    sql`SELECT * FROM crm_leads WHERE status = 'new' ORDER BY created_at DESC LIMIT 8`,
  ]);
  return { byStatus, bySource, totals, due, recent };
}

/** Open leads grouped by stage, for the pipeline board. */
export async function pipeline() {
  const sql = await db();
  const rows = await sql`
    SELECT * FROM crm_leads
    WHERE status = ANY(${OPEN_STATUSES}) OR (status IN ('won', 'lost') AND updated_at > now() - interval '30 days')
    ORDER BY updated_at DESC LIMIT 500`;
  return STATUSES.map((s) => ({ ...s, leads: rows.filter((r) => r.status === s.id) }));
}

export async function allLeadsForExport() {
  const sql = await db();
  return sql`SELECT * FROM crm_leads ORDER BY created_at DESC`;
}

const RANGES = { 7: 'day', 30: 'day', 90: 'week', 365: 'month' };
export const ANALYTICS_RANGES = Object.keys(RANGES).map(Number);

/**
 * Lead analytics for the last `days` days (7, 30, 90 or 365), counted by when each lead came in, plus the same
 * numbers for the period before it so the page can show the change.
 */
export async function analytics(days) {
  const span = ANALYTICS_RANGES.includes(days) ? days : 30;
  const bucket = RANGES[span];
  const tz = process.env.CRM_TIMEZONE || 'America/New_York';
  const sql = await db();
  const since = sql`now() - make_interval(days => ${span})`;
  const prevSince = sql`now() - make_interval(days => ${span * 2})`;
  // Bucket names can't be parameters; `bucket` only ever comes from the RANGES table above.
  const unit = sql.unsafe(`'${bucket}'`);
  const step = sql.unsafe(`interval '1 ${bucket}'`);

  const [[totals], [previous], series, bySource, byPage, byInterest, [speed]] = await Promise.all([
    sql`
      SELECT
        count(*)::int AS leads,
        count(*) FILTER (WHERE status = 'won')::int AS won,
        count(*) FILTER (WHERE status = 'lost')::int AS lost,
        count(*) FILTER (WHERE status = 'won' AND value IS NOT NULL)::int AS won_valued,
        coalesce(sum(value) FILTER (WHERE status = 'won'), 0)::float AS revenue
      FROM crm_leads WHERE created_at > ${since}`,
    sql`
      SELECT
        count(*)::int AS leads,
        count(*) FILTER (WHERE status = 'won')::int AS won,
        coalesce(sum(value) FILTER (WHERE status = 'won'), 0)::float AS revenue
      FROM crm_leads WHERE created_at > ${prevSince} AND created_at <= ${since}`,
    sql`
      SELECT to_char(g, 'YYYY-MM-DD') AS day, count(l.id)::int AS leads, count(l.id) FILTER (WHERE l.status = 'won')::int AS won
      FROM generate_series(
        date_trunc(${unit}, (${since}) AT TIME ZONE ${tz}),
        date_trunc(${unit}, now() AT TIME ZONE ${tz}),
        ${step}
      ) AS g
      LEFT JOIN crm_leads l
        ON l.created_at > ${since} AND date_trunc(${unit}, l.created_at AT TIME ZONE ${tz}) = g
      GROUP BY g ORDER BY g`,
    sql`
      SELECT source, count(*)::int AS leads,
        count(*) FILTER (WHERE status = 'won')::int AS won,
        coalesce(sum(value) FILTER (WHERE status = 'won'), 0)::float AS revenue
      FROM crm_leads WHERE created_at > ${since}
      GROUP BY source ORDER BY leads DESC, source`,
    sql`
      SELECT coalesce(nullif(substring(page_url FROM '^https?://[^/]+(/[^?#]*)'), ''), '/') AS page, count(*)::int AS leads
      FROM crm_leads WHERE created_at > ${since} AND page_url <> ''
      GROUP BY page ORDER BY leads DESC, page LIMIT 8`,
    sql`
      SELECT interest, count(*)::int AS leads, count(*) FILTER (WHERE status = 'won')::int AS won
      FROM crm_leads WHERE created_at > ${since} AND interest <> ''
      GROUP BY interest ORDER BY leads DESC, interest LIMIT 8`,
    // Time from a lead arriving to its first stage change (the first time someone moved it on from New).
    sql`
      SELECT count(*)::int AS contacted,
        percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch FROM first_move - created_at)) AS median_seconds
      FROM (
        SELECT l.created_at, min(a.created_at) AS first_move
        FROM crm_leads l JOIN crm_activities a ON a.lead_id = l.id AND a.kind = 'status'
        WHERE l.created_at > ${since}
        GROUP BY l.id, l.created_at
      ) t`,
  ]);

  return { days: span, bucket, totals, previous, series, bySource, byPage, byInterest, speed };
}
