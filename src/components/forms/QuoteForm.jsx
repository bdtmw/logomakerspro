'use client';

import { loadRecaptcha } from '@/lib/recaptcha-client';
import { useLeadSubmit } from './LeadForm';

/**
 * Short quote form for service pages (hero and closing section): name, email, optional phone and project
 * details. The subject is filled in from the service, so visitors type as little as possible.
 */
export default function QuoteForm({ variant, subject, submitLabel = 'Get my free quote', idPrefix }) {
  const { status, handleSubmit } = useLeadSubmit(variant);
  const id = (name) => `${idPrefix}-${name}`;

  return (
    <form className="lmp-quote-form" onSubmit={handleSubmit} onFocus={() => loadRecaptcha()}>
      <input type="hidden" name="subject" value={subject} />
      <div className="lmp-quote-form__row">
        <label htmlFor={id('name')}>
          Name *
          <input id={id('name')} name="name" type="text" required autoComplete="name" />
        </label>
        <label htmlFor={id('email')}>
          Email *
          <input id={id('email')} name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label htmlFor={id('phone')}>
        Phone <span>(optional)</span>
        <input id={id('phone')} name="phone" type="tel" autoComplete="tel" />
      </label>
      <label htmlFor={id('message')}>
        Tell us about your project *
        <textarea id={id('message')} name="message" rows={3} required />
      </label>
      <button className="lmp-quote-form__submit" type="submit" disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Sending…' : submitLabel}
      </button>
      {status.message && (
        <p className={`form-status form-status--${status.state}`} role="status" aria-live="polite">
          {status.message}
        </p>
      )}
    </form>
  );
}
