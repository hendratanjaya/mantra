"use server";
import { CourseContent } from "./_components/course-content";

export default async function Page({
  params,
}: {
  params: Promise<{ content_id: string }>;
}) {
  const { content_id } = await params;
  return <CourseContent id={content_id} />;
}
