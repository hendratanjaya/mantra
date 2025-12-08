"use client";
import { Chat } from "@/generated/prisma";
import { createContext, ReactNode } from "react";

export const ChatHistoryContext = createContext<
  Pick<Chat, "sender" | "message">[]
>([]);
export function ChatHistoryProvider({
  children,
  chatHistory,
}: {
  children: ReactNode;
  chatHistory: Pick<Chat, "sender" | "message">[];
}) {
  return (
    <ChatHistoryContext.Provider value={chatHistory}>
      {children}
    </ChatHistoryContext.Provider>
  );
}
