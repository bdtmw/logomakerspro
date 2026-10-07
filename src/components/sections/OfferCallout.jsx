'use client';

import { useEffect, useState } from 'react';
import { OFFER_CLAIMED_EVENT, OFFER_OPEN_EVENT, readOfferState } from '@/components/ui/OfferPopup';
import { leadOffer } from '@/data/site';
import { trackCta } from '@/lib/track';

/**
 * The discount offer inside the pricing section: a button that opens the offer popup, or, once the visitor has
 * claimed it, a reminder of their code. The code itself only ever comes from the signup response.
 */
export default function OfferCallout() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    const saved = readOfferState();
    if (saved?.state === 'claimed' && saved.code) setCode(saved.code);
    const onClaimed = (e) => setCode(e.detail?.code || null);
    window.addEventListener(OFFER_CLAIMED_EVENT, onClaimed);
    return () => window.removeEventListener(OFFER_CLAIMED_EVENT, onClaimed);
  }, []);

  if (!leadOffer.enabled) return null;

  return (
    <div className="lmp-offer-callout">
      <i className="fa-solid fa-tag" aria-hidden="true" />
      {code ? (
        <p>
          Your {leadOffer.percent}% off code <strong>{code}</strong> is ready. Enter it at checkout.
        </p>
      ) : (
        <>
          <p>
            <strong>New customer?</strong> Get {leadOffer.percent}% off your first package.
          </p>
          <button
            type="button"
            onClick={() => {
              trackCta('offer', 'pricing');
              window.dispatchEvent(new Event(OFFER_OPEN_EVENT));
            }}
          >
            Get my code
          </button>
        </>
      )}
    </div>
  );
}
