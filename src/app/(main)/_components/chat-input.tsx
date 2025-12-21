import { useContext, useEffect, useRef } from "react";
import { UserProviderContext } from "../_providers/user-provider";
import { Button } from "@/components/ui/button";
import { MdSend } from "react-icons/md";
import { useQuizFeeadbackStore } from "../_stores/use-quiz-feedback-store";
import { AssistantPersonaContext } from "../_providers/assistant-provider";

export function ChatInput({
  formAction,
  pending,
  pushNewMessage,
  courseId,
  quizId,
}: {
  formAction: (payload: FormData) => void;
  pending: boolean;
  pushNewMessage: (message: string, sender: "user" | "bot") => void;
  courseId?: string;
  quizId?: string;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const userContext = useContext(UserProviderContext);
  const assistanContext = useContext(AssistantPersonaContext);
  const { feedbackRequest, setQuizFeedbackRequest } = useQuizFeeadbackStore();

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const value = target.innerText.trim();
    if (textAreaRef.current) textAreaRef.current.value = value;
    if (target.innerHTML === "<br>") target.innerHTML = "";
  };

  // if pending state change there's an input action
  useEffect(() => {
    if (pending && divRef.current) {
      const newMessage = divRef.current.innerText.trim();
      pushNewMessage(newMessage, "user");
      divRef.current.innerText = "";
      return;
    }
  }, [pending, pushNewMessage]);

  // TO DO: MERGE ALL FLOW AUTOMATION AS A WHOLE WORKING PROCESS
  useEffect(() => {
    if (
      feedbackRequest &&
      !pending &&
      textAreaRef.current &&
      buttonRef.current
    ) {
      textAreaRef.current.value = feedbackRequest;
      buttonRef.current.click();
      pushNewMessage(feedbackRequest, "user");
      setQuizFeedbackRequest("");
    }
  }, [feedbackRequest, setQuizFeedbackRequest, pending]);

  return (
    <div className="flex items-center w-full">
      <form ref={formRef} className="h-full w-full" action={formAction}>
        <textarea name="message" ref={textAreaRef} className="hidden" />
        <input name="user_id" type="hidden" value={userContext?.user?.id} />
        <input name="course_id" type="hidden" value={courseId} />
        <input name="quiz_id" type="hidden" value={quizId} />
        <div className="flex justify-between gap-1">
          <div
            ref={divRef}
            contentEditable="plaintext-only"
            onInput={handleInput}
            data-placeholder={`Ask ${
              assistanContext?.persona?.name || "me"
            } anything`}
            className="py-2 px-4 bg-secondary rounded-l-2xl outline-0 text-sm flex-1 md:max-h-[200px] max-h-[100px] overflow-y-auto custom-scrollbar"
          />
          <div className="flex flex-col justify-end">
            <Button
              ref={buttonRef}
              type="submit"
              size={"icon"}
              className="rounded-l-none"
            >
              <MdSend />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
