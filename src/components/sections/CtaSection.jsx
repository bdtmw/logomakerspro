import MagneticButton from '@/components/ui/MagneticButton';

/** "Work with us" call-to-action band. action: 'quote' | 'chat' | 'link' */
export default function CtaSection({
  subtitle = 'Work with us',
  title = 'Kick start your digital transformation journey today!',
  label = 'Let’s talk!',
  action = 'chat',
  href,
  containerClass = 'container line pb-110 pt-80',
}) {
  return (
    <section className="cta__area">
      <div className={containerClass}>
        <div className="line-3" />
        <div className="row">
          <div className="col-xxl-12">
            <div className="cta__content">
              <p className="cta__sub-title">{subtitle}</p>
              <h2 className="cta__title">{title}</h2>
              <MagneticButton action={action} href={href}>
                {label} <i className="fa-solid fa-arrow-right" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
