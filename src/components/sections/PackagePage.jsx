import { packageHighlights, packageIntros, packageService, serviceExtras, serviceHighlights, whyChooseUs } from '@/data/copy';
import { packageFaqs } from '@/data/faqs';
import { packageCategories } from '@/data/packages';
import FaqSection from './FaqSection';
import OfferCallout from './OfferCallout';
import { CategoryPackages } from './PackagesSection';
import ServiceCtaBand from './ServiceCtaBand';
import ServiceHero from './ServiceHero';
import ServiceQuote from './ServiceQuote';
import StickyCta from './StickyCta';
import TestimonialGrid, { heroQuoteFor } from './TestimonialGrid';
import TrustStrip from './TrustStrip';
import WhyChooseUs from './WhyChooseUs';

/**
 * A package category page (/logo-design-package, ...), laid out like the service pages: hero with the starting
 * price and a "which package?" form, proof, the 15% offer and every package card (#packages), a prompt for the
 * undecided, reasons, reviews, FAQs and a closing form. Highlights and reasons come from the matching service.
 */
export default function PackagePage({ category }) {
  const cat = packageCategories[category];
  const intro = packageIntros[category];
  const service = packageService[category];
  const first = cat.cards[0];
  const from = `${first.priceLabel}${first.period ? ` ${first.period.toLowerCase()}` : ''}`;
  const popularId = service && serviceExtras[service]?.packages?.category === category ? serviceExtras[service].packages.popular : null;
  const lead = Array.isArray(intro.text) ? intro.text.join(' ') : intro.text;
  const name = cat.heading.replace(/ Packages$/, '');

  return (
    <>
      <ServiceHero
        eyebrow={`${cat.heading} and pricing`}
        title={intro.title}
        lead={lead}
        highlights={packageHighlights[category] || serviceHighlights[service] || []}
        price={{ label: `from ${from}`, button: `Compare ${cat.cards.length} packages from ${from}` }}
        serviceName={name}
        testimonial={heroQuoteFor(category === 'logo-design')}
        cardTitle="Not sure which package fits?"
        cardText="Tell us about your project and we’ll recommend the right package, free and with no obligation."
      />
      <TrustStrip />
      <CategoryPackages
        category={category}
        id="packages"
        popular={popularId}
        className="price__area pt-80 pb-60"
        before={<OfferCallout />}
      />
      <ServiceCtaBand />
      {service && <WhyChooseUs title={`Why order ${name.toLowerCase()} from Logo Makers Pro`} items={whyChooseUs[service]} />}
      <TestimonialGrid exclude={heroQuoteFor(category === 'logo-design')} topic={service || category} />
      <FaqSection title={`${cat.heading} FAQs`} items={packageFaqs[category] || []} idPrefix={`faq-${category}`} />
      <ServiceQuote serviceName={name} />
      <StickyCta />
    </>
  );
}
