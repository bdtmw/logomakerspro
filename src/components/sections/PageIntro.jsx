/** Title + blurb band at the top of the packages and portfolio pages. */
export default function PageIntro({ title, text, titleCols = 'col-xxl-8 col-xl-7 col-lg-6 col-md-6', textCols = 'col-xxl-4 col-xl-5 col-lg-6 col-md-6' }) {
  return (
    <section className="pt-150 pb-130 portfolio-v2">
      <div className="container">
        <div className="row">
          <div className={titleCols}>
            <div className="sec-title-wrapper">
              <h2 className="sec-title-2">{title}</h2>
            </div>
          </div>
          <div className={textCols}>
            <div className="blog__text">
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
