import CtaSection from '@/components/sections/CtaSection';
import FaqSection from '@/components/sections/FaqSection';
import JsonLd from '@/components/seo/JsonLd';
import { generalPackageFaqs } from '@/data/faqs';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import PageIntro from '@/components/sections/PageIntro';
import { AllPackages } from '@/components/sections/PackagesSection';
import { PACKAGES_INTRO } from '@/data/copy';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/packages');

export default function PackagesPage() {
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
      <PageIntro as="h1" title={PACKAGES_INTRO.title} text={PACKAGES_INTRO.text} />
      <AllPackages />
      <FaqSection title="Ordering and packages FAQs" items={generalPackageFaqs} idPrefix="faq-packages" />
      <CtaSection />
    </>
  );
}
