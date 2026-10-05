import Image from 'next/image';
import Counter from '@/components/ui/Counter';
import HomeWorkflow from '@/components/sections/HomeWorkflow';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import PortfolioSection from '@/components/sections/PortfolioSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { CategoryPackages } from '@/components/sections/PackagesSection';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/');

export default function HomePage() {
  return (
    <>
      <section className="hero__area-3">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="hero__inner-3">
                <div className="sec-title-wrapper">
                  <h2 className="sec-sub-title">Logo Design Company</h2>
                  <h4 className="sec-title">Logo</h4>
                  <h4 className="sec-title right-text-head">Makers Pro</h4>
                </div>
                <div className="hero__text-3">
                  <p>
                    Elevate your business with captivating logo design solutions at Logo Makers Pro. We craft unique designs that enhance your brand's identity and leave a lasting impression. Achieve excellence with our{" "}
                    <strong>professional logo design services.</strong>
                  </p>
                </div>
                <div className="scroll-down">
                  <button>
                    <Image src="/assets/imgs/icon/arrow-down-sm.png" alt="arrow icon" width={17} height={28} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="video-info">
            <div className="video-intro">
              <input id="video_check" type="checkbox" />
              <div className="intro-title"><Image src="/assets/imgs/shape/6.png" alt="" width={47} height={45} /></div>
            </div>
          </div>
        </div>
        <div className="hero3-img-ani">
          <Image src="/assets/imgs/hero/3/1_003.webp" alt="Hero Image" width={1195} height={350} className="hero3-img" />
        </div>
      </section>
      <section className="about__area-3">
        <div className="container pt-140 pb-110">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="about__img-3">
                <Image src="/assets/imgs/about/3/1.webp" alt="About Thumbnail" width={550} height={765} data-speed="auto" />
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title">Who We Are</h2>
                <h3 className="sec-title">Best And Remarkable Logo Design Agency</h3>
              </div>
              <div className="sec-text-wrapper">
                <div className="sec-text">
                  <p>
                    At Logo Makers Pro, we pride ourselves on delivering top-tier logo design services. With experience spanning various industries, from startups to established brands, our team is adept at meeting the unique needs of every project. Trust us to bring your brand to life with excellence and precision.
                  </p>
                  <MagneticButton href="/about" className="wc-btn-light btn-hover btn-item">
                    Explore Us{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="service__area-3 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper pt-130">
                <h2 className="sec-sub-title">Services</h2>
                <h3 className="sec-title">
                  GRAPHIC DESIGN SERVICES
                  <br />
                  WE OFFER
                </h3>
                <p>
                  Logo Makers Pro specializes in comprehensive logo design services, empowering businesses to craft a compelling digital identity. Our skilled designers collaborate closely with you to create bespoke logo solutions. From conceptualization to execution, we offer a range of logo design services tailored to your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single__bg">
                <div className="single__service">
                  <div className="single__service-icon">
                    <Image src="/assets/imgs/s-icon-1.png" alt="icon" width={241} height={266} />
                  </div>
                  <div className="single__service-content">
                    <h3>
                      UI/UX
                      <br />
                      DESIGN
                    </h3>
                    <p>
                      Your company logo isn’t just a tiny artwork! It has to have an idea, a story behind the design. Team WebbMight aims to give your brand an edge, we design logos that become the talk of the town, making brands approachable!
                    </p>
                  </div>
                  <div className="single__service-link"><Link href="/logo-design" className="s-btn">Details</Link></div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single__bg">
                <div className="single__service">
                  <div className="single__service-icon">
                    <Image src="/assets/imgs/s-icon-2.webp" alt="icon" width={241} height={241} />
                  </div>
                  <div className="single__service-content">
                    <h3>
                      LOGO
                      <br />
                      DESIGN
                    </h3>
                    <p>
                      Designing engaging logos that resonate with your brand's identity. Our team ensures your logo reflects your products and services, establishing a memorable and impactful brand presence.
                    </p>
                  </div>
                  <div className="single__service-link"><Link href="/web-design" className="s-btn">Details</Link></div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single__bg">
                <div className="single__service">
                  <div className="single__service-icon">
                    <Image src="/assets/imgs/s-icon-3.webp" alt="icon" width={241} height={241} />
                  </div>
                  <div className="single__service-content">
                    <h3>ANIMATION</h3>
                    <p>
                      Creating dynamic animations that bring your brand to life. Our team specializes in delivering captivating motion graphics and animations that engage and captivate your audience.
                    </p>
                  </div>
                  <div className="single__service-link"><Link href="/mobile-app-services" className="s-btn">Details</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PortfolioSection />
      {/* Same cards as /logo-design-package, but every card opens the quote popup (as on the live home page). */}
      <CategoryPackages category="logo-design" forceQuote />
      <HomeWorkflow>
        <div className="choose-wrapper wf_panel">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="choose-title-wrapper">
                  <h2 className="choose-title">
                    What
                    <br />
                    We Do
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="counter__area-3 wf_panel">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="sec-title-wrapper">
                  <h2 className="sec-sub-title">
                    Why
                    <br />
                    Choose Us
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                <div className="counter__wrapper-3">
                  <div className="counter__item-3">
                    <Counter value="1000+" />
                    <p>
                      Logo
                      <br />
                      Designs
                    </p>
                  </div>
                  <div className="counter__item-3">
                    <Counter value="200+" />
                    <p>
                      Websites
                      <br />
                      Designs
                    </p>
                  </div>
                  <div className="counter__item-3">
                    <Counter value="100+" />
                    <p>
                      Mobile
                      <br />
                      Apps
                    </p>
                  </div>
                  <div className="counter__item-3">
                    <Counter value="150+" />
                    <p>
                      Ecommerce
                      <br />
                      Websites
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                <div className="counter__img-3">
                  <Image src="/assets/imgs/thumb/counter-3.webp" alt="Counter Image" width={717} height={670} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cta__area-3 wf_panel">
          <div className="container pt-150 pb-150">
            <div className="row">
              <div className="col-xxl-12">
                <div className="cta__content-3">
                  <p className="cta__sub-title-2">Have you project in mind?</p>
                  <h2 className="cta__title-2">Let’s make something great together!</h2>
                  <MagneticButton href="/contact" className="wc-btn-black btn-hover btn-item">
                    Contact
                    <br />
                    with us{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeWorkflow>
      <TestimonialsSection />
    </>
  );
}
