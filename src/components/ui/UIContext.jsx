'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { openLiveChat } from '@/lib/chat';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  const openQuote = useCallback(() => setQuoteOpen(true), []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);
  // "Let's talk" buttons: open the live chat, fall back to the quote form if chat hasn't loaded.
  const openChat = useCallback(() => {
    if (!openLiveChat()) setQuoteOpen(true);
  }, []);

  const value = useMemo(
    () => ({ quoteOpen, openQuote, closeQuote, openChat, offcanvasOpen, setOffcanvasOpen }),
    [quoteOpen, openQuote, closeQuote, openChat, offcanvasOpen],
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>');
  return ctx;
}
