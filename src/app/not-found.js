import CtaSection from '@/components/sections/CtaSection';

export const metadata = { title: 'Page not found | Logo Makers Pro' };

export default function NotFound() {
  return (
    <>
      <section className="hero__about">
        <div className="container g-0 line">
          <span className="line-3" />
          <div className="row">
            <div className="col-xxl-12">
              <div className="hero__about-content">
                <h1 className="hero-title">Page not found</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaSection subtitle="Lost?" title="Let’s get you back on track." label="Back to home" action="link" href="/" />
    </>
  );
}
