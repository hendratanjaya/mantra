"use server";
import { cache, ReactNode } from "react";
import { prisma } from "@/utils/prisma";
import { QuizQuestionProvider } from "../_providers/quiz-question-provider";
import { ChatHistoryProvider } from "../../_providers/chat-history-provider";
import { logger } from "@/utils/logger";
import { redirect } from "next/navigation";
const getQuiz = cache(async (quizId: string) => {
  console.log("Fetching quiz list from db.. ");

  try {
    const courseContent = await prisma.quiz.findFirst({
      where: { id: quizId },
      select: {
        metadata: true,
        quiz_question: {
          select: { id: true, question: true, answer: true, answer_list: true },
        },
      },
    });
    return courseContent;
  } catch (error) {
    logger.error("Failed to fetch quizzes");
    logger.error(error);
    return null;
  }
});
const getChatHistory = cache(async (quizId: string) => {
  console.log("Fetching chat history for course...");
  try {
    const chatHistory = await prisma.chat.findMany({
      where: { quiz_id: quizId },
      select: { sender: true, message: true },
      orderBy: { created_at: "asc" },
    });
    return chatHistory;
  } catch (error) {
    logger.error("Failed to fetch quiz chat");
    logger.error(error);
    return [];
  }
});
export default async function QuizLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ quiz_id: string }>;
}) {
  const { quiz_id } = await params;
  // if (!quiz_id) {
  //   //redirect back to /quiz
  //   return;
  // }
  const [quiz, chatHistory] = await Promise.all([
    getQuiz(quiz_id),
    getChatHistory(quiz_id),
  ]);
  if (!quiz) {
    redirect("/home");
    return;
  }
  const quizData = {
    metadata: quiz.metadata,
    quizQuestion: quiz.quiz_question,
  };
  //   metadata: JSON.stringify({
  //     order: 1,
  //     title: "Java Fundamentals: Introduction and Setup",
  //     description:
  //       "Learn the basics of Java programming, including its history, features, and development kit components.",
  //     key_concepts: [
  //       "Java programming language",
  //       "Java Development Kit (JDK)",
  //       "Java Runtime Environment (JRE)",
  //     ],
  //     learning_objective:
  //       "Understand the basics of the Java programming language and its ecosystem.",
  //     estimated_duration: 2,
  //     difficulty: "beginner",
  //   }),
  //   quizQuestion: [
  //     {
  //       id: "1",
  //       question:
  //         "What is the primary purpose of the Java Development Kit (JDK) in the Java ecosystem?",
  //       answer: "A",
  //       answer_list: JSON.stringify([
  //         "A. To provide a set of development tools for Java, including the compiler and debugger",
  //         "B. To provide a runtime environment for executing Java programs",
  //         "C. To provide a set of libraries and frameworks for building Java applications",
  //         "D. To provide a text editor for writing Java code",
  //       ]),
  //     },
  //     {
  //       id: "2",
  //       question:
  //         "Which of the following is a key feature of the Java programming language?",
  //       answer: "C",
  //       answer_list: JSON.stringify([
  //         "A. Support for multiple inheritance",
  //         "B. Lack of memory management",
  //         "C. Platform independence, allowing Java code to run on any device that has a Java Virtual Machine (JVM) installed",
  //         "D. Limited support for object-oriented programming",
  //       ]),
  //     },
  //     {
  //       id: "3",
  //       question: "What is the Java Runtime Environment (JRE) responsible for?",
  //       answer: "B",
  //       answer_list: JSON.stringify([
  //         "A. Compiling Java source code into bytecode",
  //         "B. Providing the libraries and frameworks necessary to run Java programs, including the Java Virtual Machine (JVM)",
  //         "C. Providing a set of development tools, including the compiler and debugger",
  //         "D. Providing a text editor for writing Java code",
  //       ]),
  //     },
  //     {
  //       id: "4",
  //       question:
  //         "Which component is included in the Java Development Kit (JDK) but not in the Java Runtime Environment (JRE)?",
  //       answer: "A",
  //       answer_list: JSON.stringify([
  //         "A. The Java compiler, which is used to compile Java source code into bytecode",
  //         "B. The Java Virtual Machine (JVM), which is used to run Java programs",
  //         "C. The Java libraries, which provide a set of pre-built functions and classes for Java developers",
  //         "D. The Java debugger, which is used to debug Java programs but is not included in the JDK",
  //       ]),
  //     },
  //     {
  //       id: "5",
  //       question:
  //         "What is the relationship between the Java Development Kit (JDK) and the Java Runtime Environment (JRE)?",
  //       answer: "C",
  //       answer_list: JSON.stringify([
  //         "A. The JDK is a subset of the JRE, providing only the necessary tools for running Java programs",
  //         "B. The JRE is a subset of the JDK, providing only the necessary libraries and frameworks for building Java applications",
  //         "C. The JDK is a superset of the JRE, providing all the tools and libraries necessary for developing, debugging, and running Java programs",
  //         "D. The JDK and JRE are separate and unrelated components, each serving a distinct purpose in the Java ecosystem",
  //       ]),
  //     },
  //   ],
  // };
  // const chatHistory: { sender: string; message: string }[] = [];
  return (
    <QuizQuestionProvider quiz={quizData!}>
      <ChatHistoryProvider chatHistory={chatHistory}>
        {children}
      </ChatHistoryProvider>
    </QuizQuestionProvider>
  );
}
