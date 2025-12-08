"use client";

import { ChatSection } from "@/app/(main)/_components/chat-section";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState, useTransition } from "react";
import { proceedToQuizAction } from "../../action";
import { toast } from "sonner";
import { AssistantPersonaContext } from "@/app/(main)/_providers/assistant-provider";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from "lucide-react";
import { UserProviderContext } from "@/app/(main)/_providers/user-provider";
import { Course } from "@/generated/prisma";

function generateQuizMetadata(course: Course) {
  return JSON.stringify({
    order: 1,
    title: course?.title || "",
    difficulty: "normal",
    estimated_duration: 0,
    key_concepts: ["not provided"],
    learning_objective: "Understand given material",
    description: course?.summary || "not provided",
  });
}

export function SummaryContentSidebar({ course }: { course: Course }) {
  const { summary_id: summaryId } = useParams();
  const router = useRouter();
  const [redirecting, startTransition] = useTransition();
  const [pending, setPending] = useState(false);
  const [quizState, setQuizState] = useState<"search" | "create" | null>(null);

  const userContext = useContext(UserProviderContext);
  const assistantContext = useContext(AssistantPersonaContext);

  const handleSubmit = async () => {
    setPending(true);
    if (!summaryId || !course.summary) return;

    if (!userContext?.id) {
      toast.error("Oops, who are you....");
      setPending(false);
      return;
    }
    const language = assistantContext?.language || "Indonesian";

    setQuizState("search");
    const metadata = generateQuizMetadata(course);
    const result = await proceedToQuizAction(
      summaryId.toString(),
      userContext.id,
      metadata,
      language,
      "search"
    );

    if (result?.error) {
      toast.error(
        `Oops, we have trouble while ${result?.message || "searching quiz"}`
      );
      setPending(false);
    } else if (result?.quiz) {
      startTransition(() => {
        router.push(`/quiz/${result.quiz}`);
      });
      setPending(false);
    }

    setQuizState("create");
    const newQuiz = await proceedToQuizAction(
      summaryId.toString(),
      userContext.id,
      metadata,
      language,
      "create"
    );
    if (newQuiz?.error) {
      toast.error(
        `Oops, something went wrong while ${
          newQuiz?.message || "creating quiz"
        }`
      );
      setPending(false);
    } else if (newQuiz?.quiz) {
      startTransition(() => {
        router.push(`/quiz/${newQuiz.quiz}`);
      });
      setPending(false);
      return;
    }
    setQuizState(null);
  };

  return (
    <>
      <AlertDialog open={pending || quizState !== null}>
        <AlertDialogContent>
          <AlertDialogHeader className="gap-y-0.5">
            <AlertDialogTitle>
              <span className="flex font-bold flex-row gap-2 items-center w-full">
                <h4>Let me cook, this might take a while</h4>
                <LoaderCircle className="animate-spin h-4 w-4" />
              </span>
            </AlertDialogTitle>
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
      <ChatSection mode="course" type="summary" />
      <div className="flex w-full p-2">
        <Button onClick={() => handleSubmit()} type="button" className="w-full">
          Quiz
        </Button>
      </div>
    </>
  );
}
