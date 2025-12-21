"use server";
import { ReactNode } from "react";
import { CourseContentSidebar } from "./_components/course-content-sidebar";
import { MobileTabContent } from "@/app/(main)/_components/mobile-tab-content";

export default async function CourseContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // <div className="h-full w-full grid grid-cols-1 md:grid-cols-4">
    //   <div className="col-span-1 md:col-span-3 overflow-y-auto rounded-l-xl border custom-scrollbar">
    //     {children}
    //   </div>
    //   <div className="col-span-1 overflow-y-auto flex flex-col border rounded-r-xl">
    //     <CourseContentSidebar />
    //   </div>
    // </div>
    <div className="h-full w-full">
      <div className="hidden md:grid md:grid-cols-4 h-full">
        <div className="md:col-span-3 overflow-y-auto border">{children}</div>

        <div className="md:col-span-1 overflow-y-auto border">
          <CourseContentSidebar />
        </div>
      </div>

      <MobileTabContent content={children} sidebar={<CourseContentSidebar />} />
      {/* <div className="md:hidden w-full h-full flex flex-col">
        <Tabs defaultValue="content" className="flex flex-col h-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="flex-1 overflow-y-auto">
            {children}
          </TabsContent>

          <TabsContent value="chat" className="flex-1 overflow-y-auto">
            <CourseContentSidebar />
          </TabsContent>
        </Tabs>
      </div> */}
    </div>
  );
}
