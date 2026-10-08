import { notFound } from 'next/navigation';
import { packageCategories } from '@/data/packages';
import { services } from '@/data/services';
import { serviceExtras, serviceHighlights, whyChooseUs } from '@/data/copy';
import { industries, industrySlugs } from '@/data/industries';
import { packageFaqs, serviceFaqs } from '@/data/faqs';
import PackagePage from '@/components/sections/PackagePage';
import ServicePage from '@/components/sections/ServicePage';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, offerCatalogSchema, serviceNames, serviceSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

// Service pages (/logo-design, /wordpress, ...) and package pages (/logo-design-package, ...).

// /logo-design links to every industry page (/logo-design/restaurant, ...).
const industryLinks = {
  heading: 'Logo design by industry',
  links: industrySlugs.map((s) => ({ label: industries[s].name, href: `/logo-design/${s}` })),
};
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

  if (services[slug]) {
    const extras = { ...serviceExtras[slug], ...(slug === 'logo-design' ? { links: industryLinks } : {}) };
    const faqs = serviceFaqs[slug] || [];
    const category = extras.packages ? packageCategories[extras.packages.category] : null;
    return (
      <>
        <JsonLd
          data={[
            serviceSchema(slug, category),
            faqSchema(faqs),
            breadcrumbSchema([
              { name: 'Home', route: '/' },
              { name: serviceNames[slug], route: `/${slug}` },
            ]),
          ]}
        />
        <ServicePage
          blocks={services[slug]}
          extras={extras}
          faqs={faqs}
          serviceName={serviceNames[slug]}
          highlights={serviceHighlights[slug]}
          reasons={whyChooseUs[slug]}
          topic={slug}
        />
      </>
    );
  }

  const category = packagePages[slug];
  if (!category) notFound();
  const cat = packageCategories[category];
  const faqs = packageFaqs[category] || [];
  return (
    <>
      <JsonLd
        data={[
          offerCatalogSchema(cat),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', route: '/' },
            { name: 'Packages', route: '/packages' },
            { name: cat.heading, route: `/${slug}` },
          ]),
        ]}
      />
      <PackagePage category={category} />
    </>
  );
}
