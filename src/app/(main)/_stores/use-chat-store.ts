import { create } from "zustand";

type ChatSchema = {
  generating: boolean;
  setGenerating: (generating: boolean) => void;
};

export const useChatStore = create<ChatSchema>((set) => ({
  generating: false,
  setGenerating: (generating) => set({ generating }),
}));
