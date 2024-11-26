import { useAuthStore } from './useAuthStore';
import { useWalletStore } from './useWalletStore';
import { useTransactionStore } from './useTransactionStore';
import { useExchangeRateStore } from './useExchangeRateStore';
import { Transaction, Wallet, ExchangeRate } from '@/types';

const sampleWallets: Wallet[] = [
  {
    id: 'wallet-1',
    name: 'Main Wallet',
    address: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
    balance: 1500.50,
    currency: 'XRP',
    isDefault: true
  },
  {
    id: 'wallet-2',
    name: 'USD Wallet',
    address: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
    balance: 5000.00,
    currency: 'USD',
    isDefault: false
  },
  {
    id: 'wallet-3',
    name: 'EUR Wallet',
    address: 'rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM',
    balance: 3500.00,
    currency: 'EUR',
    isDefault: false
  }
];

const sampleTransactions: Transaction[] = [
  {
    id: 'tx-1',
    type: 'receive',
    amount: 500.00,
    currency: 'XRP',
    status: 'completed',
    timestamp: '2024-02-15T10:30:00Z',
    sender: 'rGFuMiw48HdbnrUbkRYuitXTmfrDBNTCnX',
    recipient: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
    fee: 0.000012,
    memo: 'Payment for services'
  },
  {
    id: 'tx-2',
    type: 'send',
    amount: 100.00,
    currency: 'XRP',
    status: 'completed',
    timestamp: '2024-02-14T15:45:00Z',
    sender: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
    recipient: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
    fee: 0.000012,
    memo: 'Monthly rent'
  },
  {
    id: 'tx-3',
    type: 'convert',
    amount: 1000.00,
    currency: 'XRP',
    destinationAmount: 550.00,
    destinationCurrency: 'USD',
    status: 'completed',
    timestamp: '2024-02-13T09:15:00Z',
    fee: 0.000015,
    memo: 'Currency conversion'
  },
  {
    id: 'tx-4',
    type: 'receive',
    amount: 2500.00,
    currency: 'EUR',
    status: 'pending',
    timestamp: '2024-02-16T11:20:00Z',
    sender: 'rGFuMiw48HdbnrUbkRYuitXTmfrDBNTCnX',
    recipient: 'rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM',
    fee: 0.000012,
    memo: 'International transfer'
  }
];

const sampleRates: ExchangeRate[] = [
  {
    from: 'XRP',
    to: 'USD',
    rate: 0.55,
    timestamp: new Date().toISOString()
  },
  {
    from: 'XRP',
    to: 'EUR',
    rate: 0.51,
    timestamp: new Date().toISOString()
  },
  {
    from: 'USD',
    to: 'XRP',
    rate: 1.82,
    timestamp: new Date().toISOString()
  },
  {
    from: 'EUR',
    to: 'XRP',
    rate: 1.96,
    timestamp: new Date().toISOString()
  }
];

export function initializeStores() {
  // Initialize auth store with admin user
  useAuthStore.getState().login({
    id: 'admin-1',
    email: 'kelvin.nyadzayo16@gmail.com'
  });

  // Initialize wallets
  const walletStore = useWalletStore.getState();
  sampleWallets.forEach(wallet => {
    walletStore.addWallet(wallet);
  });
  walletStore.setActiveWallet('wallet-1');

  // Initialize transactions
  const transactionStore = useTransactionStore.getState();
  sampleTransactions.forEach(transaction => {
    transactionStore.addTransaction(transaction);
  });

  // Initialize exchange rates
  useExchangeRateStore.getState().updateRates(sampleRates);
}