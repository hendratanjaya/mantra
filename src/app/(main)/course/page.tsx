"use server";

import { getUserFromCookies } from "../action";
import { redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/utils/prisma";
import { CourseDataTable } from "./_components/course-data-table";
import { logger } from "@/utils/logger";

const getAllCourse = cache(async (userId: string) => {
  try {
    const courseList = await prisma.course.findMany({
      where: {
        user_id: userId,
        type: "course",
      },
      select: {
        id: true,
        title: true,
        summary: true,
        topic: true,
        created_at: true,
      },
    });

    return courseList;
  } catch (error) {
    logger.error("Failed to fetch all course");
    logger.error(error);
    return [];
  }
});

//const conversation: Chat[] = [];
export default async function Page() {
  const userSession = await getUserFromCookies();
  if (!userSession) redirect("/login");
  const { user } = userSession;

  const courseList = await getAllCourse(user.id);

  return (
    <div className="h-full w-full">
      <CourseDataTable courses={courseList} />

      {/* <div className="col-span-1 overflow-y-auto">
        <ChatSection conversation={chatHistory} />
      </div> */}
    </div>
  );
}
