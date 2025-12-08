import { cache } from "react";
import { SummartyDataTable } from "./_components/summary-data-table";
import { prisma } from "@/utils/prisma";
import { getUserFromCookies } from "../action";
import { redirect } from "next/navigation";

const getAllSummary = cache(async (userId: string) => {
  const courseList = await prisma.course.findMany({
    where: {
      user_id: userId,
      type: "summary",
    },
    select: {
      id: true,
      title: true,
      topic: true,
      summary: true,
      created_at: true,
    },
  });

  return courseList;
});

export default async function Page() {
  const userSession = await getUserFromCookies();
  if (!userSession) redirect("/login");
  const { user } = userSession;

  const courseList = await getAllSummary(user.id);
  return (
    <div className="h-full w-full">
      <SummartyDataTable courses={courseList} />

      {/* <div className="col-span-1 overflow-y-auto">
            <ChatSection conversation={chatHistory} />
          </div> */}
    </div>
  );
}
