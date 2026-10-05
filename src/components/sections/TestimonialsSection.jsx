'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { testimonialImages, testimonials } from '@/data/testimonials';
import { gsap, useGSAP } from '@/lib/gsap';

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Floating client photos drift toward the pointer's quadrant.
  useGSAP(
    (ctx, contextSafe) => {
      const section = sectionRef.current;
      const imgs = section.querySelectorAll('.testimonial__images-3 img');
      const onMove = contextSafe((e) => {
        gsap.to(imgs, { x: e.clientX > window.innerWidth / 2 ? 15 : -15, duration: 5, ease: 'power4.out' });
        gsap.to(imgs, { y: e.clientY > window.innerHeight / 2 ? 15 : -15, duration: 5, ease: 'power4.out' });
      });
      section.addEventListener('mousemove', onMove);
      return () => section.removeEventListener('mousemove', onMove);
    },
    { scope: sectionRef },
  );

  return (
    <section className="testimonial__area-3" ref={sectionRef}>
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <Swiper
              className="testimonial__slider-3"
              modules={[Navigation]}
              loop
              speed={2000}
              slidesPerView={1}
              spaceBetween={0}
              onBeforeInit={(swiper) => {
                // Same wiring as the theme: the left-arrow button is "next".
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.params.navigation.prevEl = prevRef.current;
              }}
              navigation={{ nextEl: nextRef.current, prevEl: prevRef.current }}
            >
              {testimonials.map((t) => (
                <SwiperSlide className="testimonial__slide-3" key={t.name}>
                  <p>{t.quote}</p>
                  <h2 className="client__name-3">{t.name}</h2>
                  {t.role && <h3 className="client__role-3">{t.role}</h3>}
                </SwiperSlide>
              ))}
              <div className="next-button swipper-btn" ref={nextRef} role="button" tabIndex={0} aria-label="Next slide">
                <i className="fa-solid fa-arrow-left" />
              </div>
              <div className="prev-button swipper-btn" ref={prevRef} role="button" tabIndex={0} aria-label="Previous slide">
                <i className="fa-solid fa-arrow-right" />
              </div>
            </Swiper>
          </div>
        </div>
      </div>
      <div className="testimonial__images-3">
        {testimonialImages.map((img) => (
          <Image key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} className={img.className} />
        ))}
      </div>
    </section>
  );
}
