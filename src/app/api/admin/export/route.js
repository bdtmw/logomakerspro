import { NextResponse } from 'next/server';
import { sourceLabel, statusOf } from '@/lib/crm-constants';
import { isoDay } from '@/lib/crm-format';
import { isAdmin } from '@/lib/server/admin-auth';
import { allLeadsForExport } from '@/lib/server/crm';
import { dbConfigured } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

// CSV of every lead, for spreadsheets or moving to another CRM.
const COLUMNS = [
  ['ID', (l) => l.id],
  ['Created', (l) => new Date(l.created_at).toISOString()],
  ['Updated', (l) => new Date(l.updated_at).toISOString()],
  ['Name', (l) => l.name],
  ['Email', (l) => l.email],
  ['Phone', (l) => l.phone],
  ['Company', (l) => l.company],
  ['Interested in', (l) => l.interest],
  ['Source', (l) => sourceLabel(l.source)],
  ['Stage', (l) => statusOf(l.status).label],
  ['Value (USD)', (l) => l.value ?? ''],
  ['Follow up', (l) => isoDay(l.follow_up)],
  ['Submissions', (l) => l.submissions],
  ['Page', (l) => l.page_url],
  ['Message', (l) => l.message],
];

const cell = (v) => {
  let s = String(v ?? '');
  // Stop spreadsheet apps from running a cell as a formula.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  if (!dbConfigured()) return NextResponse.json({ error: 'No database configured.' }, { status: 503 });
  const leads = await allLeadsForExport();
  const csv = [COLUMNS.map(([h]) => h), ...leads.map((l) => COLUMNS.map(([, f]) => f(l)))].map((r) => r.map(cell).join(',')).join('\r\n');
  const day = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${csv}`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="logomakerspro-leads-${day}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
