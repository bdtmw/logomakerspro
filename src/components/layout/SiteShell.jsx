'use client';

import { UIProvider } from '@/components/ui/UIContext';
import QuoteModal from '@/components/ui/QuoteModal';
import CustomCursor from './CustomCursor';
import Footer from './Footer';
import Header from './Header';
import Offcanvas from './Offcanvas';
import ScrollTop from './ScrollTop';
import SmoothScroll from './SmoothScroll';

// Same element order as the original theme so its CSS (fixed header, off-canvas, smoother) behaves identically.
export default function SiteShell({ children }) {
  return (
    <UIProvider>
      <CustomCursor />
      <div className="has-smooth" id="has_smooth" />
      <ScrollTop />
      <Header />
      <Offcanvas />
      <SmoothScroll>
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
      <QuoteModal />
    </UIProvider>
  );
}
