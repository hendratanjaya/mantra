"use client";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState, useTransition } from "react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { useParams, useRouter } from "next/navigation";
import { CourseContentContext } from "../../../_providers/course-content-provider";
import { DragAndDropQuiz, Metadata } from "@/lib/openai/type";
import { QuizList } from "./drag-and-drop-quiz";
import {
  QuizResult,
  useLearningStore,
} from "@/app/(main)/course/_stores/use-learning-store";
import { toast } from "sonner";
import {
  generateNextPath,
  getRemedialIntervention,
  proceedToQuizAction,
} from "../../action";
import { AssistantPersonaContext } from "@/app/(main)/_providers/assistant-provider";
import { RemedialInterveneDialog } from "./remedial-intervene-dialog";
import { UserProviderContext } from "@/app/(main)/_providers/user-provider";
import { CourseContent as CourseContentType } from "@/generated/prisma";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from "lucide-react";
import { QuizIdContext } from "../../../_providers/quiz-providers";
import { useCourseStore } from "@/app/(main)/course/_stores/use-course-store";
import { useBreadcrumbStore } from "@/app/(main)/_stores/use-breadcrumb-store";

function generateFinalMetadata(
  courseTitle: string,
  contentList: CourseContentType[],
) {
  const finalMetadata = {
    title: courseTitle || "Combined Module",
    difficulty: "intermediate" as const,
    estimated_duration: 0,
    key_concepts: [] as string[],
    learning_objective: "",
    description: "",
  };

  for (let i = 1; i < contentList.length; i++) {
    const raw = contentList[i].metadata;
    if (!raw) continue;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      continue;
    }

    if (parsed.key_concepts) {
      finalMetadata.key_concepts.push(...parsed.key_concepts);
    }

    if (parsed.learning_objective) {
      finalMetadata.learning_objective += parsed.learning_objective + " ";
    }

    if (parsed.description) {
      finalMetadata.description += parsed.description + " ";
    }
  }

  finalMetadata.key_concepts = Array.from(new Set(finalMetadata.key_concepts));

  finalMetadata.learning_objective = finalMetadata.learning_objective.trim();

  finalMetadata.description = finalMetadata.description.trim();

  return JSON.stringify(finalMetadata);
}

export function CourseContent({ id }: { id: string }) {
  const router = useRouter();
  const { course_id } = useParams();
  const { contentList, setContentList } = useContext(CourseContentContext)!;
  const quizIdContext = useContext(QuizIdContext);

  const { user: userContext } = useContext(UserProviderContext)!;
  const { persona: assistantContext } = useContext(AssistantPersonaContext)!;

  const [showIntervention, setShowIntervention] = useState(false);
  const [interventionContent, setInterventionContent] = useState<string | null>(
    null,
  );
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [performance, setPerformance] = useState<QuizResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [, startTransition] = useTransition();
  const [pending, setPending] = useState(false);
  const [quizState, setQuizState] = useState<string | null>(null);

  const { attempts, resetAll, hint } = useLearningStore();

  const index = contentList.findIndex((itemList) => itemList.id === id);

  const current = contentList[index];
  const { content, metadata, quiz } = current;
  const quizzes = quiz ? (JSON.parse(quiz) as DragAndDropQuiz).quizzes : [];
  const parsedMetadata = JSON.parse(metadata) as Metadata;

  const hasPrev = index > 0;
  const hasNext = index < contentList.length - 1;

  const prevItem = hasPrev ? contentList[index - 1].id : null;
  const nextItem = hasNext ? contentList[index + 1].id : null;

  function shouldIntervene() {
    for (const quiz of quizzes) {
      if (!attempts || !attempts[quiz.id]) {
        toast.error("You need to answer all quiz question!");
        return null;
      }
    }

    // 2. aggregate results
    let totalCorrect = 0;
    let totalQuestions = 0;
    const totalHints = hint;
    let accuracy = 0;
    let quizAttempts = 0;

    for (const quiz of quizzes) {
      const a = attempts![quiz.id];
      totalCorrect += a.correct;
      totalQuestions += a.total;
      accuracy += a.accuracy;
      quizAttempts += a.attempts;
    }

    // if (totalCorrect !== totalQuestions) {
    //   // console.log({ attempts });
    //   toast.error("You need to get every answer right!");
    //   return null;
    // }

    const performance: QuizResult = {
      correct: totalCorrect,
      total: totalQuestions,
      accuracy: accuracy / quizzes.length,
      hintsUsed: totalHints,
      attempts: quizAttempts,
      locked: true,
    };

    setPerformance(performance);

    // console.log({ performance });
    console.log({ accuracy });
    // 3. intervention rules
    const intervene = performance.accuracy < 0.7 || totalHints >= 2;

    return { intervene, performance };
  }

  async function handleFinish() {
    if (!hasNext && quizIdContext) {
      toast.info("Redirecting...");
      router.push(`/quiz/${quizIdContext}`);
      return;
    }

    setIsEvaluating(true);

    const needsHelp = shouldIntervene();
    if (!needsHelp) {
      setIsEvaluating(false);
      return;
    }
    const { intervene, performance } = needsHelp;
    let interveneMessage = "";
    if (!intervene) {
      interveneMessage = "**You are doing well!**";
    } else {
      setIsEvaluating(true);
      const intervention = await getRemedialIntervention(
        parsedMetadata,
        performance,
        assistantContext!,
      );

      if (intervention.error) {
        toast.error(intervention.message);
        unmountDialog();
        return;
      }

      interveneMessage = intervention.message!;
    }
    setInterventionContent(interveneMessage);
    setShowIntervention(true);
    setIsEvaluating(false);
  }

  async function getNextPath(nextId: string | null) {
    if (hasNext && nextId) {
      setIsGenerating(true);
      toast.info("This might take a while");
      const difficulty = () => {
        if (!performance) return "intermediate";

        const score =
          performance.accuracy * 0.6 +
          (1 - Math.min(performance.hintsUsed / 6, 1)) * 0.2 +
          (1 - Math.min(performance.attempts / 6, 1)) * 0.2;

        if (score > 0.8) return "advanced";
        if (score > 0.6) return "intermediate";
        return "beginner";
      };

      const nextPathMetadata = JSON.parse(
        contentList[index + 1].metadata,
      ) as Metadata;
      const newPath = await generateNextPath(
        assistantContext!,
        nextPathMetadata,
        String(course_id),
        nextId,
        difficulty(),
      );
      if (newPath.error) {
        toast.error(newPath.message);
        unmountDialog();
        return;
      }
      setContentList((content) =>
        content.map((list) =>
          list.id === nextId
            ? {
                ...list,
                content: newPath.newPathContent!,
                quiz: newPath.newPathQuiz!,
              }
            : list,
        ),
      );
      console.log("Redirecting to next path..");
      setIsRedirecting(true);
      router.push(`/course/${course_id}/${nextId}`);
      resetAll();
      return;
    } else {
      unmountDialog();
      handleQuiz();
    }
    unmountDialog();
  }

  const unmountDialog = () => {
    resetAll();
    setPerformance(null);
    setIsEvaluating(false);
    setShowIntervention(false);
    setInterventionContent("");
    setIsGenerating(false);
    setIsRedirecting(false);
  };

  const gotTo = (nextId: string | null, direction: "next" | "prev") => {
    if (
      (direction === "next" && contentList[index + 1]?.content) ||
      (direction === "prev" && contentList[index - 1]?.content)
    ) {
      unmountDialog();
      router.push(`/course/${course_id}/${nextId}`);
    } else handleFinish();
  };
  const { course } = useCourseStore();
  const handleQuiz = async () => {
    setPending(true);

    if (!userContext?.id) {
      toast.error("Oops, who are you....");
      setPending(false);
      return;
    }
    const language = assistantContext?.language || "Indonesian";

    setQuizState("search");
    const finalMetadata = generateFinalMetadata(
      course?.title || "",
      contentList,
    );
    const result = await proceedToQuizAction(
      String(course_id),
      userContext.id,
      finalMetadata,
      language,
      "search",
    );

    if (result?.error) {
      toast.error(
        `Oops, we have trouble while ${result?.message || "searching quiz"}`,
      );
      setPending(false);
    } else if (result?.quiz) {
      toast.info("Redirecting...");
      startTransition(() => {
        router.push(`/quiz/${result.quiz}`);
      });
      setPending(false);
    }

    setQuizState("create");
    const newQuiz = await proceedToQuizAction(
      String(course_id),
      userContext.id,
      finalMetadata,
      language,
      "create",
    );
    if (newQuiz?.error) {
      toast.error(
        `Oops, something went wrong while ${
          newQuiz?.message || "creating quiz"
        }`,
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
  const { setItems, reset } = useBreadcrumbStore();
  useEffect(() => {
    if (course)
      setItems([
        { href: "/course", label: "Course" },
        { href: `/course/${course.id}`, label: course.title },
        {
          href: `/course/${course.id}/${current.id}`,
          label: current.title,
        },
      ]);

    return () => reset();
  }, [course]);
  return (
    <>
      <RemedialInterveneDialog
        open={isEvaluating || showIntervention}
        isEvaluating={isEvaluating}
        performance={performance}
        intervention={interventionContent}
        isGenerating={isGenerating}
        isRedirecting={isRedirecting}
        onContinue={() => getNextPath(nextItem)}
      />
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
      <div className="relative">
        <div className="absolute w-full h-14 flex justify-end items-center px-3">
          <div className="fixed">
            {current && (
              <div className="space-x-2">
                {hasPrev && (
                  <Button
                    variant={"secondary"}
                    onClick={() => gotTo(prevItem, "prev")}
                  >
                    Prev
                  </Button>
                )}

                <Button
                  variant={"secondary"}
                  onClick={() => gotTo(nextItem, "next")}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="p-3 [&>*:first-child]:mt-0 markdown-body">
          <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {content || "**Oops, something went wrong**"}
          </Markdown>
          {quizzes.length > 0 && <QuizList quizzes={quizzes} />}
        </div>
      </div>
    </>
  );
}
