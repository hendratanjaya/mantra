"use server";
import { cache } from "react";
import { SummaryContentSidebar } from "./_components/summary-content-sidebar";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { SummaryContent } from "./_components/summary-content";
import { SummaryContentProvider } from "../_providers/summary-content-provider";

const getCourseSummaryById = cache(async (summaryId: string) => {
  const course = await prisma.course.findFirst({
    where: {
      id: summaryId,
      type: "summary",
    },
  });

  return course;
});

export default async function CourseContentLayout({
  params,
}: {
  params: Promise<{ summary_id: string }>;
}) {
  const { summary_id } = await params;
  const course = await getCourseSummaryById(summary_id);
  if (!course) redirect("/summarize");

  return (
    <SummaryContentProvider course={course}>
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-3 overflow-y-auto rounded-l-xl border custom-scrollbar">
          <SummaryContent summaryContent={course.summary} />
        </div>
        <div className="col-span-1 overflow-y-auto flex flex-col border rounded-r-xl">
          <SummaryContentSidebar course={course} />
        </div>
      </div>
    </SummaryContentProvider>
  );
}
