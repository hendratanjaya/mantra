import { CourseFormData } from "@/app/(main)/_schemas/course";

export type ValidRoles = "user" | "developer" | "assistant" | "system";

export type AssistantContext = {
  name: string;
  style: keyof PromptStyleGuidance;
  description: string;
  tone: keyof PromptToneGuidance;
  depth: keyof PromptDepthGuidance;
  language: string;
};

export type ChatHistory = {
  sender: string;
  message: string;
};

export type ChatContext = {
  title: string;
  metadata: string;
  description: string;
  chatHistory: ChatHistory[];
};

export type CourseContext = CourseFormData;

export type PromptToneGuidance = {
  friendly: string;
  professional: string;
  casual: string;
  encouraging: string;
  neutral: string;
};

export type PromptStyleGuidance = {
  concise: string;
  detailed: string;
  conversational: string;
  structured: string;
  socratic: string;
};

export type PromptDepthGuidance = {
  surface: string;
  intermediate: string;
  deep: string;
  adaptive: string;
};

export type CourseMetadata = {
  course_metadata: Metadata[];
};
export type Metadata = {
  order: number;
  title: string;
  description: string;
  key_concepts: string[];
  learning_objective: string;
  difficulty: string;
};

export type QuizContext = {
  content_metadata: string; // stringified Metadata
  language: string;
};

export type QuizQuestions = {
  quiz_questions: Question[];
};

export type Question = {
  question: string;
  answer: string;
  answer_list: string;
};

export type AnswerList = {
  key: string;
  label: string;
};

export type DragAndDropQuiz = {
  quizzes: DragAndDropQuizItems[];
};

export type DragAndDropQuizItems = {
  blanks: DragAndDropBlanks[];
  code: string;
  id: string;
  instruction: string;
  options: DragAndDropOptions[];
};

export type DragAndDropBlanks = {
  correctItemId: string;
  id: string;
  placeholder: string;
};

export type DragAndDropOptions = {
  id: string;
  label: string;
};
