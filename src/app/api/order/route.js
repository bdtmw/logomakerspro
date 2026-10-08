import { NextResponse } from 'next/server';
import { findPackage } from '@/data/packages';
import { leadOffer } from '@/data/site';
import { leadUrl, recordSubmission } from '@/lib/server/crm';
import { sendSubmission } from '@/lib/server/mailer';
import { discounted, isOfferCode } from '@/lib/server/offer';
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

  const discountCode = clean(data.discountCode, 50).toUpperCase();
  if (discountCode && !(leadOffer.enabled && isOfferCode(discountCode))) {
    return NextResponse.json({ ok: false, error: 'That discount code is not valid.' }, { status: 422 });
  }
  const discount = discountCode ? `${leadOffer.percent}% off (${discountCode})` : '';
  const hasPrice = typeof pkg.price === 'number';

  const ip = clientIp(request);
  const captcha = await verifyRecaptcha(data.recaptchaToken, ip);
  if (!captcha.ok) {
    return NextResponse.json({ ok: false, error: 'Spam check failed. Please try again.' }, { status: 400 });
  }

  const packageName = pkg.orderName || pkg.title.join(' ');
  const finalPrice = hasPrice ? (discount ? discounted(pkg.price) : pkg.price) : null;
  const fields = {
    Package: packageName,
    Price: pkg.priceLabel + (pkg.period ? ` ${pkg.period}` : ''),
    Discount: discount || undefined,
    'Price after discount':
      discount && hasPrice ? `$${discounted(pkg.price).toFixed(2)}${pkg.period ? ' for the first month' : ''}` : undefined,
    Category: pkg.category,
    'First name': firstName,
    'Last name': lastName,
    Email: email,
    Phone: phone,
    Company: clean(data.company, 200),
    Country: clean(data.country, 100),
    Notes: clean(data.notes),
    IP: ip,
  };
  const saved = await recordSubmission({
    source: 'order',
    name: [firstName, lastName].filter(Boolean).join(' '),
    email,
    phone,
    company: fields.Company,
    interest: packageName,
    value: finalPrice,
    message: fields.Notes,
    summary: `Ordered ${packageName} (${pkg.priceLabel})${discount ? `, ${discount}` : ''}`,
    fields,
  });

  try {
    await sendSubmission({
      subject: `New order: ${packageName} (${pkg.priceLabel})${discount ? `, ${discount}` : ''}`,
      replyTo: email,
      fields: { ...fields, CRM: leadUrl(saved) },
    });
  } catch (err) {
    console.error('order mail failed', err);
    if (!saved) return NextResponse.json({ ok: false, error: 'We could not submit your order. Please call us.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, discount });
}
