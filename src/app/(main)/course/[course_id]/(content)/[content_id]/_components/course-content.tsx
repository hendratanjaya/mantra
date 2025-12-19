"use client";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
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
import { generateNextPath, getRemedialIntervention } from "../../action";
import { AssistantPersonaContext } from "@/app/(main)/_providers/assistant-provider";
import { RemedialInterveneDialog } from "./remedial-intervene-dialog";
import { useCourseStore } from "@/app/(main)/course/_stores/use-course-store";

export function CourseContent({ id }: { id: string }) {
  const router = useRouter();
  const { course_id } = useParams();
  const { contentList, setContentList } = useContext(CourseContentContext)!;

  const [showIntervention, setShowIntervention] = useState(false);
  const [interventionContent, setInterventionContent] = useState<string | null>(
    null
  );
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [performance, setPerformance] = useState<QuizResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { attempts, resetAll } = useLearningStore();

  const assistanContext = useContext(AssistantPersonaContext);

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
    let totalHints = 0;
    let accuracy = 0;
    let quizAttempts = 0;

    for (const quiz of quizzes) {
      const a = attempts![quiz.id];
      totalCorrect += a.correct;
      totalQuestions += a.total;
      totalHints += a.hintsUsed;
      accuracy += a.accuracy;
      quizAttempts += a.attempts;
    }

    if (totalCorrect !== totalQuestions) {
      // console.log({ attempts });
      toast.error("You need to get every answer right!");
      return null;
    }

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

    // 3. intervention rules
    const intervene = accuracy < 0.7 || totalHints > quizzes.length * 2;

    return { intervene, performance };
  }

  async function handleFinish() {
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
        assistanContext!
      );

      if (intervention.error) {
        toast.error(intervention.message);
        unmountDialog();
        return;
      }

      interveneMessage = intervention.message!;
    }
    // TO DO: fix intervene prompt to actually useful
    setInterventionContent(interveneMessage);
    setShowIntervention(true);
    setIsEvaluating(false);
  }

  async function getNextPath(nextId: string | null) {
    if (hasNext && nextId) {
      setIsGenerating(true);
      const nextPathMetadata = JSON.parse(
        contentList[index + 1].metadata
      ) as Metadata;
      const newPath = await generateNextPath(
        assistanContext!,
        nextPathMetadata,
        String(course_id),
        nextId
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
            : list
        )
      );
      setIsRedirecting(true);
      router.push(`/course/${course_id}/${nextId}`);
      return;
    }
    unmountDialog();
  }

  const unmountDialog = () => {
    setPerformance(null);
    setIsEvaluating(false);
    setShowIntervention(false);
    setInterventionContent("");
    setIsGenerating(false);
    setIsRedirecting(false);
  };

  const gotTo = (nextId: string | null, direction: "next" | "prev") => {
    if (!nextId) return;
    if (
      (direction === "next" && contentList[index + 1].content) ||
      (direction === "prev" && contentList[index - 1].content)
    )
      router.push(`/course/${course_id}/${nextId}`);
    else handleFinish();
  };
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
                {hasNext && (
                  <Button
                    variant={"secondary"}
                    onClick={() => gotTo(nextItem, "next")}
                  >
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
          {quizzes.length > 0 && <QuizList quizzes={quizzes} />}
        </div>
      </div>
    </>
  );
}
