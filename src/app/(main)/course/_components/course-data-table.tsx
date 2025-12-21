import { Course } from "@/generated/prisma";
import { CourseItem } from "../../_components/course-item";
import { AddNewCourseForm } from "./add-new-course-form";

export function CourseDataTable({
  courses,
}: {
  courses: Pick<Course, "id" | "title" | "summary" | "topic" | "created_at">[];
}) {
  return (
    <div className="p-2 h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold">Course Collections</h3>
        <AddNewCourseForm isExceedLimit={courses.length >= 3} />
      </div>
      <div className="bg-secondary drop-shadow-sm flex-1 rounded-xl p-4 overflow-y-auto custom-scrollbar space-y-2">
        {courses.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center font-semibold text-muted-foreground">
            You have no course available, create a new one!
          </div>
        ) : (
          courses.map((course) => (
            <CourseItem course={course} key={course.id} />
          ))
        )}
      </div>
    </div>
  );
}
