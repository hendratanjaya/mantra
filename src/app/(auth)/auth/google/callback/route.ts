"use server";
import { oauthState } from "@/app/(auth)/_constants";
import {
  createDefaultAssistant,
  createNewSession,
  createNewUser,
  getUserByEmail,
} from "@/app/(auth)/action";
import { GoogleOauthUserData } from "@/app/(auth)/types";
import { deleteCookie } from "@/app/_actions/action";
import { google } from "@/utils/arctic";
import { logger } from "@/utils/logger";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams;
  const cookiesStore = await cookies();
  const code = url.get("code") || "";
  const codeVerifier = cookiesStore.get("codeVerifier")?.value || "";

  try {
    if (code && codeVerifier) {
      const token = await google.validateAuthorizationCode(code, codeVerifier);
      const accessToken = token.accessToken();

      const userInfo: GoogleOauthUserData = await getUserInfo(accessToken);

      const { name, picture, email } = userInfo;

      let user = await getUserByEmail(email);
      if (!user) {
        user = await createNewUser({
          name,
          email,
          avatar: picture,
          username: name,
        });
        await createDefaultAssistant(user.id);
      }

      await createNewSession(user.id);
      await deleteCookie("codeVerifier");

      return NextResponse.redirect(new URL(`/login`, req.url));
    }
    throw new Error("Oauth Error: code or verifier not found");
  } catch (error) {
    logger.error(error);
    console.log("im here");
    const errorState = oauthState.error;
    return NextResponse.redirect(new URL(`/login?${errorState}=true`, req.url));
  }
}

async function getUserInfo(token: string) {
  const { OAUTH_GOOGLE_OPENID: openidURL } = process.env;

  const url = openidURL || "";

  if (url) {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  }

  return null;
}
