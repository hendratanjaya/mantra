import { create } from "zustand";

export type BreadcrumbItem = {
  href: string;
  label: string;
};

type BreadcrumbState = {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
  reset: () => void;
};

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  reset: () => set({ items: [] }),
}));
