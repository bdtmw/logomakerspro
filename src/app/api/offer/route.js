import { NextResponse } from 'next/server';
import { leadOffer, site } from '@/data/site';
import { escapeHtml, sendEmail, sendSubmission } from '@/lib/server/mailer';
import { offerCode } from '@/lib/server/offer';
import { verifyRecaptcha } from '@/lib/server/recaptcha';
import { clean, clientIp, isEmail } from '@/lib/server/request';

// Discount popup signup: notifies the team, emails the code to the visitor and returns it to show on screen.
export async function POST(request) {
  if (!leadOffer.enabled) return NextResponse.json({ ok: false, error: 'This offer has ended.' }, { status: 410 });

  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const name = clean(data.name, 200);
  const email = clean(data.email, 200);
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 422 });
  }

  const ip = clientIp(request);
  const captcha = await verifyRecaptcha(data.recaptchaToken, ip);
  if (!captcha.ok) {
    return NextResponse.json({ ok: false, error: 'Spam check failed. Please try again.' }, { status: 400 });
  }

  const code = offerCode();
  const { percent } = leadOffer;

  try {
    await sendSubmission({
      subject: `New discount signup: ${email}`,
      replyTo: email,
      fields: {
        Name: name,
        Email: email,
        Offer: `${percent}% off (${code})`,
        Page: clean(data.pageUrl, 500),
        IP: ip,
        'reCAPTCHA score': captcha.score,
      },
    });
  } catch (err) {
    console.error('offer signup mail failed', err);
    return NextResponse.json({ ok: false, error: 'We could not sign you up. Please try again.' }, { status: 500 });
  }

  // The code is shown on screen too, so a failed welcome email shouldn't fail the signup.
  const greeting = name ? `Hi ${name},` : 'Hi,';
  const packagesUrl = `${site.url}/packages`;
  try {
    await sendEmail({
      to: email,
      replyTo: site.email,
      subject: `Your ${percent}% off code from ${site.name}`,
      text: `${greeting}\n\nThanks for signing up. Here is your code for ${percent}% off your first package:\n\n${code}\n\nEnter it at checkout: ${packagesUrl}\n\nQuestions? Call ${site.phone} or reply to this email.\n\n${site.name}`,
      html: `<p>${escapeHtml(greeting)}</p><p>Thanks for signing up. Here is your code for ${percent}% off your first package:</p><p style="font-size:24px;font-weight:700;letter-spacing:2px">${escapeHtml(code)}</p><p>Enter it at checkout when you <a href="${packagesUrl}">choose a package</a>.</p><p>Questions? Call ${escapeHtml(site.phone)} or reply to this email.</p><p>${escapeHtml(site.name)}</p>`,
    });
  } catch (err) {
    console.error('offer welcome mail failed', err);
  }

  return NextResponse.json({ ok: true, code, percent });
}
