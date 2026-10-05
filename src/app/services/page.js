import Link from 'next/link';
import CtaSection from '@/components/sections/CtaSection';
import PageIntro from '@/components/sections/PageIntro';
import JsonLd from '@/components/seo/JsonLd';
import { SERVICES_INTRO, serviceExtras, servicesHub } from '@/data/copy';
import { packageCategories } from '@/data/packages';
import { breadcrumbSchema, serviceNames } from '@/lib/schema';
import { absoluteUrl, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/services');

/** "From $29" and its package page for a service, or null when the service has no packages. */
function startingPrice(slug) {
  const cat = packageCategories[serviceExtras[slug]?.packages?.category];
  const first = cat?.cards[0];
  if (!first) return null;
  return { label: `From ${first.priceLabel}${first.period ? ` ${first.period.toLowerCase()}` : ''}`, href: `/${cat.slug}-package` };
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', route: '/' },
            { name: 'Services', route: '/services' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Logo Makers Pro services',
            itemListElement: servicesHub.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: serviceNames[s.slug],
              url: absoluteUrl(`/${s.slug}`),
            })),
          },
        ]}
      />
      <PageIntro as="h1" title={SERVICES_INTRO.title} text={SERVICES_INTRO.text} />
      <section className="workflow__area-6 lmp-services-hub">
        <div className="container g-0 line pb-130">
          <div className="line-3" />
          <div className="workflow__wrapper-6">
            <div className="row">
              {servicesHub.map(({ slug, text }) => {
                const price = startingPrice(slug);
                return (
                  <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6" key={slug}>
                    <div className="workflow__slide-6">
                      <h2 className="workflow__title-6">
                        <Link href={`/${slug}`}>{serviceNames[slug]}</Link>
                      </h2>
                      <p>{text}</p>
                      <p className="lmp-services-hub__links">
                        <Link href={`/${slug}`}>
                          {serviceNames[slug]} details <i className="fa-solid fa-arrow-right" />
                        </Link>
                        {price && <Link href={price.href}>{price.label}</Link>}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
