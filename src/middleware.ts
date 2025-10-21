import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authRoute, privateRoute } from "../route";

export async function middleware(req: NextRequest) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session_id");
  const { pathname } = req.nextUrl;

  const isAuthRoute = authRoute.some((path) => pathname.startsWith(path));
  const isPrivateRoute = privateRoute.some((path) => pathname.startsWith(path));
  const isLoggedIn = !!token?.value;

  if ((isLoggedIn && isPrivateRoute) || (!isLoggedIn && isAuthRoute))
    return NextResponse.next();

  if (isLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL("/dashboard", req.url));

  if (!isLoggedIn && isPrivateRoute)
    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
