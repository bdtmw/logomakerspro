import Image from 'next/image';
import Counter from '@/components/ui/Counter';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/about');

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', route: '/' }, { name: 'About', route: '/about' }])} />
      <section className="hero__about">
        <div className="container g-0 line">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-12">
              <div className="hero__about-content">
                <h1 className="hero-title">About Logo Makers Pro</h1>
                <div className="hero__about-info">
                  <div className="hero__about-btn">
                    <MagneticButton href="/contact" className="wc-btn-primary btn-hover btn-item">
                      Contact Us{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </MagneticButton>
                  </div>
                  <div className="hero__about-text">
                    <p>
                      <Link href="/about"></Link>
                      {" "}At Logo Makers Pro, we are passionate about helping businesses and entrepreneurs stand out with high-quality, custom logos. Our team of experienced designers works closely with clients to understand their brand’s vision and create unique logos that reflect their identity and values. Whether you’re a startup or an established business, we provide tailored logo design solutions that set you apart from the competition.
                    </p>
                  </div>
                  <div className="hero__about-award">
                    <Image src="/assets/imgs/logo/logo-black.webp" alt="Logo Makers Pro logo" width={150} height={83} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="story__area">
        <div className="container g-0 line pt-140">
          <span className="line-3"></span>
          <div className="sec-title-wrapper">
            <div className="row">
              <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                <h2 className="sec-title">Building Brands with Impactful Designs</h2>
              </div>
              <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                <div className="story__text">
                  <p>
                    Our goal is simple: to provide logos that make an impact. With years of expertise in logo creation and branding, Logo Makers Pro ensures that every design we deliver is not only visually appealing but also meaningful. We believe that a great logo is the cornerstone of a successful brand, and we are dedicated to providing our clients with designs that resonate with their audience and elevate their brand image. Let us help you create a logo that speaks to your target market and sets the foundation for long-term business growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
              <div className="story__img-wrapper">
                <Image src="/assets/imgs/story/333.webp" alt="Two designers reviewing a project on a laptop" width={300} height={450} className="w-100" />
              </div>
            </div>
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="story__img-wrapper img-anim">
                <Image src="/assets/imgs/story/12345.webp" alt="Team discussing a website design at a meeting table" width={520} height={700} data-speed="auto" />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <div className="story__img-wrapper">
                <Image src="/assets/imgs/story/3.webp" alt="Brainstorming session with sticky notes on a glass wall" width={230} height={140} />
                {" "}
                <Image src="/assets/imgs/story/34.webp" alt="Designers presenting a concept on a laptop" width={410} height={330} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="counter__area">
        <div className="container g-0 line pb-140 pt-140">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-12">
              <div className="counter__wrapper-2 counter_animation">
                <div className="counter__item-2">
                  <Counter value="1000+" />
                  <p>
                    Logo
                    <br />
                    Designs
                  </p>
                  <span className="counter__border"></span>
                </div>
                <div className="counter__item-2">
                  <Counter value="200+" />
                  <p>
                    Website
                    <br />
                    Designs
                  </p>
                  <span className="counter__border"></span>
                </div>
                <div className="counter__item-2">
                  <Counter value="100+" />
                  <p>
                    Mobile
                    <br />
                    Apps
                  </p>
                  <span className="counter__border"></span>
                </div>
                <div className="counter__item-2">
                  <Counter value="150+" />
                  <p>
                    Ecommerce
                    <br />
                    Websites
                  </p>
                  <span className="counter__border"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <section className="cta__area">
        <div className="container line pb-110">
          <div className="line-3"></div>
          <div className="row">
            <div className="col-xxl-12">
              <div className="cta__content">
                <p className="cta__sub-title">About Logo Makers Pro</p>
                <h2 className="cta__title">Crafting Brands That Stand Out</h2>
                <MagneticButton href="/" className="wc-btn-primary btn-hover btn-item">
                  Start Exploring{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
