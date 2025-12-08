import { CourseFieldControllerType } from "../type";

export const courseFormFields: CourseFieldControllerType[] = [
  {
    name: "title",
    label: "Course Title",
    placeholder: "Input course title",
    maxChar: 100,
  },
  {
    name: "topic",
    label: "Course Topic",
    placeholder: "Whats this course about?",
    maxChar: 100,
    description: "Quick brief of topic you want to learn",
  },
  {
    name: "content_type",
    label: "Content Type",
    placeholder: "",
    description: "Pick type of content to provide as additional context",
  },
  {
    name: "content_text",
    label: "Content",
    placeholder: "Reference",
    isTextArea: true,
  },
  {
    name: "content_file",
    label: "Content File",
    placeholder: "Reference to file",
    description:
      "File that relevant with topic you want to learn, this will help your assistant to understand and generate relevant topic (.pdf or .txt) ",
  },
  {
    name: "difficulty_preference",
    label: "Difficulty Preference",
    placeholder: "What difficulty you want for conten to be generated?",
  },
  {
    name: "learning_goal",
    label: "Learning Goal",
    placeholder: "Your learning goal for this learning material",
    maxChar: 500,
    isTextArea: true,
  },
  {
    name: "prior_knowledge",
    label: "Prior Knowledge",
    placeholder: "How much you understand about given material?",
    maxChar: 500,
    isTextArea: true,
  },
];

export const difficutlyPreferencesList = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const contentTypeList = [
  { value: "content_text", label: "Plain Text" },
  { value: "content_file", label: "File" },
];
