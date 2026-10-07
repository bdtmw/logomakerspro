import Link from 'next/link';
import CtaSection from '@/components/sections/CtaSection';
import PageIntro from '@/components/sections/PageIntro';
import JsonLd from '@/components/seo/JsonLd';
import { blogIntro, posts } from '@/data/blog';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/blog');

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', route: '/' }, { name: 'Blog', route: '/blog' }])} />
      <PageIntro as="h1" title={blogIntro.title} text={blogIntro.text} />
      <section className="lmp-blog-list">
        <div className="container pb-130">
          {posts.map((post) => (
            <article className="lmp-blog-list__item" key={post.slug}>
              <p className="lmp-article__meta">
                <time dateTime={post.published}>{formatDate(post.published)}</time>
                {` · ${post.readMinutes} min read`}
              </p>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="lmp-blog-list__more">
                Read the guide <i className="fa-solid fa-arrow-right" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
