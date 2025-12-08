"use client";
import { Course } from "@/generated/prisma";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Markdown from "react-markdown";

export function CourseItem({
  course,
}: {
  course: Pick<Course, "id" | "title" | "summary" | "topic" | "created_at">;
}) {
  const path = usePathname();

  const splitted = course.summary.split(".");
  const summary = splitted[0] + ". " + splitted[1];

  return (
    <Link href={`${path}/${course.id}`} className="group block">
      <div className="rounded-2xl border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/40">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <small>{course.topic}</small>

            <div className="text-sm text-muted-foreground ">
              <Markdown>{summary || "No summary provided… "}</Markdown>
            </div>
          </div>

          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {/* {format(new Date(course.created_at), "dd MMM yyyy")} */}
            {course.created_at.toString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
