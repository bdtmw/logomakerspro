import { notFound } from 'next/navigation';
import ServicePage from '@/components/sections/ServicePage';
import JsonLd from '@/components/seo/JsonLd';
import { serviceExtras, serviceHighlights } from '@/data/copy';
import { industries, industrySlugs } from '@/data/industries';
import { packageCategories } from '@/data/packages';
import { services } from '@/data/services';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

// Industry logo design pages: /logo-design/restaurant, /logo-design/real-estate. Content in src/data/industries.js.
export const dynamicParams = false;

export function generateStaticParams() {
  return industrySlugs.map((industry) => ({ industry }));
}

export async function generateMetadata({ params }) {
  const { industry } = await params;
  return pageMetadata(`/logo-design/${industry}`);
}

// Same intro photos as /logo-design: they show the design studio, not a specific industry.
const introImages = services['logo-design'].find((b) => b.type === 'intro').images;

/** The page as ServicePage blocks: intro (hero), copy, styles, a mid-page quote prompt and related work. */
function blocksFor(page) {
  const [why, uses] = page.sections;
  return [
    { type: 'intro', title: page.title, lead: page.lead, body: page.body, images: introImages },
    { type: 'text', ...why },
    { type: 'workflow', heading: page.styles.heading, colClass: 'col-xxl-3 col-xl-3 col-lg-3 col-md-6', items: page.styles.items },
    { type: 'text', ...uses },
    {
      type: 'cta',
      containerClass: 'container line',
      subtitle: 'Work with us',
      title: `Start your ${page.name.toLowerCase()} today`,
      label: 'Get a Quote',
      action: 'quote',
    },
    { type: 'work', ...page.work },
  ];
}

export default async function IndustryLogoPage({ params }) {
  const { industry } = await params;
  const page = industries[industry];
  if (!page) notFound();

  const route = `/logo-design/${industry}`;
  const logoPackages = serviceExtras['logo-design'].packages;
  const others = industrySlugs.filter((s) => s !== industry);
  const links = {
    heading: 'More logo design',
    links: [
      ...others.map((s) => ({ label: industries[s].name, href: `/logo-design/${s}` })),
      { label: 'All logo design services', href: '/logo-design' },
      { label: 'Logo design portfolio', href: '/portfolio' },
    ],
  };

  return (
    <>
      <JsonLd
        data={[
          serviceSchema('logo-design', packageCategories[logoPackages.category], {
            route,
            name: page.name,
            audience: page.audience,
          }),
          faqSchema(page.faqs),
          breadcrumbSchema([
            { name: 'Home', route: '/' },
            { name: 'Logo Design', route: '/logo-design' },
            { name: page.name, route },
          ]),
        ]}
      />
      <ServicePage
        blocks={blocksFor(page)}
        extras={{ packages: logoPackages, links }}
        faqs={page.faqs}
        serviceName={page.name}
        highlights={serviceHighlights['logo-design']}
        pricingNote={page.packagesNote}
      />
    </>
  );
}
