"use server";

import { AssistantContext, CourseMetadata } from "@/lib/openai/type";
import { CourseFormStateResponse } from "./type";
import {
  generateCodeFillBlankQuiz,
  generateCourseIntroduction,
  generateCourseMetadata,
  generatePathContent,
} from "@/lib/openai/generate-ai-respond";
import { prisma } from "@/utils/prisma";
import { cache } from "react";
import { logger } from "@/utils/logger";
import { CourseFormData } from "../_schemas/course";
import { UserException } from "@/lib/utils";
import { title } from "process";

//TO DO: create an adaptive course mechanic

export async function generateNewCourse(
  formData: CourseFormData,
  assistantContext: AssistantContext,
  userId: string
): Promise<CourseFormStateResponse> {
  try {
    const { content_option, programming_language, difficulty_preference } =
      formData;

    const metadata = await generateCourseMetadata(formData);
    const { course_metadata } = JSON.parse(metadata) as CourseMetadata;

    const [introduction, pathContent, pathQuiz] = await Promise.all([
      generateCourseIntroduction(formData, assistantContext),
      generatePathContent(
        {
          topic: content_option,
          programming_language,
          userPreferences: assistantContext,
        },
        course_metadata[0]
      ),
      generateCodeFillBlankQuiz(
        content_option,
        programming_language,
        course_metadata[0].key_concepts,
        difficulty_preference
      ),
    ]);

    console.log("is writing to DB");

    const newCourseContent = course_metadata.map((data, idx) => {
      const newCourseContent = {
        title: data.title,
        order: data.order,
        content: "",
        quiz: "",
        metadata: JSON.stringify(course_metadata[idx]),
      };
      if (idx === 0) {
        newCourseContent.content = pathContent;
        newCourseContent.quiz = pathQuiz;
      }

      return newCourseContent;
    });

    const newCourse = await prisma.course.create({
      data: {
        title: content_option,
        topic: programming_language,
        type: "course",
        summary: "",
        user_id: userId,
        content: {
          createMany: {
            data: [
              {
                title: "Introduction",
                order: 0,
                content: introduction,
                metadata: JSON.stringify(course_metadata[0]),
              },
              ...newCourseContent,
            ],
          },
        },
      },
    });

    return { error: false, message: null, field: newCourse.id };
  } catch (error) {
    logger.error("Error while generating new course");
    logger.error(error);

    let message = "Internal server error";
    if (error instanceof UserException) message = error.message;

    return { error: true, message, field: null };
  }
}
