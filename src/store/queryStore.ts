import { create } from 'zustand';
import { QueryResponse } from '@/types/query.types';

type ThinkingStage = 'generating' | 'executing' | 'rendering' | null;

interface QueryState {
  currentQuestion: string;
  currentResult: QueryResponse | null;
  isLoading: boolean;
  thinkingStage: ThinkingStage;
  error: string | null;
  errorSql: string | null;

  setCurrentQuestion: (q: string) => void;
  setCurrentResult: (r: QueryResponse | null) => void;
  setLoading: (loading: boolean) => void;
  setThinkingStage: (stage: ThinkingStage) => void;
  setError: (err: string | null, sql?: string | null) => void;
  reset: () => void;
}

export const useQueryStore = create<QueryState>((set) => ({
  currentQuestion: '',
  currentResult: null,
  isLoading: false,
  thinkingStage: null,
  error: null,
  errorSql: null,

  setCurrentQuestion: (q) => set({ currentQuestion: q }),
  setCurrentResult: (r) => set({ currentResult: r }),
  setLoading: (loading) => set({ isLoading: loading }),
  setThinkingStage: (stage) => set({ thinkingStage: stage }),
  setError: (err, sql = null) => set({ error: err, errorSql: sql }),
  reset: () =>
    set({
      currentQuestion: '',
      currentResult: null,
      isLoading: false,
      thinkingStage: null,
      error: null,
      errorSql: null,
    }),
}));