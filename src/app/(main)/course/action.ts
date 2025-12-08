"use server";

import {
  AssistantContext,
  ChatContext,
  CourseMetadata,
} from "@/lib/openai/type";
import { CourseFormStateResponse, MessageStateResponse } from "./type";
import {
  generateAIRespondForCourseChat,
  generateAIRespondForRegularChat,
  generateCourseMetadata,
  generatePathContent,
  summmarizeFile,
} from "@/lib/openai/generate-ai-respond";
import { prisma } from "@/utils/prisma";
import { cache } from "react";
import { logger } from "@/utils/logger";
import { CourseFormData } from "../_schemas/course";
import { UserException } from "@/lib/utils";

export async function generateNewCourse(
  formData: CourseFormData,
  assistantContext: AssistantContext,
  userId: string
): Promise<CourseFormStateResponse> {
  const { title, topic, content_type, content_file } = formData;

  console.log("halo abang");

  // const ass: AssistantContext = {
  //   name: "Lilith",
  //   style: "conversational",
  //   description:
  //     "Your name is Lilith, You answer my question while questioning how i can be so stupid, but you explain my question with detailed information anyway. You have a sharp glare almost disgust when i asked you a stupid question, but again you explain it to me anyway.",
  //   tone: "friendly",
  //   depth: "intermediate",
  //   language: "English",
  // };
  // let summary = "";
  try {
    // if (content_type === "content_file") {
    //   if (!content_file)
    //     return {
    //       error: true,
    //       message: "This field is required",
    //       field: "content_file",
    //     };
    //   console.log("summarizing..");
    //   summary = await summmarizeFile(content_file, assistantContext);
    //   if (!summary) throw new UserException("Failed to generate summary", 500);
    // }

    // // TO DO: adjust this function to only do proper summary
    // const newCourse = await prisma.course.create({
    //   data: {
    //     title,
    //     summary,
    //     type: "summary",
    //     user_id: userId
    //   }
    // })

    return { error: false, message: null, field: "" };
  } catch (error) {
    logger.error("Error while generating new course");
    logger.error(error);

    let message = "Internal server error";
    if (error instanceof UserException) message = error.message;

    return { error: true, message, field: null };
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
