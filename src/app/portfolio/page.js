import CtaSection from '@/components/sections/CtaSection';
import PageIntro from '@/components/sections/PageIntro';
import PortfolioSection from '@/components/sections/PortfolioSection';
import { PORTFOLIO_INTRO } from '@/data/copy';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/portfolio');

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', route: '/' }, { name: 'Portfolio', route: '/portfolio' }])} />
      <PageIntro as="h1" title={PORTFOLIO_INTRO.title} text={PORTFOLIO_INTRO.text} />
      <PortfolioSection />
      <CtaSection />
    </>
  );
}
