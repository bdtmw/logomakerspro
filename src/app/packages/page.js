import CtaSection from '@/components/sections/CtaSection';
import PageIntro from '@/components/sections/PageIntro';
import { AllPackages } from '@/components/sections/PackagesSection';
import { PACKAGES_INTRO } from '@/data/copy';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/packages');

export default function PackagesPage() {
  return (
    <>
      <PageIntro title={PACKAGES_INTRO.title} text={PACKAGES_INTRO.text} />
      <AllPackages />
      <CtaSection />
    </>
  );
}
