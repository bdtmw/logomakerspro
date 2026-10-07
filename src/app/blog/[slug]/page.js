import { notFound } from 'next/navigation';
import ArticleBody from '@/components/blog/ArticleBody';
import CtaSection from '@/components/sections/CtaSection';
import FaqSection from '@/components/sections/FaqSection';
import JsonLd from '@/components/seo/JsonLd';
import { findPost, posts } from '@/data/blog';
import { organizationId } from '@/data/site';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  const meta = pageMetadata(`/blog/${slug}`, { seo: post.seo });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.published, modifiedTime: post.updated },
  };
}

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const route = `/blog/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.seo.description,
            url: absoluteUrl(route),
            mainEntityOfPage: absoluteUrl(route),
            datePublished: post.published,
            dateModified: post.updated,
            image: absoluteUrl('/opengraph-image'),
            author: { '@id': organizationId },
            publisher: { '@id': organizationId },
          },
          faqSchema(post.faqs),
          breadcrumbSchema([
            { name: 'Home', route: '/' },
            { name: 'Blog', route: '/blog' },
            { name: post.title, route },
          ]),
        ]}
      />
      <article className="lmp-article">
        <header className="lmp-article__header">
          <div className="container">
            <p className="lmp-article__meta">
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              {post.updated !== post.published && (
                <>
                  {' · Updated '}
                  <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              )}
              {` · ${post.readMinutes} min read`}
            </p>
            <h1 className="sec-title-2">{post.title}</h1>
            <p className="lmp-article__excerpt">{post.excerpt}</p>
          </div>
        </header>
        <div className="container">
          <ArticleBody blocks={post.body} />
        </div>
      </article>
      <FaqSection title={post.faqTitle || `${post.title} FAQs`} items={post.faqs} idPrefix={`faq-${slug}`} />
      <CtaSection subtitle="Need a logo?" title="Get original logo concepts in 24 to 72 hours" label="Get a Quote" action="quote" />
    </>
  );
}
