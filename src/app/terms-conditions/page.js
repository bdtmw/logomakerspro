import Link from 'next/link';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/terms-conditions');

export default function TermsConditionsPage() {
  return (
    <>
      <section className="hero__about">
        <div className="container g-0 line">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-12">
              <div className="hero__about-content"><h1 className="hero-title">Terms &amp; Conditions</h1></div>
            </div>
          </div>
        </div>
      </section>
      <section className="story__area">
        <div className="container g-0 line pt-140">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
              <div className="in_terms">
                <h2>Revision Policy</h2>
                <p>
                  We provide revision depending upon the package you selected. Customers can ask us for unlimited free revisions and we will revise their design without any additional charges provided that the design and concept remains the same. Revision Turnaround Time would be 48 hours.
                </p>
              </div>
              <div className="in_terms">
                <h2>Refund Policy / Money Back Guarantee</h2>
                <p>
                  In any event, any deposited funds for a project shall not be subject to refund after delivery if the initial design concepts are approved, or a change is requested unless Logo Makers Pro™ cancels or terminates your Contract for a reason other than your breach or non-performance.
                </p>
              </div>
              <div className="in_terms">
                <h2>All refund requests will be fulfilled as per the following arrangement:</h2>
                <ul>
                  <li>
                    You make a request when the initial concepts for a logo are offered. However once you approve or request changes in the initial designs, the refund offer becomes void and refund request will not be entertained.
                  </li>
                  <li>
                    If request for refund is made before the delivery of initial design concepts, then you would be eligible for Full Refund (less 10% service &amp; processing fee).
                  </li>
                  <li>
                    If request for refund is made within 48 hours, you would be eligible for 66% refund (less 10% service &amp; processing fee).
                  </li>
                  <li>
                    If request for refund is made between 48- 120 hours of the initial design delivery, you would be eligible 33% refund (less 10% service &amp; processing fee).
                  </li>
                  <li>
                    No refund request will be entertained after 120 hours of your initial design delivery, however since we believe in 100% customer satisfaction you`re encouraged to contact us in case of any concern.
                  </li>
                  <li>
                    No refund request will be entertained if you have not taken any action on your order for 30 days after placing your order. However, if you want to reactivate your design order, you will be charged a certain fee depending on your project.
                  </li>
                  <li>No refund requests will be entertained after the final files have been delivered.</li>
                  <li>
                    For website packages no refund will be entertained once website development has been completed or once the website has been deployed live.
                  </li>
                  <li>For video animation packages no refund request will be entertained after the designing of the storyboard.</li>
                  <li>
                    All refund requests should be communicated to the support department. Logo Makers Pro, based on the violation of your user agreement reserves the right to approve/disapprove your request on an individual case to case basis.
                  </li>
                  <li>For Logo Makers Pro / Custom packages, refund will be applicable the same as it is on the single packages.</li>
                  <li>
                    For example, if you order logo and web design service and approve the logo, you can claim refund for the website service at the time of initial design only.
                  </li>
                  <li>
                    A refund request will need to have a valid reason which must be qualified against the design brief and customer feedback for revisions. Unless a concept has not been designed according to the brief, a refund will not be given however further revisions will be provided until complete satisfaction.
                  </li>
                  <li>
                    Money back guarantee is based on that the order is placed in good faith. Where a customer has placed design orders with more than one design agency for the same job with the intention to claim refund, we do not consider it a good faith. In such a case we reserve the right to decline a refund request.
                  </li>
                  <li>
                    All design jobs require customer feedback before finalizing the design therefore it is only fair that the customer gets involved and provides feedback in order to get the desired results.
                  </li>
                  <li>
                    100% unique design guarantee entitles you to a re-draw if our designed logo is to be found considerably similar to another logo design that may already exist. Any resemblance to an existing design will be merely a coincidence and Logo Makers Pro will not accept any responsibility or claim of any compensation in such a case. It is the client's responsibility to get their art work copyrighted.
                  </li>
                </ul>
              </div>
              <div className="in_terms pb-5">
                <h2>How to claim your refund</h2>
                <p className="bold-para">
                  To assure your refund request is approved, please make sure you meet the following requirements
                </p>
                <ul>
                  <li>
                    Claim your refund specifying your concern by contacting us via any of the following three modes:{" "}
                    <ul className="marker-li">
                      <li>Phone: <a href={`tel:${site.phoneE164}`}>{site.phone}</a></li>
                      <li>Live Chat</li>
                      <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
                      <li>
                        We will try to resolve your concern by virtue of our revision policy immediately or else will email you a refund request approval from our refund department. After the refund, your design rights would be obtained by Logo Makers Pro and you would not be able to display any version of the design sent by company. Let us also specify that:{" "}
                        <ul className="marker-li-2">
                          <li>
                            Since the design rights would now be transferred to the company, you agree that you will have no right (direct or indirect) to use any response or other content, work product or media, nor will you have any ownership interest in or to the same.
                          </li>
                          <li>
                            Working in collaboration with the Government Copyright Agencies The Logo Makers Pro would share Copyright Acquisition information for the refunded designs that would restrict the re-use of the designs as original designs in the future. If you have any questions or concerns about our Refund Policy, please contact us by clicking here{" "}
                            <a href={`mailto:${site.email}`}>{site.email}</a>.
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <h2>Quality Assurance Policy</h2>
                    <p>
                      In order to provide you the desired satisfaction, our designers don’t deviate from the specifications provided by you in the order form. The designs are created after a thorough research which ensures the design quality and uniqueness.
                    </p>
                    <h2>100% Satisfaction Guarantee</h2>
                    <p>
                      We rework the ordered design and keep on revising it until you are 100% satisfied (depending upon your package).
                    </p>
                    <h2>Domain and Hosting</h2>
                    <p>
                      Domain and hosting will be provided for free with website packages, where applicable. All the email accounts provided with website packages can be configured on third party email soft-wares such as outlook. Each email account will have 10MB of space. If you are not hosting your website with us, we will not provide email accounts.
                    </p>
                    <h2>Delivery Policy</h2>
                    <p>
                      All design order files are delivered to My Account as per the date specified on the “Order Confirmation”. An e-mail is also sent to inform the client about their design order delivery made to their specific account area. All policies pertaining to revision &amp; refund are subject to date and time of design order delivered to client’s account area. All design order files are delivered to “My Account” as per the date specified on the “Order Confirmation”. An e-mail is also sent to inform the client about their design order delivery made to their specific account area. All policies pertaining to revision &amp; refund are subject to date and time of design order delivered to client’s account area. We deliver all our customized design orders via e-mail within 5 to 7 days of receiving your order. We offer a RUSH DELIVERY service through which you can have your first logo samples within 48 hours by paying just $100 extra! For further assistance, contact us at 24-Hour Customer Support Center.
                    </p>
                    <h2>Record Maintenance</h2>
                    <p>
                      We keep a record of your finalized design once we provide you the final files. If you require the final files again in the future we can send them to you at your request.
                    </p>
                    <h2>Customer Support</h2>
                    <p>
                      We offer 24-Hour Customer Support to address your queries and questions. You can contact us any time and we guarantee to respond immediately.
                    </p>
                    <h2>Communication Policy</h2>
                    <p>
                      YOU agree that The Logo Makers Pro is not liable for any correspondence from email address (es) other than the ones followed by our own domain i.e. “..
                      <Link href="/terms-conditions">@logomakerspro.com</Link>
                      ” or/and any phone number that is not mentioned on our website. The Logo Makers Pro should not be held responsible for any damage(s) caused by such correspondence. We only take responsibility of any communication through email address (es) under our own domain name or/and via the phone number already mentioned on The Logo Makers Pro Website.
                    </p>
                    <h2>100% Unique Design Guarantee</h2>
                    <p>
                      At The Logo Makers Pro we guarantee that all of our customers’ logos are made from scratch. This way you will have a logo that is tailor made for your requirements. We guarantee that your logo will be unique and impress your clientele
                    </p>
                    <h2>On-Hold Projects Clause</h2>
                    <p>
                      If the client fails to provide a response or communicate for a continuous period of 14 days, the project will be considered as on-hold and marked as closed. In the event that the client wishes to resume the project after it has been closed, a re-activation fee will be applicable.
                    </p>
                    <h2>Reactivation Fee</h2>
                    <p>
                      For WordPress projects, the re-activation fee will be $499, plus an additional charge based on the complexity of the project. For Shopify or Custom projects, the re-activation fee will be $999, plus an additional charge based on the complexity of the project.
                    </p>
                  </li>
                  <li>
                    complexity charge for both types of projects will be determined based on the specific requirements and intricacies involved.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
