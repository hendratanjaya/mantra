"use client";

import { QuizQuestion } from "@/generated/prisma";
import { createContext, ReactNode } from "react";

export const QuizQuestionContext = createContext<{
  quizQuestion: Pick<
    QuizQuestion,
    "id" | "question" | "answer" | "answer_list"
  >[];
  metadata: string;
} | null>(null);
export function QuizQuestionProvider({
  children,
  quiz,
}: {
  children: ReactNode;
  quiz: {
    quizQuestion: Pick<
      QuizQuestion,
      "id" | "question" | "answer" | "answer_list"
    >[];
    metadata: string;
  } | null;
}) {
  return (
    <QuizQuestionContext.Provider value={quiz}>
      {children}
    </QuizQuestionContext.Provider>
  );
}
