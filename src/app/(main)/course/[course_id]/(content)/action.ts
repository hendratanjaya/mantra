"use server";

import { generateQuizQuestion } from "@/lib/openai/generate-ai-respond";
import { QuizContext, QuizQuestions } from "@/lib/openai/type";
import { logger } from "@/utils/logger";
import { prisma } from "@/utils/prisma";
import { GenerateQuizResponse } from "../../type";

export async function proceedToQuizAction(
  contentId: string,
  userId: string,
  contentMetadata: string,
  language: string,
  mode: "search" | "create"
): Promise<GenerateQuizResponse> {
  console.log(`is ${mode}-ing quiz...`);

  if (mode === "search") {
    const quizData = await getQuizByContentId(contentId);
    return quizData;
  }

  if (mode === "create") {
    const quizData = await generateNewQuiz(
      contentId,
      userId,
      contentMetadata,
      language
    );

    return quizData;
  }

  return { quiz: null, error: true, message: "Oops, something went wrong" };
}

async function getQuizByContentId(
  contentId: string
): Promise<GenerateQuizResponse> {
  try {
    // return { quiz: null, error: true, errorState: "fillin your butt" };

    const quiz = await prisma.quiz.findFirst({
      where: { course_content_id: contentId },
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
  contentId: string,
  userId: string,
  metadata: string,
  language: string
): Promise<GenerateQuizResponse> {
  try {
    console.log("is generating...");
    const context: QuizContext = { content_metadata: metadata, language };
    const quizQuestions = await generateQuizQuestion(context);

    console.dir(quizQuestions, { depth: null });

    const parsedQuizQuestions = JSON.parse(quizQuestions) as QuizQuestions;

    const { quiz_questions: questionLists } = parsedQuizQuestions;
    if (!questionLists || questionLists.length === 0) {
      console.log(quizQuestions);
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
        course_content_id: contentId,
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


