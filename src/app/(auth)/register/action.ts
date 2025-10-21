"use server";

import { prisma } from "@/utils/prisma";
import { DataToValidate, RegisterFormData, AuthRespond } from "../types";
import bcrypt from "bcryptjs";
import { logger } from "@/utils/logger";
import { createNewUser } from "../action";

export async function registerAction(
  formData: RegisterFormData
): Promise<AuthRespond<RegisterFormData>> {
  const { name, username, email, password } = formData;

  try {
    const user = await getUserByEmailOrUsername(email, username);

    if (user) {
      return validateDuplicateCredentials({
        existingEmail: String(user.email),
        existingUsername: String(user.username),
        formEmail: email,
        formUsername: username,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    await createNewUser({ name, username, email, password: hashedPassword });

    logger.info(`Register success for ${email}`);
    return { success: true, type: null, message: "Registration success" };
  } catch (error) {
    logger.error(error);
    return { success: false, type: null, message: "Something went wrong" };
  }
}

async function getUserByEmailOrUsername(email: string, username: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
}

function validateDuplicateCredentials(
  data: DataToValidate
): AuthRespond<RegisterFormData> {
  console.log(data);

  if (data.existingEmail === data.formEmail)
    return {
      success: false,
      type: "email",
      message: "Email already exist",
    };
  if (data.existingUsername === data.formUsername)
    return {
      success: false,
      type: "username",
      message: "Username already exist",
    };

  return { success: false, type: null, message: "Internal server error" };
}
