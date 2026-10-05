import LeadForm from '@/components/forms/LeadForm';
import { site } from '@/data/site';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/contact');

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', route: '/' }, { name: 'Contact', route: '/contact' }])} />
    <section className="contact__area-6">
      <div className="container g-0 line pt-120 pb-110">
        <span className="line-3" />
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div className="sec-title-wrapper">
              <h1 className="sec-title-2">Let’s get in touch</h1>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div className="contact__text">
              <p>
                We&apos;re excited to connect with you and begin something extraordinary together. Feel free to reach out to
                us for any inquiries or to start a special project.
              </p>
            </div>
          </div>
        </div>
        <div className="row contact__btm">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
            <div className="contact__info">
              <h3 className="sub-title-anim-top">
                Have a Question?
                <br />
                Say Hello!
              </h3>
              <ul className="contact-icons">
                <li>
                  <i className="fa-solid fa-phone-volume" /> <a href={`tel:${site.phone}`}>{site.phone}</a>
                </li>
                <li>
                  <i className="fa-solid fa-envelope" /> <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot" /> <span>{site.address}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
            <div className="contact__form">
              <LeadForm variant="contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
