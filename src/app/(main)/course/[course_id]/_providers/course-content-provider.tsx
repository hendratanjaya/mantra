"use client";

import { CourseContent } from "@/generated/prisma";
import { createContext, ReactNode } from "react";

export const CourseContentContext = createContext<CourseContent[]>([]);
export function CourseContentProvider({
  children,
  courseContentList,
}: {
  children: ReactNode;
  courseContentList: CourseContent[];
}) {
  return (
    <CourseContentContext.Provider value={courseContentList}>
      {children}
    </CourseContentContext.Provider>
  );
}
