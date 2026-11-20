// Update in store/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HistoryEntry, UserPreferences } from '../types';

interface Store {
  currentVerse: string | null;
  currentLyrics: string | null;
  history: HistoryEntry[];
  preferences: UserPreferences;
  setCurrentVerse: (verse: string) => void;
  setCurrentLyrics: (lyrics: string) => void;
  addToHistory: (entry: HistoryEntry) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      currentVerse: null,
      currentLyrics: null,
      history: [],
      preferences: {
        theme: 'light',
        notificationTime: '22:00',
        notifications: true,
        holyricsServerIp: '10.0.11.150', // New field
        holyricsServerPort: '8091', // Default port
        holyricsToken: 'lbwXysQMQmUqic9v'
      },
      setCurrentVerse: (verse) => set({ currentVerse: verse }),
      setCurrentLyrics: (lyrics) => set({ currentLyrics: lyrics }),
      addToHistory: (entry) =>
        set((state) => ({ history: [...state.history, entry] })),
      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),
    }),
    {
      name: 'holirics-storage',
    }
  )
);