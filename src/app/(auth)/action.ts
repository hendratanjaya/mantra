"use server";

//THI FILE IS DEDICATED FOR AUTH FUNCTION THAT SHARED ACROSS THE APP

import * as arctic from "arctic";
import { google } from "@/utils/arctic";
import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";
import { logger } from "@/utils/logger";
import { Prisma } from "@/generated/prisma";
import { oauthState } from "./_constants";
import { createCookie, deleteCookie } from "../_actions/action";
import { cookies } from "next/headers";

export async function continueWithGoogleAction() {
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];
  try {
    await createCookie("codeVerifier", codeVerifier, {
      httpOnly: true,
    });
  } catch (error) {
    logger.error(error);
    redirect(`/login?${oauthState.error}=true`);
  }
  const url = google.createAuthorizationURL(state, codeVerifier, scopes);
  redirect(url.href);
}

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    logger.error(`Failed to get user by Email:${email}`);
    throw error;
  }
}

export async function createNewSession(userId: string): Promise<boolean> {
  try {
    const expiredDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const newSession = await prisma.session.create({
      data: {
        expired_at: expiredDate,
        user_id: userId,
      },
    });

    try {
      const cookie = await createCookie("session_id", newSession.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiredDate,
      });

      return cookie;
    } catch (cookieErr) {
      await prisma.session.delete({ where: { id: newSession.id } });
      throw cookieErr;
    }
  } catch (error) {
    logger.error(`Error creating session for user:${userId}`);
    logger.error(error);
    return false;
  }
}

export async function createNewUser(data: Prisma.UserCreateInput) {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (error) {
    logger.error(`Failed to create new user: ${data.email}`);
    throw error;
  }
}
