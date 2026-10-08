import 'server-only';
import postgres from 'postgres';

// Postgres for the CRM. Vercel's Neon or Supabase integration sets DATABASE_URL (or POSTGRES_URL); any Postgres
// connection string works. The tables are created on first use, so there is no migration step.

const url = () => process.env.DATABASE_URL || process.env.POSTGRES_URL || '';

export const dbConfigured = () => Boolean(url());

let ready;

/** The shared client, with the schema in place. Throws if no database is configured. */
export async function db() {
  if (!dbConfigured()) throw new Error('DATABASE_URL is not set');
  // One small pool per server instance (kept on globalThis so dev hot reloads don't open new ones).
  const g = globalThis;
  if (!g.__lmpSql) {
    g.__lmpSql = postgres(url(), { max: 3, idle_timeout: 20, connect_timeout: 10, onnotice: () => {} });
  }
  const sql = g.__lmpSql;
  if (!ready) {
    ready = migrate(sql).catch((err) => {
      ready = undefined;
      throw err;
    });
  }
  await ready;
  return sql;
}

async function migrate(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS crm_leads (
      id            bigserial PRIMARY KEY,
      created_at    timestamptz NOT NULL DEFAULT now(),
      updated_at    timestamptz NOT NULL DEFAULT now(),
      name          text NOT NULL DEFAULT '',
      email         text NOT NULL DEFAULT '',
      phone         text NOT NULL DEFAULT '',
      company       text NOT NULL DEFAULT '',
      source        text NOT NULL DEFAULT 'manual',
      interest      text NOT NULL DEFAULT '',
      value         numeric(12, 2),
      status        text NOT NULL DEFAULT 'new',
      follow_up     date,
      message       text NOT NULL DEFAULT '',
      page_url      text NOT NULL DEFAULT '',
      submissions   integer NOT NULL DEFAULT 0
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS crm_activities (
      id          bigserial PRIMARY KEY,
      lead_id     bigint NOT NULL REFERENCES crm_leads(id) ON DELETE CASCADE,
      created_at  timestamptz NOT NULL DEFAULT now(),
      kind        text NOT NULL,
      body        text NOT NULL DEFAULT '',
      data        jsonb
    )`;
  await sql`CREATE INDEX IF NOT EXISTS crm_leads_email_idx ON crm_leads (lower(email))`;
  await sql`CREATE INDEX IF NOT EXISTS crm_leads_status_idx ON crm_leads (status, updated_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS crm_activities_lead_idx ON crm_activities (lead_id, created_at DESC)`;
}
