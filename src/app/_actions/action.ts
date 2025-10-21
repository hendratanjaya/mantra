"use server";
import { logger } from "@/utils/logger";
import { prisma } from "@/utils/prisma";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get("session_id")?.value;
  try {
    if (sessionId)
      await prisma.session.delete({
        where: { id: sessionId },
      });
  } catch (error) {
    logger.error(`Failed to delete session:${sessionId}`);
    throw error;
  } finally {
    await deleteCookie("session_id");
    redirect("/login");
  }
}
export async function createCookie(
  cookieName: string,
  cookieValue: string,
  option: Partial<ResponseCookie>
) {
  try {
    const cookiesStore = await cookies();
    cookiesStore.set(cookieName, cookieValue, option);
    return true;
  } catch (error) {
    logger.error(
      `Failed to create cookie: ${cookieName} with value ${cookieValue}`
    );
    throw error;
  }
}

export async function deleteCookie(cookieName: string) {
  try {
    const cookiesStore = await cookies();
    cookiesStore.delete(cookieName);
  } catch (error) {
    logger.error(`Failed to delete cookie:${cookieName}`);
    throw error;
  }
}
