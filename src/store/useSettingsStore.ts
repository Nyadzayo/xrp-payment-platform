import { create } from 'zustand';
import { Currency, UserPreferences } from '@/types';

interface SettingsStore {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  defaultCurrency: 'USD',
  defaultWallet: '',
  notifications: {
    email: true,
    push: true,
    transactions: true,
  },
  theme: 'light',
  language: 'en',
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  preferences: defaultPreferences,
  updatePreferences: (updates) => set((state) => ({
    preferences: { ...state.preferences, ...updates }
  }))
}));