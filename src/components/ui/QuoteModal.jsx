'use client';

import { useEffect } from 'react';
import LeadForm from '@/components/forms/LeadForm';
import { useUI } from './UIContext';

// "Let’s Get Started with Your Project!" popup opened by every "Get a Quote" / package quote button.
export default function QuoteModal() {
  const { quoteOpen, closeQuote } = useUI();

  useEffect(() => {
    if (!quoteOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeQuote();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [quoteOpen, closeQuote]);

  return (
    <section className="pop-up-section">
      <div
        className="modal"
        style={{ display: quoteOpen ? 'block' : 'none' }}
        role="dialog"
        aria-modal="true"
        aria-label="Get a quote"
        onClick={(e) => e.target === e.currentTarget && closeQuote()}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="pop-up-form">
              <div className="form-right-wrapper">
                <div className="form-logo-wrapper">
                  <button className="close" type="button" aria-label="Close" onClick={closeQuote}>
                    ×
                  </button>
                </div>
                <LeadForm
                  variant="popup"
                  header={
                    <div className="quote-form-header">
                      <p>
                        Let’s Get Started with
                        <br />
                        <span> Your Project!</span>
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
