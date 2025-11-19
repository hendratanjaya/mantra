"use server";

import CourseContentFlow from "./_components/course-content-flow";

export default async function Page() {
  return (
    <div className="h-full w-full bg-primary">
      <CourseContentFlow />
    </div>
  );
}
