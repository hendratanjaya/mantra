"use client";

import { CourseContent } from "@/generated/prisma";
import { createContext, ReactNode, useState } from "react";

type CourseContentContextType = {
  contentList: CourseContent[];
  setContentList: React.Dispatch<React.SetStateAction<CourseContent[]>>;
};
export const CourseContentContext =
  createContext<CourseContentContextType | null>(null);

export function CourseContentProvider({
  children,
  courseContentList,
}: {
  children: ReactNode;
  courseContentList: CourseContent[];
}) {
  const [contentList, setContentList] =
    useState<CourseContent[]>(courseContentList);

  return (
    <CourseContentContext.Provider value={{ contentList, setContentList }}>
      {children}
    </CourseContentContext.Provider>
  );
}
