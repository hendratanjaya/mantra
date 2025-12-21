import { create } from "zustand";

export type QuizResult = {
  correct: number;
  total: number;
  accuracy: number; // 0-1
  hintsUsed: number;
  attempts: number;
  locked: boolean;
};

type LearningStore = {
  attempts: Record<string, QuizResult> | null;
  hint: number;
  setHint: (hint: number) => void;
  recordAttempt: (pathId: string, results: QuizResult) => void;
  resetPath: (pathId: string) => void;
  resetAll: () => void;
};

export const useLearningStore = create<LearningStore>((set) => ({
  attempts: null,
  hint: 0,
  setHint: (hint) => set({ hint }),
  recordAttempt: (pathId, results) =>
    set((state) => ({
      attempts: {
        ...state.attempts,
        [pathId]: results,
      },
    })),

  resetPath: (pathId) =>
    set((state) => {
      const updated = { ...state.attempts };
      delete updated[pathId];
      return { attempts: updated };
    }),

  resetAll: () => set({ attempts: null }),
}));
