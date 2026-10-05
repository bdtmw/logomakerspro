import Image from 'next/image';
import CtaSection from './CtaSection';
import FaqSection from './FaqSection';
import PricingTeaser from './PricingTeaser';
import RelatedWork from './RelatedWork';

function Intro({ block }) {
  const [big, small] = block.images;
  return (
    <section className="development__area">
      <div className="container g-0 line pt-130 pb-150">
        <div className="line-3" />
        <div className="row">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
            <div className="sec-title-wrapper">
              <h1 className="sec-title">{block.title}</h1>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
            <div className="development__wrapper">
              {block.lead && (
                <div className="development__content">
                  <p>{block.lead}</p>
                </div>
              )}
              {block.body && <p>{block.body}</p>}
            </div>
          </div>
          {big && (
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8">
              <div className="development__img">
                <Image src={big.src} alt={big.alt} width={big.width} height={big.height} data-speed={big.speed} priority />
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
                  <h6 className="workflow__title-6">{item.title}</h6>
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

function renderBlock(block, i) {
  switch (block.type) {
    case 'intro':
      return <Intro block={block} key={i} />;
    case 'workflow':
      return <Workflow block={block} key={i} />;
    case 'detail':
      return <Detail block={block} key={i} />;
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
 * Renders a service landing page from its block list in src/data/services.jsx, then adds the
 * pricing teaser, related work and FAQ sections just before the closing call to action.
 */
export default function ServicePage({ blocks, extras = {}, faqs = [], serviceName }) {
  const closing = blocks.at(-1)?.type === 'cta' ? blocks.at(-1) : null;
  const body = closing ? blocks.slice(0, -1) : blocks;
  return (
    <>
      {body.map(renderBlock)}
      {extras.packages && <PricingTeaser category={extras.packages.category} ids={extras.packages.ids} />}
      {extras.portfolio && (
        <RelatedWork tab={extras.portfolio.tab} from={extras.portfolio.from} count={extras.portfolio.count} />
      )}
      <FaqSection title={`${serviceName} FAQs`} items={faqs} idPrefix="faq-service" />
      {closing && renderBlock(closing, blocks.length - 1)}
    </>
  );
}
