"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Chat } from "@/generated/prisma";
import {
  useActionState,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { sendMessageToAI } from "../course/action";
import { MessageStateResponse } from "../course/type";
import { toast } from "sonner";
import { ChatHistoryContext } from "../course/[course_id]/_providers/chat-history-provider";
import { AssistantPersonaContext } from "../_providers/assistant-provider";
import { ChatContext, ChatHistory, Metadata } from "@/lib/openai/type";
import { CourseContentContext } from "../course/[course_id]/_providers/course-content-provider";
import { useParams } from "next/navigation";
import { ChatBubble } from "./chat-bubble";
import { ChatInput } from "./chat-input";

// THE MAIN COMPONENT
export function ChatSection({ mode }: { mode: "regular" | "course" | "quiz" }) {
  const { course_id, content_id } = useParams();
  const courseId = course_id ? course_id.toString() : undefined;
  const contentId = content_id ? content_id.toString() : undefined;

  //global context used
  const conversation = useContext(ChatHistoryContext);
  const assistanContext = useContext(AssistantPersonaContext);
  const courseContentContext = useContext(CourseContentContext);

  const currentCourseContent = courseContentContext.find(
    (content) => content.id === contentId
  );
  const conversationRef =
    useRef<Pick<Chat, "message" | "sender">[]>(conversation);
  const [renderTracker, triggerRender] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatHistory = Array.from(conversationRef.current || []);

  const metadata =
    mode !== "regular" ? currentCourseContent?.metadata || "" : "";

  const [state, formAction, pending] = useActionState(
    async (prevSate: MessageStateResponse | null, formData: FormData) => {
      // TO-DO: FIX THE DAMN FUNCTION SO IT CAN REPLIES BASED ON CURRENT CONTEXT
      const lastFiveChat = chatHistory.slice(-5, chatHistory.length);
      const context = createContext(mode, metadata, lastFiveChat);
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
        conversationRef.current.push({ message: message.trim(), sender });
        triggerRender((n) => ++n);
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
  }, [renderTracker]);

  return (
    <Card className="h-full md:rounded-none border-none gap-0 py-0 pt-3 overflow-hidden">
      <CardHeader>
        <div className="flex w-full h-full items-center gap-5">
          <div>
            <Avatar>
              <AvatarImage src={"https://github.com/shadcn.png"} />
            </Avatar>
          </div>
          Lilith
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
          quizId={mode === "quiz" ? "" : undefined}
        />
      </CardFooter>
    </Card>
  );
}

/**
 * Helper for create context to send to LLM
 */
function createContext(
  mode: "regular" | "course" | "quiz",
  metadata: string,
  chatHistory: ChatHistory[]
): ChatContext {
  const parsed = mode !== "regular" ? (JSON.parse(metadata) as Metadata) : null;

  const metadataDescriptions = {
    regular: metadata || "No specific context provided",

    course: parsed
      ? [
          `Lesson ${parsed.order}: ${parsed.title}`,
          `Difficulty: ${parsed.difficulty}`,
          `Duration: ~${parsed.estimated_duration} hours`,
          `\nKey Concepts:`,
          ...parsed.key_concepts.map((concept) => `  • ${concept}`),
          `\nLearning Objective: ${parsed.learning_objective}`,
          `\nLesson Overview: ${parsed.description}`,
        ].join("\n")
      : "No course context available",

    quiz: parsed
      ? [
          `Quiz for Lesson ${parsed.order}: ${parsed.title}`,
          `Difficulty: ${parsed.difficulty}`,
          `\nTopics to be tested:`,
          ...parsed.key_concepts.map((concept) => `  • ${concept}`),
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
        `Provide clear feedback and explanations for each answer.`
      : "Interactive quiz session to test understanding of the lesson material.",
  };

  return {
    title: titles[mode],
    description: descriptions[mode],
    metadata: metadataDescriptions[mode],
    chatHistory,
  };
}
