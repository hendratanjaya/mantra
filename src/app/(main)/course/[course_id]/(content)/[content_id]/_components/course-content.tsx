"use client";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { useParams, useRouter } from "next/navigation";
import { CourseContentContext } from "../../../_providers/course-content-provider";
import { Metadata } from "@/lib/openai/type";

export function CourseContent({ id }: { id: string }) {
  const router = useRouter();
  const { course_id } = useParams();
  const contentList = useContext(CourseContentContext);

  const index = contentList.findIndex((itemList) => itemList.id === id);

  const current = contentList[index];
  const { content, metadata } = current;

  const parsedMetadata = JSON.parse(metadata) as Metadata;

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
      <div className="absolute w-full h-14 flex justify-end items-center px-3">
        <div className="fixed">
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
      </div>
      <div className="p-3 [&>*:first-child]:mt-0 markdown-body">
        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {content || "**Oops, something went wrong**"}
        </Markdown>
        {/* {parsedMetadata?.quiz && (
          <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {parsedMetadata.quiz}
          </Markdown>
        )} */}
      </div>
    </div>
  );
}
