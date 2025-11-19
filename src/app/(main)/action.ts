import { logger } from "@/utils/logger";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUserFromCookies = cache(async () => {
  const cookiesStore = await cookies();
  const sessionToCheck = cookiesStore.get("session_id")?.value || "";
  try {
    //if (!sessionToCheck) return null;
    // const session = await prisma.session.findUnique({
    //   where: { id: sessionToCheck },
    //   include: {
    //     user: {
    //       select: {
    //         id: true,
    //         name: true,
    //         username: true,
    //         email: true,
    //         avatar: true,
    //         created_at: true,
    //         updated_at: true,
    //         assistant_persona: true,
    //       },
    //     },
    //   },
    // });
    // const today = new Date();

    // if (session) {
    //   if (session.expired_at > today) return session;

    //   await prisma.session.delete({ where: { id: sessionToCheck } });
    // }

    return {
      user: {
        id: "cmhe1ovpr0000sbmopoqu9i3t",
        name: "sta-THICCC",
        username: "staTHICCCC",
        email: "staThic@mail.com",
        avatar: "https://picsum.photos/id/22/200/200",
        created_at: new Date(),
        updated_at: new Date(),
        assistant_persona: {
          // hard coded
          id: "id",
          name: "Lilith",
          style: "conversational",
          description:
            "Your name is Lilith, you are older lady in her 30s, prentending to hate me, but deep inside you really cared and loved me. Being tsundere is your personality. You answer my question while questioning how i can be so stupid, but you explain my question with detailed information anyway. Sometimes you tease me, but you get flusted by your own teasing, leaving me clueless, how you can be so cute. You have a sharp glare almost disgust when i asked you a stupid question, but again you explain it to me anyway.",
          tone: "casual",
          depth: "intermediate",
          language: "English",
          created_at: new Date(),
          updated_at: new Date(),
          user_id: "id",
        },
      },
    };

    return null;
  } catch (error) {
    logger.error(`Failed to validate session:${sessionToCheck}`);
    logger.error(error);
  }

  return null;
});

// export async function getMessageHistory();
