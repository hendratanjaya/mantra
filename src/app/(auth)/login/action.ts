"use server";
import { AuthRespond, LoginFormData } from "../types";
import bcrypt from "bcryptjs";
import { logger } from "@/utils/logger";
import { createNewSession, getUserByEmail } from "../action";

export async function loginAction(
  formData: LoginFormData
): Promise<AuthRespond<LoginFormData>> {
  const { email, password } = formData;
  try {
    const user = await getUserByEmail(email);

    if (!user)
      return { success: false, type: null, message: "Invalid credentials" };

    const { id: userId, password: userPassword, username } = user;

    if (!userPassword)
      return {
        success: false,
        type: null,
        message:
          "Email already registered with google, please continue with google'",
      };

    const isPasswordMatch = await bcrypt.compare(password, userPassword);

    if (!isPasswordMatch)
      return { success: false, type: null, message: "Invalid credentials" };

    const newSession = await createNewSession(userId);
    if (newSession)
      return { success: true, type: null, message: `Welcome ${username}` };

    return {
      success: false,
      type: null,
      message: "Oops, something went wrong",
    };
  } catch (error) {
    logger.error(error);
    return { success: false, type: null, message: "Internal server error" };
  }
}
