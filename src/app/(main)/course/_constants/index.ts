import { CourseFieldControllerType } from "../type";

export const courseFormFields: CourseFieldControllerType[] = [
  {
    name: "content_option",
    label: "Material",
    placeholder: "Pick learning material",
    description: "Pick type of content to provide as additional context",
    isSelect: true,
  },
  {
    name: "programming_language",
    label: "Programming Languange",
    placeholder: "Programming language to learn",
    description: "Pick your preferred programming language to learn",
    isSelect: true,
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

// const difficutlyPreferencesList = [
//   { value: "beginner", label: "Beginner" },
//   { value: "intermediate", label: "Intermediate" },
// ];

const programmingLanguageList = [
  { value: "java", label: "Java Programming" },
  { value: "C", label: "C Programming" },
  { value: "javascript", label: "Javascript Programming" },
];

const contentOptionList = [
  {
    value: "variables and data types",
    label: "Varibles and data types",
  },
  {
    value: "operator and expressions",
    label: "Operator and Expressions",
  },
  {
    value: "coditionals",
    label: "Conditionals",
  },
  {
    value: "looping",
    label: "Looping",
  },
  {
    value: "array",
    label: "Array",
  },
  {
    value: "input and output",
    label: "Input and Output",
  },
];

export const fielWithOptions = {
  programming_language: programmingLanguageList,
  // difficulty_preference: difficutlyPreferencesList,
  content_option: contentOptionList,
};
