"use server";

import { logger } from "@/utils/logger";
import { userEditFormData } from "../_schemas/user";
import { UserException } from "@/lib/utils";
import { prisma } from "@/utils/prisma";
import { assistantPersonaData } from "../_schemas/assistantPersona";

export async function updateUserData(data: userEditFormData, userId: string) {
  try {
    if (!userId) throw new UserException("Oops, who are you?", 400);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: data.username,
        name: data.name,
      },
      select: {
        username: true,
        name: true,
      },
    });

    return {
      error: false,
      message: "User successfully updated",
      updatedUser,
    };
  } catch (error) {
    logger.error("Error while generating new course");
    logger.error(error);

    let message = "Internal server error";
    if (error instanceof UserException) message = error.message;

    return { error: true, message, updatedUser: null };
  }
}

export async function updatePersonaData(
  data: assistantPersonaData,
  userId: string
) {
  try {
    if (!userId) throw new UserException("Oops, who are you?", 400);
    const updatedAssistant = await prisma.assistantPersona.update({
      where: { user_id: userId },
      data: {
        name: data.name,
        tone: data.tone,
        style: data.style,
        description: data.description,
      },
      select: {
        name: true,
        tone: true,
        style: true,
        description: true,
      },
    });

    return {
      error: false,
      message: "Assistant successfully updated",
      updatedAssistant,
    };
  } catch (error) {
    logger.error("Error while generating new course");
    logger.error(error);

    let message = "Internal server error";
    if (error instanceof UserException) message = error.message;

    return { error: true, message, updatedAssistant: null };
  }
}
