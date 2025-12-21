import { cache } from "react";
import { SummartyDataTable } from "./_components/summary-data-table";
import { prisma } from "@/utils/prisma";
import { getUserFromCookies } from "../action";
import { redirect } from "next/navigation";
import { logger } from "@/utils/logger";

const getAllSummary = cache(async (userId: string) => {
  try {
    const courseList = await prisma.course.findMany({
      where: {
        user_id: userId,
        type: "summary",
      },
      select: {
        id: true,
        title: true,
        topic: true,
        summary: true,
        created_at: true,
      },
    });
    return courseList;
  } catch (error) {
    logger.error("Failed to fetch all summary");
    logger.error(error);
    return [];
  }
});

export default async function Page() {
  const userSession = await getUserFromCookies();
  if (!userSession) redirect("/login");
  const { user } = userSession;

  const courseList = await getAllSummary(user.id);
  return (
    <div className="h-full w-full">
      <SummartyDataTable courses={courseList} />
    </div>
  );
}
