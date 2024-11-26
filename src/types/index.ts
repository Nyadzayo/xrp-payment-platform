export type Currency = 'XRP' | 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'convert';
  amount: number;
  currency: Currency;
  destinationAmount?: number;
  destinationCurrency?: Currency;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  recipient?: string;
  sender?: string;
  fee: number;
  memo?: string;
}

export interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: number;
  currency: Currency;
  isDefault: boolean;
}

export interface ExchangeRate {
  from: Currency;
  to: Currency;
  rate: number;
  timestamp: string;
}

export interface UserPreferences {
  defaultCurrency: Currency;
  defaultWallet: string;
  notifications: {
    email: boolean;
    push: boolean;
    transactions: boolean;
  };
  theme: 'light' | 'dark';
  language: string;
}