'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { tracking } from '@/data/site';

// GA4 and Meta Pixel on every page (chat is the built-in AI assistant). reCAPTCHA v3 loads on demand from the forms (lib/recaptcha-client.js).
export default function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);

  // Client-side navigations: the pixel only fires PageView on full loads, so send it on route changes too.
  // (GA4 enhanced measurement already tracks history changes.)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (typeof window.fbq === 'function') window.fbq('track', 'PageView');
  }, [pathname]);

  return (
    <>
      {tracking.gaIds.length > 0 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${tracking.gaIds[0]}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
${tracking.gaIds.map((id) => `gtag('config', '${id}');`).join('\n')}`}
          </Script>
        </>
      )}

      {tracking.metaPixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${tracking.metaPixelId}');
fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${tracking.metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}
