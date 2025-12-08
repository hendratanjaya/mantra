"use client";

import { ChatSection } from "@/app/(main)/_components/chat-section";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState, useTransition } from "react";
import { proceedToQuizAction } from "../action";
import { CourseContentContext } from "../../_providers/course-content-provider";
import { toast } from "sonner";
import { AssistantPersonaContext } from "@/app/(main)/_providers/assistant-provider";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from "lucide-react";
import { UserProviderContext } from "@/app/(main)/_providers/user-provider";

export function CourseContentSidebar() {
  const { content_id: contentId } = useParams();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [quizState, setQuizState] = useState<"search" | "create" | null>(null);

  const userContext = useContext(UserProviderContext);
  const courseContentContex = useContext(CourseContentContext);
  const assistantContext = useContext(AssistantPersonaContext);

  const currentContent = courseContentContex.find(
    (content) => content.id === contentId
  );

  const handleSubmit = () => {
    if (!contentId || !currentContent) return;

    if (!userContext?.id) {
      toast.error("Oops, who are you....");
      return;
    }
    const language = assistantContext?.language || "Indonesian";

    startTransition(async () => {
      setQuizState("search");
      const result = await proceedToQuizAction(
        contentId.toString(),
        userContext.id,
        currentContent.metadata,
        language,
        "search"
      );

      if (result?.error) {
        toast.error(
          `Oops, we have trouble while ${result?.message || "searching quiz"}`
        );
        return;
      }

      if (result?.quiz) {
        router.push(`/quiz/${result.quiz}`);
        return;
      }

      setQuizState("create");
      const newQuiz = await proceedToQuizAction(
        contentId.toString(),
        userContext.id,
        currentContent.metadata,
        language,
        "create"
      );
      if (newQuiz?.error) {
        toast.error(
          `Oops, something went wrong while ${
            newQuiz?.message || "creating quiz"
          }`
        );
        return;
      }
      if (newQuiz?.quiz) {
        router.push(`/quiz/${newQuiz.quiz}`);
        return;
      }
    });

    setQuizState(null);
  };

  return (
    <>
      <AlertDialog open={pending || quizState !== null}>
        <AlertDialogContent>
          <AlertDialogHeader className="gap-y-0.5">
            <span className="flex font-bold flex-row gap-2 items-center w-full">
              <h4>Let me cook, this might take a while</h4>
              <LoaderCircle className="animate-spin h-4 w-4" />
            </span>
          </AlertDialogHeader>
          <AlertDialogDescription>
            {quizState === "search"
              ? "Searching for existing quiz..."
              : quizState === "create"
              ? "Generating new quiz for you..."
              : "I am cooking something here, i guarantee you..."}
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
      <ChatSection mode="course" />
      <div className="flex w-full p-2">
        <Button onClick={() => handleSubmit()} type="button" className="w-full">
          Quiz
        </Button>
      </div>
    </>
  );
}
