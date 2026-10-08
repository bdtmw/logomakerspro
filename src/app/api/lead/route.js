import { NextResponse } from 'next/server';
import { leadUrl, recordSubmission } from '@/lib/server/crm';
import { sendSubmission } from '@/lib/server/mailer';
import { verifyRecaptcha } from '@/lib/server/recaptcha';
import { clean, clientIp, isEmail } from '@/lib/server/request';

// Replaces assets/include/bannerFormController.php (popup, contact and banner forms).
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const name = clean(data.name, 200);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 50);
  const subject = clean(data.subject, 300);
  const message = clean(data.message);

  if (!name || !isEmail(email) || !subject || !message) {
    return NextResponse.json({ ok: false, error: 'Please fill in all required fields.' }, { status: 422 });
  }

  const ip = clientIp(request);
  const captcha = await verifyRecaptcha(data.recaptchaToken, ip);
  if (!captcha.ok) {
    return NextResponse.json({ ok: false, error: 'Spam check failed. Please try again.' }, { status: 400 });
  }

  const form = clean(data.form, 50);
  const pageUrl = clean(data.pageUrl, 500);
  const fields = {
    Name: name,
    Email: email,
    Phone: phone,
    Subject: subject,
    Message: message,
    'SMS consent': data.consent ? 'Yes' : undefined,
    Form: form,
    Page: pageUrl,
    IP: ip,
    'reCAPTCHA score': captcha.score,
  };
  const saved = await recordSubmission({
    source: form === 'contact' ? 'contact' : 'quote',
    name,
    email,
    phone,
    interest: subject,
    message,
    pageUrl,
    summary: subject,
    fields,
  });

  try {
    await sendSubmission({ subject: `New enquiry: ${subject}`, replyTo: email, fields: { ...fields, CRM: leadUrl(saved) } });
  } catch (err) {
    console.error('lead mail failed', err);
    // Saved in the CRM, so the enquiry isn't lost.
    if (!saved) {
      return NextResponse.json({ ok: false, error: 'We could not send your message. Please call or email us.' }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
