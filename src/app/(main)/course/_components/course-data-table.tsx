import { Button } from "@/components/ui/button";
import { Course } from "@/generated/prisma";
import { FaPlus } from "react-icons/fa";
import { CourseItem } from "./course-item";
import { AddNewCourseForm } from "./add-new-course-form";

export function CourseDataTable({
  courses,
}: {
  courses: Pick<Course, "id" | "title" | "progress" | "created_at">[];
}) {
  return (
    <div className="bg-blue-500 p-2 h-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Course List</h3>
        <AddNewCourseForm />
      </div>
      <div className="bg-secondary flex-1">
        {courses.map((course) => (
          <CourseItem course={course} key={course.id} />
        ))}
      </div>
    </div>
  );
}
