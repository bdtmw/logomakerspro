import 'server-only';
import nodemailer from 'nodemailer';

let transporter;

// Lead notifications go to info@ unless MAIL_TO overrides it. Mail is sent from MAIL_FROM, else the SMTP login
// (most providers only accept a From address that matches the login), else info@.
const TEAM_INBOX = 'info@logomakerspro.com';
const fromAddress = () =>
  process.env.MAIL_FROM ||
  (/@/.test(process.env.SMTP_USER || '') ? `Logo Makers Pro <${process.env.SMTP_USER}>` : `Logo Makers Pro <${TEAM_INBOX}>`);

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE) === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
  }
  return transporter;
}

const escapeHtml = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Send one email. Logs instead of sending when SMTP isn't configured. */
export async function sendEmail({ to, subject, text, html, replyTo }) {
  const t = getTransporter();
  if (!t) {
    console.info(`[mail disabled: set SMTP_HOST] to ${to}: ${subject}\n${text}`);
    return { sent: false };
  }
  await t.sendMail({ from: fromAddress(), to, replyTo, subject, text, html });
  return { sent: true };
}

/** Email a submission to the team as a key/value table. */
export async function sendSubmission({ subject, fields, replyTo }) {
  const entries = Object.entries(fields).filter(([, v]) => v !== undefined && v !== null && v !== '');
  const html = `<table>${entries
    .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table>`;
  const text = entries.map(([k, v]) => `${k}: ${v}`).join('\n');
  return sendEmail({ to: process.env.MAIL_TO || TEAM_INBOX, subject, text, html, replyTo });
}

export { escapeHtml };
