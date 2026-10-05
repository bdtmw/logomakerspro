'use client';

import { useState } from 'react';
import { getRecaptchaToken, loadRecaptcha } from '@/lib/recaptcha-client';

/** Customer details for an order request. Package/price are resolved on the server from packageId. */
export default function CheckoutForm({ packageId, packageName, price }) {
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: 'sending', message: '' });
    try {
      const recaptchaToken = await getRecaptchaToken('order');
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, packageId, recaptchaToken }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      form.reset();
      setStatus({ state: 'sent', message: 'Thank you! Your order request has been received. Our team will contact you shortly to confirm the details and payment.' });
      if (typeof window.fbq === 'function') window.fbq('track', 'InitiateCheckout', { content_name: packageName, value: price, currency: 'USD' });
      if (typeof window.gtag === 'function') window.gtag('event', 'begin_checkout', { value: price, currency: 'USD', items: [{ item_name: packageName, price }] });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => loadRecaptcha()}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input id="firstName" name="firstName" required autoComplete="given-name" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" autoComplete="family-name" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company">Business Name</label>
          <input id="company" name="company" autoComplete="organization" />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input id="country" name="country" autoComplete="country-name" defaultValue="United States" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="notes">Project Details</label>
        <textarea id="notes" name="notes" rows={4} />
      </div>
      <button className="btn-checkout" type="submit" disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Submitting…' : 'Place Order'}
      </button>
      {status.message && (
        <p className={`form-status form-status--${status.state}`} role="status" aria-live="polite">
          {status.message}
        </p>
      )}
    </form>
  );
}
