"use server";

import { ChatSection } from "@/app/(main)/_components/chat-section";
import { Chat, Course } from "@/generated/prisma";
import { getUserFromCookies } from "../action";
import { redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/utils/prisma";
import { CourseDataTable } from "./_components/course-data-table";

// const courseList: Pick<Course, "id" | "title" | "created_at">[] = [
//   {
//     id: "some-id1",
//     title: "Course 1",
//     created_at: new Date(),
//   },
//   {
//     id: "some-id2",
//     title: "Course 2",
//     created_at: new Date(),
//   },
// ];

const getAllCourse = cache(async (userId: string) => {
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
