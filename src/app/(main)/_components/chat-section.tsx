"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Chat, Course } from "@/generated/prisma";
import {
  useActionState,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MessageStateResponse } from "../course/type";
import { toast } from "sonner";
import { AssistantPersonaContext } from "../_providers/assistant-provider";
import { ChatContext, ChatHistory, Metadata } from "@/lib/openai/type";
import { CourseContentContext } from "../course/[course_id]/_providers/course-content-provider";
import { useParams } from "next/navigation";
import { ChatBubble } from "./chat-bubble";
import { ChatInput } from "./chat-input";
import { ChatHistoryContext } from "../_providers/chat-history-provider";
import { QuizQuestionContext } from "../quiz/_providers/quiz-question-provider";
import { ActiveQuestionContext } from "../quiz/_providers/active-quiz-provider";
import { UserProviderContext } from "../_providers/user-provider";
import { sendMessageToAI } from "../action";
import { SummaryContentContext } from "../summarize/_providers/summary-content-provider";

// THE MAIN COMPONENT
export function ChatSection({
  mode,
  type,
}: {
  mode: "regular" | "course" | "quiz";
  type?: "summary";
}) {
  const { course_id, content_id, quiz_id } = useParams();
  const courseId = course_id ? String(course_id) : undefined;
  const contentId = content_id ? String(content_id) : undefined;
  const quizId = content_id ? String(quiz_id) : undefined;

  //global context used
  const chatHistoryContext = useContext(ChatHistoryContext);
  const assistanContext = useContext(AssistantPersonaContext);
  const courseContentContext = useContext(CourseContentContext);
  const quizQuestionContext = useContext(QuizQuestionContext);
  const courseSummary = useContext(SummaryContentContext);
  const userContext = useContext(UserProviderContext);

  const currentCourseContent = courseContentContext.find(
    (content) => content.id === contentId
  );
  const activeQuestionContext = useContext(ActiveQuestionContext);

  const [chatHistory, setChatHistory] =
    useState<Pick<Chat, "message" | "sender">[]>(chatHistoryContext);
  const bottomRef = useRef<HTMLDivElement>(null);

  // const metadata =
  //   mode === "course" && !type
  //     ? currentCourseContent?.metadata || ""
  //     : mode === "quiz"
  //     ? quizQuestionContext?.metadata || ""
  //     : "";

  let metadata = "";
  if (mode === "course" && type === "summary")
    metadata = generateMetadataForCourseSummary(courseSummary);
  else if (mode === "course") metadata = currentCourseContent?.metadata || "";
  else if (mode === "quiz") metadata = quizQuestionContext?.metadata || "";

  const [state, formAction, pending] = useActionState(
    async (prevSate: MessageStateResponse | null, formData: FormData) => {
      //duct tape for tracking active question... not sure if this the right thing to do
      const activeQuestionId = activeQuestionContext?.current;
      const currentQuizContent = quizQuestionContext?.quizQuestion.find(
        (question) => question.id === activeQuestionId
      );

      const lastFiveChat = chatHistory.slice(-5, chatHistory.length);
      const context = createContext(
        mode,
        metadata,
        lastFiveChat
        // currentQuizContent?.question
      );
      return sendMessageToAI(
        prevSate,
        formData,
        context,
        assistanContext!,
        mode
      );
    },
    null
  );

  const pushNewMessage = useCallback(
    (message: string, sender: "bot" | "user") => {
      if (message.trim()) {
        setChatHistory((prev) => [
          ...prev,
          { message: message.trim(), sender },
        ]);
      }
    },
    []
  );

  useEffect(() => {
    if (state && !!state.message) {
      if (!state.error) {
        pushNewMessage(state.message, "bot");
        return;
      }
      toast.error(state.message);
      return;
    }
  }, [state, pushNewMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <Card className="h-full md:rounded-none border-none gap-0 py-0 pt-3 overflow-hidden">
      <CardHeader>
        <div className="flex w-full h-full items-center gap-5">
          <div>
            <Avatar>
              <AvatarImage src={"https://github.com/shadcn.png"} />
            </Avatar>
          </div>
          AssistantName
        </div>
      </CardHeader>
      <CardContent className="w-full h-full bg-destructive p-3 space-y-3.5 overflow-y-auto custom-scrollbar">
        {chatHistory.map((chat, idx) => (
          <ChatBubble
            key={chat.sender + idx}
            chat={chat}
            useAnimation={
              !!state?.isNewMessage &&
              idx === chatHistory.length - 1 &&
              chat.sender === "bot"
            }
          />
        ))}
        {pending && (
          <ChatBubble chat={{ message: "", sender: "bot" }} pending={pending} />
        )}
        <div ref={bottomRef} />
      </CardContent>
      <CardFooter className="p-2 w-full">
        <ChatInput
          formAction={formAction}
          pending={pending}
          pushNewMessage={pushNewMessage}
          courseId={mode === "course" ? courseId : undefined}
          quizId={mode === "quiz" ? quizId : undefined}
        />
      </CardFooter>
    </Card>
  );
}

/**
 * Helper for create context to send to LLM
 * @param {string} metadata if parameter "type" is filled metadata is the summary content not stringified metadata
 */
function createContext(
  mode: "regular" | "course" | "quiz",
  metadata: string,
  chatHistory: ChatHistory[],
  quizQuestion?: string
): ChatContext {
  const parsed = mode !== "regular" ? (JSON.parse(metadata) as Metadata) : null;

  const metadataDescriptions = {
    regular: metadata || "No specific context provided",
    course: parsed
      ? [
          `Lesson ${parsed.order}: ${parsed.title}`,
          `Difficulty: ${parsed.difficulty}`,
          `Duration: ~${parsed.estimated_duration || "not specified"} hours`,
          `\nKey Concepts:`,
          ...parsed.key_concepts.map((concept) => `  -${concept}`),
          `\nLearning Objective: ${parsed.learning_objective}`,
          `\nLesson Overview: ${parsed.description}`,
        ].join("\n")
      : "No course context available",

    quiz: parsed
      ? [
          `Quiz for Lesson ${parsed.order}: ${parsed.title}`,
          `Difficulty: ${parsed.difficulty}`,
          `Current active question: ${quizQuestion || "no question provided"}`,
          `\nTopics to be discussed:`,
          ...parsed.key_concepts.map((concept) => `  -${concept}`),
          `\nLearning Objective: ${parsed.learning_objective}`,
        ].join("\n")
      : "No quiz context available",
  };

  const titles = {
    regular: "Reqular chat session",
    course: "Course-specific chat session",
    quiz: "Quiz chat session",
  };

  const descriptions = {
    regular:
      "General conversation mode. The assistant provides helpful answers on any topic, " +
      "with a focus on educational content and study-related questions.",
    course: parsed
      ? `Currently teaching lesson ${parsed.order} of the course. ` +
        `This ${
          parsed.difficulty
        }-level lesson focuses on: ${parsed.key_concepts.join(", ")}. ` +
        `Help the student achieve this goal: ${parsed.learning_objective}`
      : "Course-guided learning session focused on the provided material.",

    quiz: parsed
      ? `Quiz session for lesson ${parsed.order}. ` +
        `Test the student's understanding of: ${parsed.key_concepts.join(
          ", "
        )}. ` +
        `Evaluate if they've achieved: ${parsed.learning_objective}. ` +
        `Provide clear feedback and explanations for each question.`
      : "Interactive quiz session to test understanding of the lesson material.",
  };

  return {
    title: titles[mode],
    description: descriptions[mode],
    metadata: metadataDescriptions[mode],
    chatHistory,
  };
}

function generateMetadataForCourseSummary(course: Course | null): string {
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
