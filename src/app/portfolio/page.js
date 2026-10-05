import CtaSection from '@/components/sections/CtaSection';
import PageIntro from '@/components/sections/PageIntro';
import PortfolioSection from '@/components/sections/PortfolioSection';
import { PORTFOLIO_INTRO } from '@/data/copy';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/portfolio');

export default function PortfolioPage() {
  return (
    <>
      <PageIntro title={PORTFOLIO_INTRO.title} text={PORTFOLIO_INTRO.text} />
      <PortfolioSection />
      <CtaSection />
    </>
  );
}
