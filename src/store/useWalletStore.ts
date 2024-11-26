import { create } from 'zustand';
import { Wallet } from '@/types';

interface WalletStore {
  wallets: Wallet[];
  activeWallet: string | null;
  setActiveWallet: (id: string) => void;
  addWallet: (wallet: Wallet) => void;
  removeWallet: (id: string) => void;
  updateWallet: (id: string, updates: Partial<Wallet>) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallets: [],
  activeWallet: null,
  setActiveWallet: (id) => set({ activeWallet: id }),
  addWallet: (wallet) => set((state) => ({ 
    wallets: [...state.wallets, wallet],
    activeWallet: state.activeWallet || wallet.id
  })),
  removeWallet: (id) => set((state) => ({
    wallets: state.wallets.filter((w) => w.id !== id),
    activeWallet: state.activeWallet === id ? 
      state.wallets.find((w) => w.id !== id)?.id || null : 
      state.activeWallet
  })),
  updateWallet: (id, updates) => set((state) => ({
    wallets: state.wallets.map((w) => 
      w.id === id ? { ...w, ...updates } : w
    )
  }))
}));