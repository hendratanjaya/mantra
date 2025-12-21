import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authRoute, privateRoute } from "../route";

export async function middleware(req: NextRequest) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session_id");
  const url = `${req.nextUrl.origin}/api/internal/validate-session`;
  const { INTERNAL_SECRET_TOKEN: secret } = process.env;
  const { pathname } = req.nextUrl;
  const isAuthRoute = authRoute.some((path) => pathname.startsWith(path));
  const isPrivateRoute = privateRoute.some((path) => pathname.startsWith(path));
  const isLoggedIn = !!token?.value;
  if (!isLoggedIn && isAuthRoute) return NextResponse.next();
  if (isLoggedIn && isPrivateRoute) {
    const res = await validateSession(url, secret, token.value);
    if (res.ok) {
      const validRes = await res.json();
      const { valid }: { valid: boolean } = validRes;
      if (valid) return NextResponse.next();
    }
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("session_id");
    return response;
  }
  if (isLoggedIn && isAuthRoute) {
    const res = await validateSession(url, secret, token.value);
    if (res.ok) {
      const validRes = await res.json();
      const { valid }: { valid: boolean } = validRes;
      if (valid) return NextResponse.redirect(new URL("/home", req.url));
    }
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("session_id");
    return response;
  }
  return NextResponse.next();
}
async function validateSession(
  url: string,
  secret: string = "",
  sessionId: string
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": secret,
    },
    body: JSON.stringify({ sessionId }),
  });
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
