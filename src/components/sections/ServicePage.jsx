import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { packageCategories } from '@/data/packages';
import CtaSection from './CtaSection';
import FaqSection from './FaqSection';
import PricingTeaser from './PricingTeaser';
import RelatedWork from './RelatedWork';
import ServiceCtaBand from './ServiceCtaBand';
import ServiceHero from './ServiceHero';
import ServiceQuote from './ServiceQuote';
import StickyCta from './StickyCta';
import TestimonialsSection from './TestimonialsSection';
import TrustStrip from './TrustStrip';
import { testimonials } from '@/data/testimonials';

/** The service's longer intro copy and studio photos, below the proof sections (the H1 is in the hero). */
function About({ block, title }) {
  const [big, small] = block.images || [];
  return (
    <section className="development__area">
      <div className="container g-0 line pt-130 pb-150">
        <div className="line-3" />
        <div className="row">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
            <div className="sec-title-wrapper">
              <h2 className="sec-title">{title}</h2>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
            <div className="development__wrapper">{block.body && <p>{block.body}</p>}</div>
          </div>
          {big && (
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8">
              <div className="development__img">
                <Image src={big.src} alt={big.alt} width={big.width} height={big.height} data-speed={big.speed} />
              </div>
            </div>
          )}
          {small && (
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <div className="development__img">
                <Image src={small.src} alt={small.alt} width={small.width} height={small.height} data-speed={small.speed} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Workflow({ block }) {
  return (
    <section className="workflow__area-6">
      <div className="container g-0 line pb-130">
        {block.heading && (
          <div className="col-sm-12">
            <h2 className="workflow-head">{block.heading}</h2>
          </div>
        )}
        <div className="line-3" />
        <div className="workflow__wrapper-6">
          <div className="row">
            {block.items.map((item, i) => (
              <div className={block.colClass} key={i}>
                <div className="workflow__slide-6">
                  <h3 className="workflow__title-6">{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ block }) {
  const { image, shape } = block;
  return (
    <section className="service__detail">
      <div className="container g-0 line pb-140">
        <div className="line-3" />
        <div className="row">
          <div className="col-xxl-12">
            <div className="sec-title-wrapper">
              <h2 className="sec-title">{block.title}</h2>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
            <div className="service__detail-circle">
              <span />
            </div>
          </div>
          <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9">
            <div className="service__detail-img">
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
              {shape && <Image src={shape.src} alt={shape.alt} width={shape.width} height={shape.height} className={shape.className} />}
            </div>
            <div className="service__detail-content">
              <p>{block.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Heading on the left, copy (paragraphs, a bullet list, a closing line) on the right. */
function TextBlock({ block }) {
  return (
    <section className="lmp-text-block">
      <div className="container g-0 line pb-110">
        <div className="line-3" />
        <div className="row">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
            <h2 className="sec-title">{block.heading}</h2>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
            <div className="lmp-text-block__body">
              {block.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
              {block.list && (
                <ul>
                  {block.list.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              )}
              {block.after && <p>{block.after}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Links to related pages (industry logo pages on /logo-design, sibling pages on an industry page). */
function LinksBlock({ block }) {
  return (
    <section className="workflow__area-6 lmp-links-block">
      <div className="container g-0 line pb-110">
        <div className="col-sm-12">
          <h2 className="workflow-head">{block.heading}</h2>
        </div>
        <div className="line-3" />
        <ul className="lmp-links-block__list">
          {block.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>
                {l.label} <i className="fa-solid fa-arrow-right" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'workflow':
      return <Workflow block={block} key={i} />;
    case 'detail':
      return <Detail block={block} key={i} />;
    case 'text':
      return <TextBlock block={block} key={i} />;
    case 'work':
      return <RelatedWork key={i} picks={block.items} heading={block.heading} intro={block.intro} />;
    case 'links':
      return block.links?.length ? <LinksBlock block={block} key={i} /> : null;
    case 'cta':
      return (
        <CtaSection
          key={i}
          subtitle={block.subtitle}
          title={block.title}
          label={block.label}
          action={block.action}
          containerClass={block.containerClass}
        />
      );
    default:
      return null;
  }
}

/**
 * Service landing page, laid out for conversion: hero with a quote form, proof, pricing near the top, then the
 * service's own sections from its block list (src/data/services.jsx or industries.js) with one mid-page call to
 * action, related work, the longer intro copy, testimonials, links, FAQs and a closing quote form. On phones a
 * sticky Get a quote / Call bar appears once the hero form is off screen.
 */
export default function ServicePage({ blocks, extras = {}, faqs = [], serviceName, highlights, eyebrow, pricingNote }) {
  const intro = blocks.find((b) => b.type === 'intro');
  const hasMidCta = blocks.some((b) => b.type === 'cta' && b.action === 'quote');
  // Proof comes straight after the trust strip: hand-picked work (industry pages) or the service's portfolio run.
  const workBlock = blocks.find((b) => b.type === 'work');
  const body = blocks.filter((b) => !['intro', 'cta', 'work'].includes(b.type));
  const isLogo = extras.packages?.category === 'logo-design';
  // Real client quotes (src/data/testimonials.js): the logo one on logo pages, a general one elsewhere.
  const heroQuote = testimonials[isLogo ? 2 : 1];
  const cat = extras.packages && packageCategories[extras.packages.category];
  const first = cat?.cards[0];
  const price = first ? { label: `from ${first.priceLabel}${first.period ? ` ${first.period.toLowerCase()}` : ''}` } : null;

  return (
    <>
      <ServiceHero
        eyebrow={eyebrow || serviceName}
        title={intro?.title}
        lead={intro?.lead}
        highlights={highlights}
        price={price}
        serviceName={serviceName}
        testimonial={heroQuote}
      />
      <TrustStrip />
      {workBlock && renderBlock(workBlock, 'work')}
      {!workBlock && extras.portfolio && (
        <RelatedWork tab={extras.portfolio.tab} from={extras.portfolio.from} count={extras.portfolio.count} />
      )}
      {extras.packages && (
        <PricingTeaser
          category={extras.packages.category}
          ids={extras.packages.ids}
          popular={extras.packages.popular}
          note={pricingNote}
        />
      )}
      {body.map((b, i) => (
        <Fragment key={i}>
          {renderBlock(b, i)}
          {i === 0 && hasMidCta && <ServiceCtaBand />}
        </Fragment>
      ))}
      {intro?.body && <About block={intro} title={`Why choose us for ${serviceName.toLowerCase()}`} />}
      <TestimonialsSection />
      {extras.links && renderBlock({ type: 'links', ...extras.links }, 'links')}
      <FaqSection title={`${serviceName} FAQs`} items={faqs} idPrefix="faq-service" />
      <ServiceQuote serviceName={serviceName} />
      <StickyCta />
    </>
  );
}
