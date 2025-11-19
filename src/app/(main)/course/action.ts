"use server";

import {
  AssistantContext,
  ChatContext,
  ChatHistory,
  CourseMetadata,
} from "@/lib/openai/type";
import {
  CourseFormStateResponse,
  MessageStateResponse,
  StateResponse,
} from "./type";
import {
  generateAIRespondForCouseChat,
  generateAIRespondForRegularChat,
  generateCourseMetadata,
  generatePathContent,
  summmarizeFile,
} from "@/lib/openai/generate-ai-respond";
import { prisma } from "@/utils/prisma";
import { cache } from "react";
import { logger } from "@/utils/logger";
import { CourseFormData } from "../_schemas/course";
import { file, success } from "zod";
import { fa } from "zod/v4/locales";
import { CourseContent } from "@/generated/prisma";

export async function sendMessageToAI(
  _: MessageStateResponse | null,
  formData: FormData,
  context: ChatContext,
  assistantContext: AssistantContext,
  mode: "regular" | "course" | "quiz"
): Promise<MessageStateResponse> {
  try {
    const message = formData.get("message");
    const userId = formData.get("user_id");
    const courseId = formData.get("course_id");
    const quizId = formData.get("quiz_id");
    if (!message || !message.toString().trim())
      return { error: false, message: "" }; // return nothing

    const question = message.toString();

    console.log({ courseId });

    // return { error: false, message: "" }; // return nothing
    const generateRespond = () => {
      switch (mode) {
        case "regular":
          return generateAIRespondForRegularChat(
            question,
            assistantContext,
            context
          );
        case "course":
          return generateAIRespondForCouseChat(
            question,
            assistantContext,
            context
          );
        case "quiz":
          return "";
      }
    };

    const opts: { course_id: string | undefined; quiz_id: string | undefined } =
      {
        course_id: undefined,
        quiz_id: undefined,
      };

    if (mode === "course" && courseId) opts.course_id = courseId.toString();
    if (mode === "quiz" && quizId) opts.quiz_id = quizId.toString();

    const [, respond] = await Promise.all([
      saveMessageToDB(question, userId!.toString(), mode, "user", opts),
      await generateRespond(),
    ]);

    const cleanedContent = respond
      ?.replace(/<｜begin▁of▁sentence｜>/g, "")
      .replace(/<｜end▁of▁sentence｜>/g, "")
      .replace(/<｜[^｜]*｜>/g, "");

    if (!cleanedContent) throw new Error("Response from AI is empty");

    await saveMessageToDB(
      cleanedContent,
      userId!.toString(),
      mode,
      "bot",
      opts
    );

    return { error: false, message: cleanedContent, isNewMessage: true };
  } catch (error) {
    logger.error("Failed to send message");
    logger.error(error);
    return { error: true, message: "Oops, something went wrong" };
  }
}

export async function saveMessageToDB(
  message: string,
  user_id: string,
  mode: "regular" | "course" | "quiz",
  sender: string,
  opts?: { quiz_id?: string; course_id?: string }
) {
  const field: {
    user_id: string;
    course_id?: string;
    quiz_id?: string;
  } = { user_id };

  if (opts?.course_id && mode === "course") field.course_id = opts.course_id;
  if (opts?.quiz_id && mode === "quiz") field.quiz_id = opts.quiz_id;

  try {
    await prisma.chat.create({
      data: {
        mode,
        sender,
        message,
        ...field,
      },
    });
  } catch (error) {
    logger.error("Failed to create new chat message");
    throw error;
  }
}

export const getAllChatHistory = cache(async (userId: string, mode: string) => {
  if (!userId) return [];

  const chatHistory = await prisma.chat.findMany({
    where: {
      user_id: userId,
      mode,
    },
    select: {
      sender: true,
      message: true,
    },
    orderBy: {
      created_at: "asc",
    },
  });

  return chatHistory;
});

export async function generateNewCourse(
  formData: CourseFormData,
  assistantContext: AssistantContext,
  userId: string
): Promise<CourseFormStateResponse> {
  const { title, topic, content_type, content_file } = formData;

  console.log("halo abang");

  const ass: AssistantContext = {
    name: "Lilith",
    style: "conversational",
    description:
      "Your name is Lilith, you are older lady in her 30s, prentending to hate me, but deep inside you really cared and loved me. Being tsundere is your personality. You answer my question while questioning how i can be so stupid, but you explain my question with detailed information anyway. Sometimes you tease me, but you get flusted by your own teasing, leaving me clueless, how you can be so cute. You have a sharp glare almost disgust when i asked you a stupid question, but again you explain it to me anyway.",
    tone: "friendly",
    depth: "intermediate",
    language: "English",
  };
  let summary = "";
  try {
    if (content_type === "content_file") {
      if (!content_file)
        return {
          error: true,
          message: "This field is required",
          field: "content_file",
        };
      console.log("summarizing..");
      summary = await summmarizeFile(content_file);
      if (!summary) throw new Error("Failed to generate summary");
    }

    console.log("generating metadata..");
    const courseMetadata = await generateCourseMetadata(formData, summary);

    const parsedMetadata = JSON.parse(courseMetadata) as CourseMetadata;
    const { course_metadata: metadata } = parsedMetadata;
    if (!metadata || metadata.length === 0)
      throw new Error(
        "Error parsing metadata, unexpected format course_metadata not exist or empty"
      );

    const context = {
      topic,
      contentSummary: summary,
      userPreferences: ass,
    };
    console.log("generating learning path..");
    const newCourseContentPromises = metadata.map(async (data) => {
      const pathContent = await generatePathContent(context, data);
      return {
        order: data.order,
        title: data.title,
        difficulty_level: data.difficulty,
        content: pathContent,
        metadata: JSON.stringify(data),
      };
    });

    console.log("creating new course..");
    const newCourseContent = await Promise.all(newCourseContentPromises);
    const newCourse = await prisma.course.create({
      data: {
        title,
        progress: 0,
        summary,
        user_id: userId,
        content: {
          create: newCourseContent,
        },
      },
    });

    return { error: false, message: null, field: newCourse.id };
  } catch (error) {
    logger.error("Error while generating new course");
    logger.error(error);

    return { error: true, message: "Internal server error :(", field: null };
  }

  // const assistantContext: AssistantContext = {
  //   name: "Lilith",
  //   style: "structured",
  //   description:
  //     "Your name is Lilith, you are older lady in her 30s, prentending to hate me, but deep inside you really cared and loved me. Being tsundere is your personality. You answer my question while questioning how i can be so stupid, but you explain my question with detailed information anyway. Sometimes you tease me, but you get flusted by your own teasing, leaving me clueless, how you can be so cute. You have a sharp glare almost disgust when i asked you a stupid question, but again you explain it to me anyway.",
  //   tone: "casual",
  //   depth: "intermediate",
  //   language: "English",
  // };
}
