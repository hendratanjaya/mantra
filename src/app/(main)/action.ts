"use server";

import { logger } from "@/utils/logger";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { cache } from "react";
import { MessageStateResponse } from "./course/type";
import { AssistantContext, ChatContext } from "@/lib/openai/type";
import {
  generateAIRespondForCourseChat,
  generateAIRespondForQuizChat,
  generateAIRespondForRegularChat,
} from "@/lib/openai/generate-ai-respond";

export const getUserFromCookies = cache(async () => {
  const cookiesStore = await cookies();
  const sessionToCheck = cookiesStore.get("session_id")?.value || "";
  try {
    if (!sessionToCheck) return null;
    const session = await prisma.session.findUnique({
      where: { id: sessionToCheck },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            avatar: true,
            created_at: true,
            updated_at: true,
            assistant_persona: true,
          },
        },
      },
    });
    const today = new Date();

    if (session) {
      if (session.expired_at > today) return session;

      await prisma.session.delete({ where: { id: sessionToCheck } });
    }

    // return {
    //   user: {
    //     id: "cmhe1ovpr0000sbmopoqu9i3t",
    //     name: "sta-THICCC",
    //     username: "staTHICCCC",
    //     email: "staThic@mail.com",
    //     avatar: "https://picsum.photos/id/22/200/200",
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     assistant_persona: {
    //       // hard coded
    //       id: "id",
    //       name: "Lilith",
    //       style: "conversational",
    //       description:
    //         "Your name is Lilith, You answer my question while questioning how i can be so stupid, but you explain my question with detailed information anyway. You have a sharp glare almost disgust when i asked you a stupid question, but again you explain it to me anyway.",
    //       tone: "casual",
    //       depth: "intermediate",
    //       language: "English",
    //       created_at: new Date("2025-12-12"),
    //       updated_at: new Date("2025-12-12"),
    //       user_id: "id",
    //     },
    //   },
    // };

    return null;
  } catch (error) {
    logger.error(`Failed to validate session:${sessionToCheck}`);
    logger.error(error);
    return null;
  }
});

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

    if (!userId) return { error: true, message: "Oops, who are you again?" };

    const question = message.toString();

    // console.log({ courseId });

    // return { error: false, message: "testing responds", isNewMessage: true };

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
          return generateAIRespondForCourseChat(
            question,
            assistantContext,
            context
          );
        case "quiz":
          return generateAIRespondForQuizChat(
            question,
            assistantContext,
            context
          );
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

// export async function getMessageHistory();
