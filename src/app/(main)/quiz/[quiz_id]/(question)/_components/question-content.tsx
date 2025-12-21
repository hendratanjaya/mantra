"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { QuizQuestionContext } from "../../../_providers/quiz-question-provider";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonClickResponses } from "../_constants";
import Markdown from "react-markdown";
import { CalculatingDialog } from "./calculating-dialog";
import { ActiveQuestionContext } from "../../../_providers/active-quiz-provider";
import { AnswerList, Metadata, Question } from "@/lib/openai/type";
import { useBreadcrumbStore } from "@/app/(main)/_stores/use-breadcrumb-store";

export function QuestionContent() {
  const quizContext = useContext(QuizQuestionContext);
  const questionContext = useContext(ActiveQuestionContext);

  const { quiz_id } = useParams();

  const router = useRouter();

  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  const [calculating, setCalculating] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<
    { questionData: Question; userAnswer: string; actualAnswer: string }[]
  >([]);

  const [selected, setSelected] = useState<Record<string, string>>({});
  const [filler, setFiller] = useState<Record<string, string>>({});

  const parsedQuestions = useMemo(() => {
    if (quizContext)
      return quizContext.quizQuestion.map((q) => ({
        ...q,
        answer_list: JSON.parse(q.answer_list) as AnswerList[],
      }));
    else return [];
  }, [quizContext]);

  const handleNext = useCallback(() => {
    if (api && current < count) {
      api.scrollNext();
    }
  }, [api, current, count]);

  const handlePrev = useCallback(() => {
    if (api && current > 1) api.scrollPrev();
  }, [api, current]);

  const scrollTo = (page: number) => {
    if (api) api.scrollTo(page);
  };

  const handleSubmit = () => {
    const quizQuestions = quizContext?.quizQuestion || [];
    for (let i = 0; i < quizQuestions.length; ++i) {
      const question = quizQuestions[i];
      if (!selected[question.id]) {
        scrollTo(i);
        setFiller((prev) => ({
          ...prev,
          [question.id]: "Heyy, you forget this one!",
        }));
        return;
      }
    }

    for (const question of quizQuestions) {
      const userAnswer = selected[question.id];
      const actualAnswer = question.answer;

      const correct = userAnswer === actualAnswer;
      if (!correct) {
        setWrongQuestions((prev) => [
          ...prev,
          { questionData: question, userAnswer, actualAnswer },
        ]);
      }
    }

    setCalculating(true);
  };

  const reset = () => {
    setCalculating(false);
    setWrongQuestions([]);
    setSelected({});
    setFiller({});
    scrollTo(0);
  };

  useEffect(() => {
    if (parsedQuestions.length === 0) {
      router.push("/dashboard");
    }
    if (current) {
      console.log({ current });
      questionContext!.current = parsedQuestions[current - 1].id;
    }
  }, [current, parsedQuestions, questionContext, router]);

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

  const { setItems, reset: resetBreadCrumb } = useBreadcrumbStore();
  useEffect(() => {
    const metadata = quizContext?.metadata;
    if (metadata) {
      try {
        const parsed = JSON.parse(metadata) as Metadata;
        if (parsed?.title)
          setItems([
            { href: "/quiz", label: "Quiz" },
            { href: `/quiz/${String(quiz_id)}`, label: parsed.title },
          ]);
      } catch (_) {
        return;
      }
    }

    return () => resetBreadCrumb();
  }, []);

  return (
    <>
      <CalculatingDialog
        open={calculating}
        onOpenChange={setCalculating}
        wrongQuestions={wrongQuestions}
        reset={reset}
      />
      <div className="flex flex-1 h-full items-center justify-center">
        <Carousel setApi={setApi} className="h-full w-full">
          <CarouselContent className="h-full">
            {parsedQuestions.map((quizQ) => {
              const answerList = quizQ.answer_list;
              return (
                <CarouselItem key={quizQ.id} className="h-full">
                  <Card className="h-full bg-muted/40 border-none rounded-none">
                    <CardHeader className="">
                      <span className="text-xl md:text-3xl font-medium">
                        <Markdown>{quizQ.question}</Markdown>
                      </span>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center p-6 gap-3">
                      {answerList.map((answer, idx) => {
                        const { key, label } = answer;
                        const isSelected = selected[quizQ.id] === key;
                        return (
                          <button
                            key={key + idx}
                            onClick={() => {
                              setSelected((prev) => ({
                                //marker for button
                                ...prev,
                                [quizQ.id]: key,
                              }));

                              const randomFiller = //filler for empty space
                                buttonClickResponses[
                                  Math.floor(
                                    Math.random() * buttonClickResponses.length,
                                  )
                                ];

                              setFiller((prev) => ({
                                ...prev,
                                [quizQ.id]: randomFiller,
                              }));
                            }}
                            className={`bg-card/50 border rounded-xl p-3 w-full text-left ${
                              isSelected
                                ? "bg-primary/20 border-primary"
                                : "hover:bg-muted/70"
                            }`}
                          >
                            <span className="mr-2 flex items-center">
                              <Markdown>{`${key}. ${label}`}</Markdown>
                            </span>
                          </button>
                        );
                      })}
                    </CardContent>
                    <CardFooter className="flex-1 flex-col justify-between items-center">
                      <span>
                        {filler[quizQ.id] && (
                          <Markdown>{filler[quizQ.id]}</Markdown>
                        )}
                      </span>
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
                        <span className="font-normal text-sm">
                          Question {current} out of {count} questions
                        </span>
                        <div>
                          {current <= count && (
                            <Button
                              type="button"
                              size={current === count ? undefined : "icon-lg"}
                              variant={"outline"}
                              onClick={() => {
                                if (current < count) handleNext();
                                else handleSubmit();
                              }}
                            >
                              {current < count ? (
                                <ChevronRight />
                              ) : (
                                <span>Submit</span>
                              )}
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
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
    </>
  );
}
