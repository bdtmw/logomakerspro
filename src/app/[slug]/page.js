import { notFound } from 'next/navigation';
import { packageCategories } from '@/data/packages';
import { services } from '@/data/services';
import CtaSection from '@/components/sections/CtaSection';
import PageIntro from '@/components/sections/PageIntro';
import { CategoryPackages } from '@/components/sections/PackagesSection';
import ServicePage from '@/components/sections/ServicePage';
import { pageMetadata } from '@/lib/seo';
import { PACKAGES_INTRO } from '@/data/copy';

// Service pages (/logo-design, /web-design, ...) and package pages (/logo-design-package, ...).
const packagePages = Object.fromEntries(Object.keys(packageCategories).map((cat) => [`${cat}-package`, cat]));

export const dynamicParams = false;

export function generateStaticParams() {
  return [...Object.keys(services), ...Object.keys(packagePages)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return pageMetadata(`/${slug}`);
}

export default async function SlugPage({ params }) {
  const { slug } = await params;

  if (services[slug]) return <ServicePage blocks={services[slug]} />;

  const category = packagePages[slug];
  if (!category) notFound();
  return (
    <>
      <PageIntro title={PACKAGES_INTRO.title} text={PACKAGES_INTRO.text} />
      <CategoryPackages category={category} />
      <CtaSection />
    </>
  );
}
