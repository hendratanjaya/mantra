"use server";
import { ChatSection } from "@/app/(main)/_components/chat-section";
import { ReactNode } from "react";
import { ActiveQuestionProvider } from "../../_providers/active-quiz-provider";

export default async function QuizQUestionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ActiveQuestionProvider>
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-3 overflow-y-auto rounded-l-xl border custom-scrollbar">
          {children}
        </div>
        <div className="col-span-1 overflow-y-auto flex flex-col border rounded-r-xl">
          <ChatSection mode="quiz" />
        </div>
      </div>
    </ActiveQuestionProvider>
  );
}
