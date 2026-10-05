// Kanit is self-hosted (no request to Google Fonts at runtime or build time).
import '@fontsource/kanit/300.css';
import '@fontsource/kanit/400.css';
import '@fontsource/kanit/500.css';
import '@fontsource/kanit/600.css';
import '@fontsource/kanit/700.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/vendor/bootstrap.min.css';
import '@/styles/vendor/meanmenu.min.css';
import '@/styles/vendor/theme.css';
import '@/styles/site.css';

import Analytics from '@/components/analytics/Analytics';
import SiteShell from '@/components/layout/SiteShell';
import { organizationSchema, site } from '@/data/site';

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  verification: { google: site.googleSiteVerification },
  icons: { icon: '/assets/imgs/logo/favicon.webp' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
