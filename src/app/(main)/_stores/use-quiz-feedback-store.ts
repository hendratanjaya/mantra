import { create } from "zustand";

type quizFeedBackSchema = {
  feedbackRequest: string;
  setQuizFeedbackRequest: (request: string) => void;
};

export const useQuizFeeadbackStore = create<quizFeedBackSchema>((set) => ({
  feedbackRequest: "",
  setQuizFeedbackRequest: (request: string) =>
    set({ feedbackRequest: request }),
}));
