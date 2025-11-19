"use server";

import { ChatSection } from "@/app/(main)/_components/chat-section";
import { Chat, Course } from "@/generated/prisma";
import { getUserFromCookies } from "../action";
import { redirect } from "next/navigation";
import { getAllChatHistory } from "./action";
import { CourseDataTable } from "./_components/course-data-table";
const chatHistory: Pick<Chat, "sender" | "message">[] = [
  {
    sender: "user",
    message: "What is quantum physics?",
  },
  {
    sender: "bot",
    message:
      "How the hell am i suppose to know the answer of that thing?? who you think i am?",
  },
];

const courseList: Pick<Course, "id" | "title" | "progress" | "created_at">[] = [
  {
    id: "some-id1",
    title: "Course 1",
    progress: 80,
    created_at: new Date(),
  },
  {
    id: "some-id2",
    title: "Course 2",
    progress: 18,
    created_at: new Date(),
  },
];

//const conversation: Chat[] = [];
export default async function Page() {
  // const userSession = await getUserFromCookies();
  // if (!userSession) redirect("/login");
  // const { user } = userSession;

  // const chatHistory = await getAllChatHistory(user.id, "regular");

  return (
    <div className="h-full w-full bg-primary grid grid-cols-1 md:grid-cols-4">
      <div className="col-span-1 md:col-span-3 overflow-y-auto">
        <CourseDataTable courses={courseList} />
      </div>
      {/* <div className="col-span-1 overflow-y-auto">
        <ChatSection conversation={chatHistory} />
      </div> */}
    </div>
  );
}
