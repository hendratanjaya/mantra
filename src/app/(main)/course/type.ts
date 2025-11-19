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

export type CourseFieldControllerType = {
  name:
    | "title"
    | "topic"
    | "content_type"
    | "content_text"
    | "content_file"
    | "content_url"
    | "difficulty_preference"
    | "learning_goal"
    | "prior_knowledge";
  label: string;
  maxChar?: number;
  placeholder: string;
  description?: string;
  isTextArea?: boolean;
};
