import { seo } from '@/data/seo';
import { site } from '@/data/site';
import { absoluteUrl } from '@/lib/seo';

const provider = { '@type': 'Organization', name: site.name, url: `${site.url}/` };

export const serviceNames = {
  'logo-design': 'Logo Design',
  'web-design': 'Website Design',
  'e-commerce': 'Ecommerce Website Design',
  wordpress: 'WordPress Website Development',
  'video-animation': 'Video Animation',
  'brand-services': 'Branding',
  'digital-marketing-services': 'Digital Marketing',
  'mobile-app-services': 'Mobile App Development',
};

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: absoluteUrl(step.route),
    })),
  };
}

export function faqSchema(items) {
  if (!items?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** Service schema; with a package category it carries the price range as an AggregateOffer. */
export function serviceSchema(slug, category) {
  const route = `/${slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceNames[slug],
    serviceType: serviceNames[slug],
    url: absoluteUrl(route),
    ...(seo[route]?.description ? { description: seo[route].description } : {}),
    provider,
    areaServed: { '@type': 'Country', name: 'United States' },
  };
  const prices = (category?.cards || []).map((c) => c.price).filter((p) => typeof p === 'number');
  if (prices.length) {
    schema.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      url: absoluteUrl(`/${category.slug}-package`),
    };
  }
  return schema;
}

/** OfferCatalog for a package category page: one Offer per card. */
export function offerCatalogSchema(category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: category.heading,
    url: absoluteUrl(`/${category.slug}-package`),
    itemListElement: category.cards
      .filter((c) => typeof c.price === 'number')
      .map((c) => ({
        '@type': 'Offer',
        name: c.orderName || c.title.join(' '),
        price: c.price.toFixed(2),
        priceCurrency: 'USD',
        ...(c.monthly
          ? {
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: c.price.toFixed(2),
                priceCurrency: 'USD',
                unitCode: 'MON',
                referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
              },
            }
          : {}),
        url: absoluteUrl(`/order/order-now?package=${encodeURIComponent(c.id)}`),
        itemOffered: { '@type': 'Service', name: c.orderName || c.title.join(' '), provider },
      })),
  };
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: `${site.url}/`,
};
