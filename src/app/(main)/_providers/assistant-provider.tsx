"use client";
import { AssistantPersona } from "@/generated/prisma";
import { AssistantContext } from "@/lib/openai/type";
import { createContext, ReactNode } from "react";

export const AssistantPersonaContext = createContext<AssistantContext | null>(
  null
);

export default function AssistantPersonaProvider({
  children,
  assistantPersona,
}: {
  children: ReactNode;
  assistantPersona: AssistantContext | null;
}) {
  return (
    <AssistantPersonaContext.Provider value={assistantPersona}>
      {children}
    </AssistantPersonaContext.Provider>
  );
}
