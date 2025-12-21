"use client";

import { createContext, ReactNode, useState } from "react";
import { AssistantContext } from "@/lib/openai/type";

type AssistantPersonaContextType = {
  persona: AssistantContext | null;
  setPersona: React.Dispatch<React.SetStateAction<AssistantContext | null>>;
};

export const AssistantPersonaContext =
  createContext<AssistantPersonaContextType | null>(null);

export default function AssistantPersonaProvider({
  children,
  assistantPersona,
}: {
  children: ReactNode;
  assistantPersona: AssistantContext | null;
}) {
  const [persona, setPersona] = useState<AssistantContext | null>(
    assistantPersona
  );

  return (
    <AssistantPersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </AssistantPersonaContext.Provider>
  );
}
