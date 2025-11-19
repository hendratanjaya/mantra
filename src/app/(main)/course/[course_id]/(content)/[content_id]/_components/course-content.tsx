"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useContext } from "react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { useParams, useRouter } from "next/navigation";
import { CourseContentContext } from "../../../_providers/course-content-provider";

export function CourseContent({ id }: { id: string }) {
  const router = useRouter();
  const { course_id } = useParams();
  const contentList = useContext(CourseContentContext);

  const index = contentList.findIndex((itemList) => itemList.id === id);

  const current = contentList[index];
  const { title, difficulty_level, content } = current;

  const hasPrev = index > 0;
  const hasNext = index < contentList.length - 1;

  const prevItem = hasPrev ? contentList[index - 1].id : null;
  const nextItem = hasNext ? contentList[index + 1].id : null;

  const gotTo = (nextId: string | null) => {
    if (!nextId) return;
    router.push(`/course/${course_id}/${nextId}`);
  };
  return (
    <div className="relative">
      <div className="sticky top-0 px-3 h-[80px] bg-card flex flex-col">
        <div className="flex-1 flex items-center justify-between">
          <span>
            <h2 className="mb-0 mt-0 font-semibold text-2xl">{title}</h2>
            <small>Level: {difficulty_level}</small>
          </span>
          {current && (
            <div className="space-x-2">
              {hasPrev && (
                <Button variant={"secondary"} onClick={() => gotTo(prevItem)}>
                  Prev
                </Button>
              )}
              {hasNext && (
                <Button variant={"secondary"} onClick={() => gotTo(nextItem)}>
                  Next
                </Button>
              )}
            </div>
          )}
        </div>
        <Separator className="drop-shadow-sm" />
      </div>
      <div className="p-3 [&>*:first-child]:mt-0 markdown-body">
        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {content || "**Oops, something went wrong**"}
        </Markdown>
      </div>
    </div>
  );
}
