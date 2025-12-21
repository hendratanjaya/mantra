"use server";

import { cache, ReactNode } from "react";
import { CourseContentProvider } from "./_providers/course-content-provider";
import { prisma } from "@/utils/prisma";
import { ChatHistoryProvider } from "../../_providers/chat-history-provider";
import { QuizIdProvider } from "./_providers/quiz-providers";
import { logger } from "@/utils/logger";

const getCourseContent = cache(async (courseId: string) => {
  console.log("Fetching content list from db.. ");
  try {
    const courseContent = await prisma.courseContent.findMany({
      where: { course_id: courseId },
      orderBy: { order: "asc" },
    });
    return courseContent;
  } catch (error) {
    logger.error("Failed to fetch course content");
    logger.error(error);
    return [];
  }
});
const getChatHistory = cache(async (courseId: string) => {
  console.log("Fetching chat history for course...");
  try {
    const chatHistory = await prisma.chat.findMany({
      where: { course_id: courseId },
      select: { sender: true, message: true },
      orderBy: { created_at: "asc" },
    });

    return chatHistory;
  } catch (error) {
    logger.error("Failed to fetch chat history");
    logger.error(error);
    return [];
  }
});

const getQuizId = cache(async (courseId: string) => {
  console.log("Searching for quiz");
  try {
    const quiz = await prisma.quiz.findFirst({
      where: { course_id: courseId },
      select: { id: true },
    });

    return quiz?.id || "";
  } catch (error) {
    logger.error("Failed to fetch quiz");
    logger.error(error);
    return "";
  }
});

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ course_id: string }>;
}) {
  const { course_id } = await params;
  const [courseContent, chatHistory, quizId] = await Promise.all([
    getCourseContent(course_id),
    getChatHistory(course_id),
    getQuizId(course_id),
  ]);

  return (
    <CourseContentProvider courseContentList={courseContent}>
      <QuizIdProvider quizId={quizId}>
        <ChatHistoryProvider chatHistory={chatHistory}>
          {children}
        </ChatHistoryProvider>
      </QuizIdProvider>
    </CourseContentProvider>
  );
}
