import 'server-only';
import { leadOffer } from '@/data/site';

/** The discount code revealed by the popup and accepted at checkout. */
export const offerCode = () => (process.env.OFFER_CODE || 'GOOGLE').trim().toUpperCase();

export const isOfferCode = (v) => typeof v === 'string' && v.trim().toUpperCase() === offerCode();

/** Price after the popup discount, rounded to cents. */
export const discounted = (price) => Math.round(price * (100 - leadOffer.percent)) / 100;
