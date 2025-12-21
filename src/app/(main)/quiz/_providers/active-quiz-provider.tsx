"use client";

import { createContext, ReactNode, RefObject, useRef } from "react";

export const ActiveQuestionContext = createContext<RefObject<string> | null>(
  null
);

//context to track active question that being seen by user (at least thats what i have in mind)
export function ActiveQuestionProvider({ children }: { children: ReactNode }) {
  const activeQuestionRef = useRef<string>("");
  return (
    <ActiveQuestionContext.Provider value={activeQuestionRef}>
      {children}
    </ActiveQuestionContext.Provider>
  );
}
