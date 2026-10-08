import FaqSection from '@/components/sections/FaqSection';
import JsonLd from '@/components/seo/JsonLd';
import OfferCallout from '@/components/sections/OfferCallout';
import { AllPackages } from '@/components/sections/PackagesSection';
import ServiceCtaBand from '@/components/sections/ServiceCtaBand';
import ServiceHero from '@/components/sections/ServiceHero';
import ServiceQuote from '@/components/sections/ServiceQuote';
import StickyCta from '@/components/sections/StickyCta';
import TestimonialGrid, { heroQuoteFor } from '@/components/sections/TestimonialGrid';
import TrustStrip from '@/components/sections/TrustStrip';
import { PACKAGES_INTRO, serviceExtras } from '@/data/copy';
import { generalPackageFaqs } from '@/data/faqs';
import { packageCategories } from '@/data/packages';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/packages');

const lowest = Object.values(packageCategories)
  .flatMap((c) => c.cards)
  .filter((c) => typeof c.price === 'number' && !c.period)
  .sort((a, b) => a.price - b.price)[0];
const packageCount = Object.values(packageCategories).reduce((n, c) => n + c.cards.length, 0);

// Most popular badges, only where the site already backs them (see serviceExtras in src/data/copy.js).
const popular = Object.fromEntries(
  Object.values(serviceExtras)
    .map((e) => e.packages)
    .filter((p) => p?.popular)
    .map((p) => [p.category, p.popular]),
);

export default function PackagesPage() {
  const heroQuote = heroQuoteFor(false);
  return (
    <>
      <JsonLd
        data={[
          faqSchema(generalPackageFaqs),
          breadcrumbSchema([
            { name: 'Home', route: '/' },
            { name: 'Packages', route: '/packages' },
          ]),
        ]}
      />
      <ServiceHero
        eyebrow="Packages and pricing"
        title={PACKAGES_INTRO.title}
        lead={PACKAGES_INTRO.text}
        highlights={PACKAGES_INTRO.highlights}
        price={{ label: `from ${lowest.priceLabel}`, button: `Compare ${packageCount} packages from ${lowest.priceLabel}` }}
        serviceName="Package"
        testimonial={heroQuote}
        cardTitle="Not sure which package fits?"
        cardText="Tell us about your project and we’ll recommend the right package, free and with no obligation."
      />
      <TrustStrip />
      <AllPackages id="packages" before={<OfferCallout />} popular={popular} />
      <ServiceCtaBand />
      <TestimonialGrid exclude={heroQuote} topic="packages" />
      <FaqSection title="Ordering and packages FAQs" items={generalPackageFaqs} idPrefix="faq-packages" />
      <ServiceQuote serviceName="Package" title="Tell us about your project" />
      <StickyCta />
    </>
  );
}
