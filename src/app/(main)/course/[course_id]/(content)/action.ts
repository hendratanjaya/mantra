"use server";

import {
  generateCodeFillBlankQuiz,
  generatePathContent,
  generateQuizQuestion,
  generateRemedialIntervention,
} from "@/lib/openai/generate-ai-respond";
import {
  AssistantContext,
  Metadata,
  QuizContext,
  QuizQuestions,
} from "@/lib/openai/type";
import { logger } from "@/utils/logger";
import { prisma } from "@/utils/prisma";
import { GenerateQuizResponse, StateResponse } from "../../type";
import { QuizResult } from "../../_stores/use-learning-store";
import { UserException } from "@/lib/utils";
import { error } from "console";

export async function getRemedialIntervention(
  courseMetadata: Metadata,
  performance: QuizResult,
  assistantContext: AssistantContext
): Promise<StateResponse> {
  try {
    const remedialInterventionContent = await generateRemedialIntervention(
      courseMetadata,
      performance,
      assistantContext
    );

    if (!remedialInterventionContent)
      throw new Error("Remedial intervention is empty");

    return { error: false, message: remedialInterventionContent };
  } catch (error) {
    let errorMessage = "Internal server error";
    if (error instanceof UserException) errorMessage = error.message;

    logger.error("Failed to generate remedial intervention");
    logger.error(error);
    return { error: true, message: errorMessage };
  }
}

export async function generateNextPath(
  assistantContext: AssistantContext,
  metadata: Metadata,
  courseId: string,
  courseContentId: string,
  difficulty: "intermediate" | "beginner" | "advanced"
) {
  console.log("Server function started"); // ← Add this
  try {
    const course = await prisma.course.findFirst({
      where: { id: courseId },
      select: { topic: true, title: true },
    });

    if (!course) throw new UserException("Course not found", 400);
    const context = {
      topic: course.title,
      programming_language: course.topic,
      userPreferences: assistantContext,
    };

    console.log("is generating new path content");

    console.log({ course });
    const [newPathContent, newPathQuiz] = await Promise.all([
      generatePathContent(context, metadata),
      generateCodeFillBlankQuiz(
        course.title,
        course.topic,
        metadata.key_concepts,
        difficulty
      ),
    ]);

    console.log("is updating to db");
    await prisma.courseContent.update({
      where: { id: courseContentId },
      data: {
        content: newPathContent,
        quiz: newPathQuiz,
      },
    });

    if (!newPathContent || !newPathQuiz)
      throw new Error("Failed to generate new path content");

    return {
      error: false,
      message: "",
      newPathContent,
      newPathQuiz,
    };
  } catch (error) {
    let errorMessage = "Internal server error";
    if (error instanceof UserException) errorMessage = error.message;

    logger.error("Failed to generate remedial intervention");
    logger.error(error);
    return { error: true, message: errorMessage };
  }
}
export async function proceedToQuizAction(
  courseId: string,
  userId: string,
  contentMetadata: string,
  language: string,
  mode: "search" | "create"
): Promise<GenerateQuizResponse> {
  console.log(`is ${mode}-ing quiz...`);

  if (mode === "search") {
    const quizData = await getQuizByContentId(courseId);
    return quizData;
  }

  if (mode === "create") {
    const quizData = await generateNewQuiz(
      courseId,
      userId,
      contentMetadata,
      language
    );

    return quizData;
  }

  return { quiz: null, error: true, message: "Oops, something went wrong" };
}

async function getQuizByContentId(
  courseId: string
): Promise<GenerateQuizResponse> {
  try {
    // return { quiz: null, error: true, errorState: "fillin your butt" };

    const quiz = await prisma.quiz.findFirst({
      where: { course_id: courseId },
      select: { id: true },
    });

    return { quiz: quiz?.id || null, error: false, message: "" };
  } catch (error) {
    logger.error("Failed to get quiz by course content Id");
    logger.error(error);

    return { quiz: null, error: true, message: "searching quiz" };
  }
}

async function generateNewQuiz(
  courseId: string,
  userId: string,
  metadata: string,
  language: string
): Promise<GenerateQuizResponse> {
  try {
    console.log("is generating...");
    const context: QuizContext = { content_metadata: metadata, language };
    const quizQuestions = await generateQuizQuestion(context, 10);

    const parsedQuizQuestions = JSON.parse(quizQuestions) as QuizQuestions;

    const { quiz_questions: questionLists } = parsedQuizQuestions;
    if (!questionLists || questionLists.length === 0) {
      throw new Error(
        "Error parsing questions, unexpected format, quiz_questions not exist or empty"
      );
    }

    const newQuestions = questionLists.map((list) => {
      return {
        question: list.question,
        answer: list.answer,
        answer_list: JSON.stringify(list.answer_list),
      };
    });

    console.log("saving to db...");
    const newQuiz = await prisma.quiz.create({
      data: {
        metadata,
        user_id: userId,
        course_id: courseId,
        quiz_question: {
          create: newQuestions,
        },
      },
    });

    return { quiz: newQuiz.id, error: false, message: "QUIZ CREATEDDDDD" };
  } catch (erorr) {
    logger.error("Error generating quiz");
    logger.error(erorr);

    return { quiz: null, error: true, message: "creating quiz" };
  }
}
