"use client";

import { createContext, ReactNode } from "react";

export const QuizIdContext = createContext<string>("");

export function QuizIdProvider({
  children,
  quizId,
}: {
  children: ReactNode;
  quizId: string;
}) {
  return (
    <QuizIdContext.Provider value={quizId}>{children}</QuizIdContext.Provider>
  );
}
