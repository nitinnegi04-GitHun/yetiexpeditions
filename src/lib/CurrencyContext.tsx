'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Currency = 'USD' | 'INR';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usd: number | null | undefined, inr: number | null | undefined) => string;
  hasBothPrices: (usd: number | null | undefined, inr: number | null | undefined) => boolean;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'USD',
  setCurrency: () => {},
  formatPrice: (usd) => usd ? `$${usd.toLocaleString('en-US')}` : '—',
  hasBothPrices: () => false,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    const stored = localStorage.getItem('yeti-currency') as Currency | null;
    if (stored === 'USD' || stored === 'INR') setCurrencyState(stored);
  }, []);

  function setCurrency(c: Currency) {
    setCurrencyState(c);
    localStorage.setItem('yeti-currency', c);
  }

  function formatPrice(usd: number | null | undefined, inr: number | null | undefined): string {
    const hasUSD = usd != null && usd > 0;
    const hasINR = inr != null && inr > 0;

    // Only one price stored — show it regardless of toggle
    if (hasUSD && !hasINR) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd!);
    }
    if (hasINR && !hasUSD) {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(inr!);
    }

    // Both prices stored — respect the toggle
    if (currency === 'INR' && hasINR) {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(inr!);
    }
    if (hasUSD) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd!);
    }
    return '—';
  }

  /** Returns true only when both USD and INR prices are available — used to conditionally show the toggle */
  function hasBothPrices(usd: number | null | undefined, inr: number | null | undefined): boolean {
    return (usd != null && usd > 0) && (inr != null && inr > 0);
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, hasBothPrices }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
