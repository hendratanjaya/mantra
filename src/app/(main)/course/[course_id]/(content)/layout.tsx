"use server";
import { ReactNode } from "react";
import { CourseContentSidebar } from "./_components/course-content-sidebar";

export default async function CourseContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-4">
      <div className="col-span-1 md:col-span-3 overflow-y-auto rounded-l-xl border custom-scrollbar">
        {children}
      </div>
      <div className="col-span-1 overflow-y-auto flex flex-col border rounded-r-xl">
        <CourseContentSidebar />
      </div>
    </div>
  );
}
