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
import { sendMessageToAI } from "../action";
import { SummaryContentContext } from "../summaries/_providers/summary-content-provider";
import { avatarImageList } from "../_constants";
import { useChatStore } from "../_stores/use-chat-store";

// THE MAIN COMPONENT
export function ChatSection({
  mode,
  type,
}: {
  mode: "regular" | "course" | "quiz";
  type?: "summary";
}) {
  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

  const { course_id, summary_id, content_id, quiz_id } = useParams();
  const courseId = course_id ? String(course_id) : summary_id ? String(summary_id) : undefined;
  const contentId = content_id ? String(content_id) : undefined;
  const quizId = quiz_id ? String(quiz_id) : undefined;

  //global context used
  const chatHistoryContext = useContext(ChatHistoryContext);
  const { persona: assistanContext } = useContext(AssistantPersonaContext)!;
  const courseContentContext = useContext(CourseContentContext)!;
  const quizQuestionContext = useContext(QuizQuestionContext);
  const courseSummary = useContext(SummaryContentContext);

  const contentList = courseContentContext?.contentList || [];

  const currentCourseContent = contentList.find(
    (content) => content.id === contentId
  );
  const activeQuestionContext = useContext(ActiveQuestionContext);

  const { generating, setGenerating } = useChatStore();

  const [chatHistory, setChatHistory] =
    useState<Pick<Chat, "message" | "sender">[]>(chatHistoryContext);
  const [useAnimation, setUseAnimation] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

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
        lastFiveChat,
        currentQuizContent?.question
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
    setGenerating(pending);
  }, [pending]);

  useEffect(() => {
    if (state && !!state.message) {
      if (!state.error) {
        setUseAnimation(true);
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

  useEffect(() => {
    const idx = Math.floor(Math.random() * avatarImageList.length);
    setAvatarImage(avatarImageList[idx]);
    setChatHistory(chatHistoryContext);
  }, []);

  return (
    <Card className="h-full md:rounded-none border-none gap-0 py-0 pt-3 overflow-hidden">
      <CardHeader>
        <div className="flex w-full h-full items-center gap-5">
          <div>
            <Avatar>
              <AvatarImage
                src={avatarImage || undefined}
                alt={"https://github.com/shadcn.png"}
              />
            </Avatar>
          </div>
          {assistanContext?.name}
        </div>
      </CardHeader>
      <CardContent className="w-full h-full bg-primary p-3 overflow-y-auto custom-scrollbar space-y-3.5">
        {chatHistory.length === 0 && !generating ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3 opacity-70">
            <div className="text-sm text-muted-foreground">
              Ask {assistanContext?.name}.
            </div>
          </div>
        ) : (
          <>
            {chatHistory.map((chat, idx) => (
              <ChatBubble
                key={chat.sender + idx}
                chat={chat}
                useAnimation={
                  idx === chatHistory.length - 1 &&
                  chat.sender === "bot" &&
                  useAnimation
                }
                setUseAnimation={setUseAnimation}
              />
            ))}

            {generating && (
              <ChatBubble
                chat={{ message: "", sender: "bot" }}
                pending={generating}
              />
            )}
          </>
        )}
        <div ref={bottomRef} />
      </CardContent>

      <CardFooter className="p-2 w-full">
        <ChatInput
          formAction={formAction}
          pending={generating}
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
