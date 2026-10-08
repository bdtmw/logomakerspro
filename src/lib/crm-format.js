// Display helpers for the CRM pages. Times show in CRM_TIMEZONE (default America/New_York).

const TZ = process.env.CRM_TIMEZONE || 'America/New_York';

export const fmtMoney = (v) =>
  v === null || v === undefined || v === ''
    ? ''
    : Number(v).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: Number(v) % 1 ? 2 : 0 });

export const fmtDateTime = (d) =>
  d ? new Date(d).toLocaleString('en-US', { timeZone: TZ, month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '';

/** A DATE column (no time): shown as is, without shifting by time zone. */
export const fmtDay = (d) =>
  d ? new Date(d).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' }) : '';

export const isoDay = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '');

export function fmtAgo(d) {
  if (!d) return '';
  const s = Math.max(0, (Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)}d ago`;
  return fmtDateTime(d).replace(/,? \d+:\d+.*$/, '');
}

/** True when a follow-up date (DATE column) is today or earlier. */
export const isDue = (d) => Boolean(d) && isoDay(d) <= new Date().toISOString().slice(0, 10);
