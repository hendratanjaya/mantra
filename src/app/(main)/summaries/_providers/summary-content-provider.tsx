"use client";

import { Course } from "@/generated/prisma";
import { createContext, ReactNode } from "react";

export const SummaryContentContext = createContext<Course | null>(null);
export function SummaryContentProvider({
  children,
  course,
}: {
  children: ReactNode;
  course: Course;
}) {
  return (
    <SummaryContentContext.Provider value={course}>
      {children}
    </SummaryContentContext.Provider>
  );
}
