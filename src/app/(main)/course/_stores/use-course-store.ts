import { Course } from "@/generated/prisma";
import { create } from "zustand";

type CourseStore = {
  course: Pick<
    Course,
    "id" | "title" | "summary" | "topic" | "created_at"
  > | null;
  setCourse: (
    course: Pick<
      Course,
      "id" | "title" | "summary" | "topic" | "created_at"
    > | null
  ) => void;
};

export const useCourseStore = create<CourseStore>((set) => ({
  course: null,
  setCourse: (course) => set({ course }),
}));
