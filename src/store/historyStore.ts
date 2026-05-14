import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QueryHistoryItem } from '@/types/query.types';

interface HistoryState {
  history: QueryHistoryItem[];
  addToHistory: (item: Omit<QueryHistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],

      addToHistory: (item) =>
        set((state) => ({
          history: [
            ...state.history,
            {
              ...item,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
          ].slice(-50), // Keep last 50 queries
        })),

      clearHistory: () => set({ history: [] }),

      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((h) => h.id !== id),
        })),
    }),
    {
      name: 'lendable-query-history',
    }
  )
);