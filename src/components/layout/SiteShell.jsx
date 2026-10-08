'use client';

import { usePathname } from 'next/navigation';
import { UIProvider } from '@/components/ui/UIContext';
import ChatWidget from '@/components/chat/ChatWidget';
import OfferPopup from '@/components/ui/OfferPopup';
import QuoteModal from '@/components/ui/QuoteModal';
import CustomCursor from './CustomCursor';
import Footer from './Footer';
import Header from './Header';
import Offcanvas from './Offcanvas';
import ScrollTop from './ScrollTop';
import SmoothScroll from './SmoothScroll';

// Same element order as the original theme so its CSS (fixed header, off-canvas, smoother) behaves identically.
export default function SiteShell({ children }) {
  // The CRM (/admin) has its own layout: no site header, footer, popups or chat.
  if (usePathname().startsWith('/admin')) return children;
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
      <OfferPopup />
      <ChatWidget />
    </UIProvider>
  );
}
