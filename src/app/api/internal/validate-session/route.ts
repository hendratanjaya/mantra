import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { INTERNAL_SECRET_TOKEN: internalSecret } = process.env;
  const secret = req.headers.get("x-internal-secret") || "";
  const opts = {
    path: "/api/validate-session",
    time: new Date().toISOString(),
    ip: req.headers.get("x-forwarded-for") || "unknown",
  };
  if (!secret || !internalSecret) {
    logger.warn(
      "Unauthorized request, secret or internal secret not found",
      opts
    );
    return NextResponse.json(
      { message: "What you doing brutha? Unauthorized!" },
      { status: 401 }
    );
  }
  try {
    if (secret === internalSecret) {
      const { sessionId } = await req.json();
      // const session = await prisma.session.findUnique({
      //   where: { id: sessionId },
      // });
      const today = new Date();
      // const valid = !!session && today < session.expired_at;
      const valid = true;
      return NextResponse.json({ valid });
    }
  } catch (error) {
    logger.error(error);
    return NextResponse.json({ valid: false });
  }

  logger.warn("Unauthorized request, secret mismatch", opts);
  return NextResponse.json(
    { message: "What you doing brutha? Unauthorized!" },
    { status: 401 }
  );
}
