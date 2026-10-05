import 'server-only';
import nodemailer from 'nodemailer';

let transporter;

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

/** Email a submission as a key/value table. Logs instead of sending when SMTP isn't configured. */
export async function sendSubmission({ subject, fields, replyTo }) {
  const entries = Object.entries(fields).filter(([, v]) => v !== undefined && v !== null && v !== '');
  const html = `<table>${entries
    .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table>`;
  const text = entries.map(([k, v]) => `${k}: ${v}`).join('\n');
  const t = getTransporter();
  if (!t) {
    console.info(`[mail disabled: set SMTP_HOST] ${subject}\n${text}`);
    return { sent: false };
  }
  await t.sendMail({
    from: process.env.MAIL_FROM || 'no-reply@logomakerspro.com',
    to: process.env.MAIL_TO || 'support@logomakerspro.com',
    replyTo,
    subject,
    text,
    html,
  });
  return { sent: true };
}
