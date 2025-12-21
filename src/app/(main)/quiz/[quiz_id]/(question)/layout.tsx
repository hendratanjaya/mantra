"use server";
import { ChatSection } from "@/app/(main)/_components/chat-section";
import { ReactNode } from "react";
import { ActiveQuestionProvider } from "../../_providers/active-quiz-provider";
import { MobileTabContent } from "@/app/(main)/_components/mobile-tab-content";

export default async function QuizQUestionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ActiveQuestionProvider>
      {/* <div className="h-full w-full grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-3 overflow-y-auto rounded-l-xl border custom-scrollbar">
          {children}
        </div>
        <div className="col-span-1 overflow-y-auto flex flex-col border rounded-r-xl">
          <ChatSection mode="quiz" />
        </div>
      </div> */}
      <div className="h-full w-full">
        {/* DESKTOP LAYOUT */}
        <div className="hidden md:grid md:grid-cols-4 h-full">
          <div className="md:col-span-3 overflow-y-auto border">{children}</div>

          <div className="md:col-span-1 overflow-y-auto border">
            <ChatSection mode="quiz" />
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <MobileTabContent
          content={children}
          sidebar={<ChatSection mode="quiz" />}
        />
        {/* <div className="md:hidden w-full h-full flex flex-col">
          <Tabs defaultValue="content" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="content" >Content</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="flex-1 overflow-y-auto" >
              {children}
            </TabsContent>

            <TabsContent value="chat" className="flex-1 overflow-y-auto">
              <ChatSection mode="quiz" />
            </TabsContent>
          </Tabs>
        </div> */}
      </div>
    </ActiveQuestionProvider>
  );
}
