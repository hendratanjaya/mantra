"use server";

import { cache, ReactNode } from "react";
import { CourseContentProvider } from "./_providers/course-content-provider";
import { prisma } from "@/utils/prisma";
import { ChatHistoryProvider } from "./_providers/chat-history-provider";

const getCourseContent = cache(async (courseId: string) => {
  console.log("Fetching content list from db.. ");
  const courseContent = await prisma.courseContent.findMany({
    where: { course_id: courseId },
    orderBy: { order: "asc" },
  });
  return courseContent;
});
const getChatHistory = cache(async (courseId: string) => {
  console.log("Fetching chat history..");
  const chatHistory = await prisma.chat.findMany({
    where: { course_id: courseId },
    select: { sender: true, message: true },
    orderBy: { created_at: "asc" },
  });

  return chatHistory;
});

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ course_id: string }>;
}) {
  const { course_id } = await params;
  const [courseContent, chatHistory] = await Promise.all([
    getCourseContent(course_id),
    getChatHistory(course_id),
  ]);

  return (
    <CourseContentProvider courseContentList={courseContent}>
      <ChatHistoryProvider chatHistory={chatHistory}>
        {children}
      </ChatHistoryProvider>
    </CourseContentProvider>
  );
}
