"use client";
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChatStore } from "../_stores/use-chat-store";
export function MobileTabContent({
  content,
  sidebar,
}: {
  content: ReactNode;
  sidebar: ReactNode;
}) {
  const { generating } = useChatStore();
  return (
    <div className="md:hidden w-full h-full flex flex-col">
      <Tabs defaultValue="content" className="flex flex-col h-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger disabled={generating} value="content">
            Content
          </TabsTrigger>
          <TabsTrigger disabled={generating} value="chat">
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="flex-1 overflow-y-auto">
          {content}
        </TabsContent>

        <TabsContent value="chat" className="flex-1 overflow-y-auto">
          {sidebar}
        </TabsContent>
      </Tabs>
    </div>
  );
}
