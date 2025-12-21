"use client";

import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

export function SummaryContent({ summaryContent }: { summaryContent: string }) {
  return (
    <div className="relative">
      <div className="p-3 [&>*:first-child]:mt-0 markdown-body">
        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {summaryContent || "**Oops, something went wrong**"}
        </Markdown>
      </div>
    </div>
  );
}
