import { CourseFormData } from "@/app/(main)/_schemas/course";

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

export type CourseContext = Pick<
  CourseFormData,
  | "title"
  | "topic"
  | "difficulty_preference"
  | "learning_goal"
  | "prior_knowledge"
>;

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
  estimated_duration: number;
  difficulty: string;
};

// quizContext = ...
