"use client";
import { Separator } from "@/components/ui/separator";
import { Course } from "@/generated/prisma";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function CourseItem({
  course,
}: {
  course: Pick<Course, "id" | "title" | "progress" | "created_at">;
}) {
  const path = usePathname();
  return (
    <Link href={`${path}/${course.id}`}>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">{course.title}</h3>
          <small>{course.created_at.toString()}</small>
        </div>
        <div className="flex justify-center items-center rounded-full bg-destructive">
          {course.progress}
        </div>
      </div>
      <Separator />
    </Link>
  );
}
