import { create } from 'zustand';
import { Transaction } from '@/types';

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  getTransactionsByWallet: (walletId: string) => Transaction[];
  filterTransactions: (filters: Partial<Transaction>) => Transaction[];
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  })),
  updateTransaction: (id, updates) => set((state) => ({
    transactions: state.transactions.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    )
  })),
  getTransactionsByWallet: (walletId) => {
    return get().transactions.filter((t) =>
      t.sender === walletId || t.recipient === walletId
    );
  },
  filterTransactions: (filters) => {
    return get().transactions.filter((t) =>
      Object.entries(filters).every(([key, value]) =>
        t[key as keyof Transaction] === value
      )
    );
  }
}));