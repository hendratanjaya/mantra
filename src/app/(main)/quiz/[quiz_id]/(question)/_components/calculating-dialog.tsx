"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { randomInsults } from "../_constants";
import Markdown from "react-markdown";
import { useQuizFeeadbackStore } from "@/app/(main)/_stores/use-quiz-feedback-store";
import { AnswerList, Question } from "@/lib/openai/type";

export function CalculatingDialog({
  wrongQuestions,
  open,
  onOpenChange,
  reset,
}: {
  wrongQuestions: {
    questionData: Question;
    userAnswer: string;
    actualAnswer: string;
  }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reset: () => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  const { setQuizFeedbackRequest } = useQuizFeeadbackStore();

  const handleNext = useCallback(() => {
    if (api && current < count) api.scrollNext();
  }, [api, current, count]);

  const handlePrev = useCallback(() => {
    if (api && current > 1) api.scrollPrev();
  }, [api, current]);

  const parsedWrongQuestions = useMemo(() => {
    return wrongQuestions.map((q) => ({
      ...q,
      parsedAnswerList: JSON.parse(q.questionData.answer_list) as AnswerList[],
      question: q.questionData.question,
    }));
  }, [wrongQuestions]);

  const getRandomInsults = (acc: number) => {
    const accumulate = String(acc);
    const randomInsultResponse = randomInsults[accumulate] || [];

    const insult =
      randomInsultResponse[
        Math.floor(Math.random() * randomInsultResponse.length)
      ];

    return insult;
  };

  const insult = useMemo(
    () => getRandomInsults(parsedWrongQuestions.length),
    [parsedWrongQuestions]
  );

  const createFeedbackRequest = () => {
    const base = `I just finish my quiz and got ${count} question(s) wrong\n\n`;

    const questions = parsedWrongQuestions.map((question, idx) => {
      const userAnswer = question.parsedAnswerList.find(
        (list) => list.key === question.userAnswer
      )?.label;
      const actualAnswer = question.parsedAnswerList.find(
        (list) => list.key === question.actualAnswer
      )?.label;
      return (
        `- Question ${idx + 1}:\n` +
        `question: ${question.question}\n\n` +
        `My answer: ${userAnswer}\n` +
        `The right answer: ${actualAnswer}\n\n`
      );
    });

    return base + questions.join("");
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) reset();
      }}
    >
      <DialogContent className="flex flex-col max-w-[425px] max-h-[85vh] md:max-w-[50vw] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Let&apos;s see what you cooked...
          </DialogTitle>
          <span className="font-normal">
            <Markdown>
              {count
                ? `You get ${count} question(s) wrong. ${insult}`
                : `${insult}`}
            </Markdown>
          </span>
        </DialogHeader>
        <div className="flex w-full">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {parsedWrongQuestions.map((wrongQuestion, idx) => {
                const answerList = wrongQuestion.parsedAnswerList;
                return (
                  <CarouselItem key={idx}>
                    <Card className="h-full bg-muted/40">
                      <CardHeader className="">
                        <span className="text-l md:text-2xl font-semibold">
                          {wrongQuestion.question}
                        </span>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center p-6 gap-3">
                        {answerList.map((answer) => {
                          const { key, label } = answer;
                          const isSelected = wrongQuestion.userAnswer === key;
                          const isCorrectAnswer =
                            wrongQuestion.actualAnswer === key;
                          return (
                            <div
                              key={key}
                              className={`bg-card/50 border rounded-xl p-3 w-full text-left ${
                                isSelected &&
                                "bg-destructive/20 border-destructive"
                              } ${
                                isCorrectAnswer &&
                                "bg-primary/20 border-primary"
                              }`}
                            >
                              <span className="mr-2">{key}.</span>
                              {label}
                            </div>
                          );
                        })}
                      </CardContent>
                      <CardFooter className="flex-1 items-end">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            <Button
                              type="button"
                              size="icon-lg"
                              variant={"outline"}
                              onClick={() => handlePrev()}
                              className={current < 2 ? "opacity-0" : ""}
                            >
                              <ChevronLeft />
                            </Button>
                          </div>
                          <div>
                            {current <= count && (
                              <Button
                                type="button"
                                size={current === count ? undefined : "icon-lg"}
                                variant={"outline"}
                                className={current === count ? "opacity-0" : ""}
                                onClick={() => {
                                  if (current < count) handleNext();
                                }}
                              >
                                <ChevronRight />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className={count === 0 ? "hidden" : "block"}
              onClick={() => {
                if (count !== 0)
                  setQuizFeedbackRequest(createFeedbackRequest());
              }}
            >
              Get feed back
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
