"use server";
import { cache } from "react";
import { ChatHistoryProvider } from "../_providers/chat-history-provider";
import { prisma } from "@/utils/prisma";
import { getUserFromCookies } from "../action";
import { redirect } from "next/navigation";
import { HomePage } from "./_components/home-page";
import { ChatSection } from "../_components/chat-section";
import { logger } from "@/utils/logger";
import { MobileTabContent } from "../_components/mobile-tab-content";

const getChatHistory = cache(async (userId: string) => {
  console.log("Fetching chat history for regular...");
  try {
    const chatHistory = await prisma.chat.findMany({
      where: { mode: "regular", user_id: userId },
      select: { sender: true, message: true },
      orderBy: { created_at: "asc" },
    });

    return chatHistory;
  } catch (error) {
    logger.error("Failed to fetch regular chat history");
    logger.error(error);
    return [];
  }
});

const getAllCourse = cache(async (userId: string) => {
  console.log("Fetching course for regular...");
  try {
    const course = await prisma.course.findMany({
      where: { user_id: userId },
      select: { type: true },
    });

    return course;
  } catch (error) {
    logger.error("Failed to fetch all course");
    logger.error(error);
    return [];
  }
});

export default async function Page() {
  const userSession = await getUserFromCookies();
  if (!userSession) redirect("/login");

  const { user } = userSession;

  const userId = user.id;

  const [chatHistory, courses] = await Promise.all([
    getChatHistory(userId),
    getAllCourse(userId),
  ]);

  let totalCourse = 0;
  let totalSummary = 0;

  courses.forEach((course) => {
    if (course.type === "course") totalCourse++;
    if (course.type === "summary") totalSummary++;
  });

  return (
    <ChatHistoryProvider chatHistory={chatHistory}>
      <div className="h-full w-full">
        {/* DESKTOP LAYOUT */}
        <div className="hidden md:grid md:grid-cols-4 h-full">
          <div className="md:col-span-3 overflow-y-auto border">
            <HomePage courses={totalCourse} summaries={totalSummary} />
          </div>

          <div className="md:col-span-1 overflow-y-auto border">
            <ChatSection mode="regular" />
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <MobileTabContent
          content={<HomePage courses={totalCourse} summaries={totalSummary} />}
          sidebar={<ChatSection mode="regular" />}
        />
        {/* <div className="md:hidden w-full h-full flex flex-col">
          <Tabs defaultValue="content" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="flex-1 overflow-y-auto">
              <HomePage courses={totalCourse} summaries={totalSummary} />
            </TabsContent>

            <TabsContent value="chat" className="flex-1 overflow-y-auto">
              <ChatSection mode="regular" />
            </TabsContent>
          </Tabs>
        </div> */}
      </div>
    </ChatHistoryProvider>
  );
}
