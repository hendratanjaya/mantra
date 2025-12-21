import { RefObject, useEffect, useRef, useState } from "react";
import { BsDot } from "react-icons/bs";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

function MarkdownRenderer({ text }: { text: string }) {
  return (
    <span className="markdown-chat-body">
      <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>{text}</Markdown>
    </span>
  );
}

export function ChatBubble({
  chat,
  pending,
  useAnimation,
  setUseAnimation,
}: {
  chat: { message: string; sender: string };
  pending?: boolean;
  useAnimation?: boolean;
  setUseAnimation?: (animated: boolean) => void;
}) {
  const LoadingChat = () => (
    <div className="flex items-center">
      {Array.from({ length: 3 }).map((item, idx) => (
        <span key={idx} className={`animate-dot delay-${idx}`}>
          <BsDot strokeWidth={3} />
        </span>
      ))}
    </div>
  );
  const TypingMessage = ({ text }: { text: string }) => {
    const [messageDisplayed, setMessageDisplayed] = useState("");
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
      setMessageDisplayed("");
      let i = 0;

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        if (i < text.length) {
          const charToAdd = text[i];
          setMessageDisplayed((prev) => prev + charToAdd);
          i++;
        } else {
          if (setUseAnimation) setUseAnimation(false);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 10);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [text]);

    return <MarkdownRenderer text={messageDisplayed} />;
  };
  return (
    <div
      className={`w-full flex ${
        chat.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <span
        className={`max-w-[80%] ${
          pending ? "bg-transparent" : "bg-card"
        }  p-1.5 rounded-sm text-sm whitespace-pre-wrap`}
      >
        {pending ? (
          <LoadingChat />
        ) : useAnimation ? (
          <TypingMessage text={chat.message} />
        ) : chat.sender === "bot" ? (
          <MarkdownRenderer text={chat.message} />
        ) : (
          chat.message
        )}
      </span>
    </div>
  );
}
