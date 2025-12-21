export type StateResponse = {
  error: boolean;
  message: string | null;
};

export type MessageStateResponse = StateResponse & {
  isNewMessage?: boolean;
};

export type CourseFormStateResponse = StateResponse & {
  field: string | null;
};

export type GenerateQuizResponse = StateResponse & {
  quiz: string | null;
};

export type CourseFieldControllerType = {
  name:
    | "content_option"
    | "programming_language"
    | "difficulty_preference"
    | "learning_goal"
    | "prior_knowledge";
  label: string;
  maxChar?: number;
  placeholder: string;
  description?: string;
  isTextArea?: boolean;
  isSelect?: boolean;
};

export type CourseSelectField =
  | "content_option"
  | "programming_language"
  | "difficulty_preference";
