import { useQuizFeeadbackStore } from "@/app/(main)/_stores/use-quiz-feedback-store";
import { useLearningStore } from "@/app/(main)/course/_stores/use-learning-store";
import { Button } from "@/components/ui/button";
import { DragAndDropBlanks, DragAndDropQuizItems } from "@/lib/openai/type";
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragEndEvent,
} from "@dnd-kit/core";
import { Dispatch, SetStateAction, useState } from "react";

export function checkAnswers(
  question: DragAndDropQuizItems,
  answers: Record<string, string>
) {
  let correct = 0;

  for (const blank of question.blanks) {
    const userAnswer = answers[blank.id];
    if (userAnswer && userAnswer === blank.correctItemId) {
      correct++;
    }
  }

  const total = question.blanks.length;

  return {
    correct,
    total,
    accuracy: correct / total,
  };
}

export function BlankDropZone({
  blankId,
  children,
}: {
  blankId: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: blankId,
  });

  return (
    <span
      ref={setNodeRef}
      style={{
        padding: "2px 6px",
        borderBottom: "2px dashed #888",
        background: isOver ? "#e0ffe0" : "transparent",
        minWidth: "40px",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

export function DraggableItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...style,
        padding: "6px 10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        width: "fit-content",
        background: "white",
        cursor: "grab",
        marginBottom: "8px",
      }}
    >
      {label}
    </div>
  );
}

export function DragDropQuiz({
  quiz,
  userAnswers,
  setUserAnswers,
}: {
  quiz: DragAndDropQuizItems;
  userAnswers: Record<string, string>;
  setUserAnswers: Dispatch<SetStateAction<Record<string, string>>>;
}) {
  const { code, blanks, options, instruction } = quiz;
  const { setQuizFeedbackRequest } = useQuizFeeadbackStore();
  const { hint, setHint } = useLearningStore();
  function createFeedbackRequest() {
    const base = `I'm currently doing some quiz, the instruction is to:\n ${instruction}\n`;
    const quizCode = `This the provided code: ${code}\n`;
    const optionsLabel = quiz.options.map((o) => o.label);
    const option = `and this the provided options ${optionsLabel.join(
      ", "
    )}\n\n`;
    const request = `Can you guide me for this question?`;

    return base + quizCode + option + request;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (!over) return;

    const blankId = String(over.id);
    const itemId = String(active.id);

    setUserAnswers((prev) => ({
      ...prev,
      [blankId]: itemId,
    }));
  }

  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        marginBottom: "24px",
      }}
    >
      <div className="flex justify-between">
        <h3 className="mb-[12px]">{instruction}</h3>
        <Button
          onClick={() => {
            setHint(hint + 1);
            setQuizFeedbackRequest(createFeedbackRequest());
          }}
          variant={"destructive"}
        >
          Hint
        </Button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        {/* CODE BLOCK */}
        <pre className="whitespace-pre-wrap leading-relaxed bg-gray-800 text-gray-100 p-3 rounded-md mb-4">
          {code.split(/(___\d+___)/g).map((segment, idx) => {
            const blank = blanks.find((b) => b.placeholder === segment);
            if (!blank) return segment;

            const filledItemId = userAnswers[blank.id];
            const filledItem = options.find((it) => it.id === filledItemId);

            return (
              <BlankDropZone key={idx} blankId={blank.id}>
                {filledItem ? filledItem.label : blank.placeholder}
              </BlankDropZone>
            );
          })}
        </pre>

        {/* OPTIONS */}
        <div className="flex gap-[8px] flex-wrap mt-[12px]">
          {options.map((item) => (
            <DraggableItem key={item.id} id={item.id} label={item.label} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

function SingleQuiz({ quiz }: { quiz: DragAndDropQuizItems }) {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  return (
    <div className="mt-6">
      <DragDropQuiz
        quiz={quiz}
        userAnswers={userAnswers}
        setUserAnswers={setUserAnswers}
      />

      <CodeFillBlankQuiz
        pathId={quiz.id}
        blanks={quiz.blanks}
        userAnswers={userAnswers}
      />
    </div>
  );
}

export function QuizList({ quizzes }: { quizzes: DragAndDropQuizItems[] }) {
  return (
    <div>
      <h3>Quiz</h3>
      <small>Drag you answer on the blank space</small>
      {quizzes.map((q) => (
        <SingleQuiz key={q.id} quiz={q} />
      ))}
    </div>
  );
}
export function CodeFillBlankQuiz({
  pathId,
  blanks,
  userAnswers,
  hintsUsed = 0,
}: {
  pathId: string;
  blanks: DragAndDropBlanks[];
  userAnswers: Record<string, string>;
  hintsUsed?: number;
}) {
  const { recordAttempt, attempts } = useLearningStore();

  const [result, setResult] = useState<{
    correct: number;
    total: number;
    accuracy: number;
  } | null>(null);

  function checkAnswers() {
    let correctCount = 0;

    for (const blank of blanks) {
      const userAnswer = userAnswers[blank.id];
      if (userAnswer === blank.correctItemId) {
        correctCount++;
      }
    }

    const total = blanks.length;
    const accuracy = total === 0 ? 0 : correctCount / total;
    const prev = attempts?.[pathId];

    const summary = {
      correct: correctCount,
      total,
      accuracy,
      hintsUsed,
      attempts: 1,
      locked: accuracy === 1,
    };
    if (!prev) {
      recordAttempt(pathId, summary);
    } else if (!prev.locked) {
      const attemptsCount = prev.attempts + 1;
      const averagedAccuracy =
        (prev.accuracy * prev.attempts + accuracy) / attemptsCount;

      const locked = accuracy === 1;

      const updated = {
        correct: correctCount,
        total,
        accuracy: averagedAccuracy,
        attempts: attemptsCount,
        hintsUsed: prev.hintsUsed + hintsUsed,
        locked,
      };

      recordAttempt(pathId, updated);
    }
    setResult(summary);
    // show feedback
  }

  return (
    <div className="mt-4">
      <Button onClick={checkAnswers} disabled={!!attempts?.[pathId]?.locked}>
        Check Your Answer
      </Button>

      {result && (
        <div className="mt-3 p-3 rounded border">
          {result.correct === result.total ? (
            <p className="text-green-600 font-semibold">
              All answers correct! Good job.
            </p>
          ) : (
            <p className="text-red-600 font-semibold">
              {result.correct}/{result.total} correct. Try again!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
