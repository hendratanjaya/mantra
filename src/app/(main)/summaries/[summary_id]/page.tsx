"use server";
import { cache } from "react";
import { SummaryContentSidebar } from "./_components/summary-content-sidebar";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { SummaryContent } from "./_components/summary-content";
import { SummaryContentProvider } from "../_providers/summary-content-provider";
import { logger } from "@/utils/logger";
import { ChatHistoryProvider } from "../../_providers/chat-history-provider";
import { MobileTabContent } from "../../_components/mobile-tab-content";

const getCourseSummaryById = cache(async (summaryId: string) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        id: summaryId,
        type: "summary",
      },
    });

    return course;
  } catch (error) {
    logger.error("Failed to fetch summary by id");
    logger.error(error);
    return null;
  }
});

const getChatHistory = cache(async (summaryId: string) => {
  try {
    const chatHistory = await prisma.chat.findMany({
      where: { course_id: summaryId },
      select: { sender: true, message: true },
      orderBy: { created_at: "asc" },
    });
    return chatHistory;
  } catch (error) {
    logger.error("Failed to fetch all course");
    logger.error(error);
    return [];
  }
});

export default async function CourseContentLayout({
  params,
}: {
  params: Promise<{ summary_id: string }>;
}) {
  const { summary_id } = await params;
  const [course, chatHistory] = await Promise.all([
    getCourseSummaryById(summary_id),
    getChatHistory(summary_id),
  ]);
  if (!course) redirect("/summaries");

  return (
    <ChatHistoryProvider chatHistory={chatHistory}>
      <SummaryContentProvider course={course}>
        {/* <div className="h-full w-full grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 md:col-span-3 overflow-y-auto rounded-l-xl border custom-scrollbar">
            <SummaryContent summaryContent={course.summary} />
          </div>
          <div className="col-span-1 overflow-y-auto flex flex-col border rounded-r-xl">
            <SummaryContentSidebar course={course} />
          </div>
        </div> */}

        <div className="h-full w-full">
          <div className="hidden md:grid md:grid-cols-4 h-full">
            <div className="md:col-span-3 overflow-y-auto border">
              <SummaryContent summaryContent={course.summary} />
            </div>

            <div className="md:col-span-1 overflow-y-auto border">
              <SummaryContentSidebar course={course} />
            </div>
          </div>
          <MobileTabContent
            content={<SummaryContent summaryContent={course.summary} />}
            sidebar={<SummaryContentSidebar course={course} />}
          />
        </div>
      </SummaryContentProvider>
    </ChatHistoryProvider>
  );
}
