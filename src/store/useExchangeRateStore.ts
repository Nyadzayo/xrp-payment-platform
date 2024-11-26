import { create } from 'zustand';
import { Currency, ExchangeRate } from '@/types';

interface ExchangeRateStore {
  rates: ExchangeRate[];
  updateRates: (rates: ExchangeRate[]) => void;
  getRate: (from: Currency, to: Currency) => number | null;
  convertAmount: (amount: number, from: Currency, to: Currency) => number | null;
}

export const useExchangeRateStore = create<ExchangeRateStore>((set, get) => ({
  rates: [],
  updateRates: (rates) => set({ rates }),
  getRate: (from, to) => {
    const rate = get().rates.find((r) => r.from === from && r.to === to);
    return rate?.rate || null;
  },
  convertAmount: (amount, from, to) => {
    const rate = get().getRate(from, to);
    return rate ? amount * rate : null;
  }
}));