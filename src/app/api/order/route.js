import { NextResponse } from 'next/server';
import { findPackage } from '@/data/packages';
import { sendSubmission } from '@/lib/server/mailer';
import { verifyRecaptcha } from '@/lib/server/recaptcha';
import { clean, clientIp, isEmail } from '@/lib/server/request';

// Order request from /order/order-now. Package name and price always come from src/data/packages.js,
// never from the browser, so they can't be tampered with. Plug a payment gateway in here if needed.
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const pkg = findPackage(clean(data.packageId, 200));
  if (!pkg) return NextResponse.json({ ok: false, error: 'Invalid order request.' }, { status: 404 });

  const firstName = clean(data.firstName, 100);
  const lastName = clean(data.lastName, 100);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 50);
  if (!firstName || !isEmail(email) || !phone) {
    return NextResponse.json({ ok: false, error: 'Please fill in all required fields.' }, { status: 422 });
  }

  const ip = clientIp(request);
  const captcha = await verifyRecaptcha(data.recaptchaToken, ip);
  if (!captcha.ok) {
    return NextResponse.json({ ok: false, error: 'Spam check failed. Please try again.' }, { status: 400 });
  }

  try {
    await sendSubmission({
      subject: `New order: ${pkg.orderName || pkg.title.join(' ')} (${pkg.priceLabel})`,
      replyTo: email,
      fields: {
        Package: pkg.orderName || pkg.title.join(' '),
        Price: pkg.priceLabel + (pkg.period ? ` ${pkg.period}` : ''),
        Category: pkg.category,
        'First name': firstName,
        'Last name': lastName,
        Email: email,
        Phone: phone,
        Company: clean(data.company, 200),
        Country: clean(data.country, 100),
        Notes: clean(data.notes),
        IP: ip,
      },
    });
  } catch (err) {
    console.error('order mail failed', err);
    return NextResponse.json({ ok: false, error: 'We could not submit your order. Please call us.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
