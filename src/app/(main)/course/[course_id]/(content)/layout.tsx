"use server";
import { ChatSection } from "@/app/(main)/_components/chat-section";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default async function Page({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-4">
      <div className="col-span-1 md:col-span-3 overflow-y-auto rounded-l-xl border custom-scrollbar">
        {children}
      </div>
      <div className="col-span-1 overflow-y-auto flex flex-col border rounded-r-xl">
        <ChatSection mode="course" />
        <div className="flex w-full p-2">
          <Button className="w-full">Quiz</Button>
        </div>
      </div>
    </div>
  );
}
