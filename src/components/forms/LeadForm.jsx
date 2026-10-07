'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getRecaptchaToken, loadRecaptcha } from '@/lib/recaptcha-client';
import MagneticButton from '@/components/ui/MagneticButton';

const fields = (phoneRequired) => [
  [
    { name: 'name', type: 'text', placeholder: 'Name *', required: true, autoComplete: 'name' },
    { name: 'email', type: 'email', placeholder: 'Email *', required: true, autoComplete: 'email' },
  ],
  [
    { name: 'phone', type: 'tel', placeholder: phoneRequired ? 'Phone *' : 'Phone', required: true, autoComplete: 'tel' },
    { name: 'subject', type: 'text', placeholder: 'Subject *', required: true },
  ],
];

/**
 * Submit handler shared by the enquiry forms: posts the form to /api/lead (with reCAPTCHA), then fires the
 * Meta Lead and GA4 generate_lead events tagged with `variant`, so each form's conversions can be compared.
 */
export function useLeadSubmit(variant, onSuccess) {
  const pathname = usePathname();
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: 'sending', message: '' });
    try {
      const recaptchaToken = await getRecaptchaToken('submit');
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, consent: Boolean(data.consent), form: variant, pageUrl: window.location.href, recaptchaToken }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      form.reset();
      setStatus({ state: 'sent', message: 'Thank you! Your message has been sent. We’ll get back to you shortly.' });
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form: variant, page: pathname });
      onSuccess?.();
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  }

  return { status, handleSubmit };
}

/**
 * Enquiry form used by the quote popup and the contact page. Posts JSON to /api/lead
 * (replaces assets/include/bannerFormController.php).
 */
export default function LeadForm({ variant = 'popup', header = null, onSuccess }) {
  const { status, handleSubmit } = useLeadSubmit(variant, onSuccess);
  const isContact = variant === 'contact';

  return (
    <form onSubmit={handleSubmit} onFocus={() => loadRecaptcha()}>
      {header}
      {fields(!isContact).map((row, i) => (
        <div className="row g-3" key={i}>
          {row.map((f) => (
            <div className="col-xxl-6 col-xl-6 col-12" key={f.name}>
              <input {...f} />
            </div>
          ))}
        </div>
      ))}
      <div className="row g-3">
        <div className="col-12">
          <textarea name="message" placeholder="Messages *" required />
        </div>
      </div>
      {isContact && (
        <div className="row g-3">
          <div className="col-12">
            <label>
              <input className="check_policy" name="consent" required type="checkbox" /> By providing a telephone number
              and submitting this form, you are consenting to be contacted by SMS text message. Message &amp; data rates
              may apply. You can reply STOP to opt-out of further messaging.
            </label>
          </div>
        </div>
      )}
      <div className="row g-3">
        <div className="col-12">
          <MagneticButton action="submit" reveal={isContact} disabled={status.state === 'sending'}>
            {status.state === 'sending' ? (
              <>
                Sending
                <br />
                ...
              </>
            ) : (
              <>
                Send <br />
                Messages <i className="fa-solid fa-arrow-right" />
              </>
            )}
          </MagneticButton>
        </div>
      </div>
      {status.message && (
        <p className={`form-status form-status--${status.state}`} role="status" aria-live="polite">
          {status.message}
        </p>
      )}
    </form>
  );
}
