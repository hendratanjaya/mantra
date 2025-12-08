import { SummaryFieldControllerType } from "../type";

export const summaryFormFields: SummaryFieldControllerType[] = [
  {
    name: "title",
    label: "Course Title",
    placeholder: "Input course title",
    maxChar: 50,
  },
  {
    name: "topic",
    label: "Course Topic",
    placeholder: "Whats this course about?",
    maxChar: 100,
    description: "Quick brief of topic you want to learn",
  },
  {
    name: "content_file",
    label: "Content File",
    placeholder: "File to summarize",
    description:
      "File that relevant with topic you want to learn, this will help your assistant to understand and generate relevant topic (.pdf or .txt) ",
  },
];
