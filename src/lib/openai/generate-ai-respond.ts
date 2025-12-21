import { openai } from "@/utils/openai";
import {
  AssistantContext,
  ChatContext,
  ChatHistory,
  CourseContext,
  Metadata,
  QuizContext,
  ValidRoles,
} from "./type";
import {
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from "openai/resources/index.mjs";
import {
  getDepthGuidance,
  getPdfInfo,
  getStructureGuidelines,
  getToneGuidance,
} from "./helper";
import { logger } from "@/utils/logger";
import { UserException } from "../utils";
import { QuizResult } from "@/app/(main)/course/_stores/use-learning-store";

async function getRespond(
  model: string,
  messages: ChatCompletionMessageParam[],
  responseFormat?: ResponseFormatJSONSchema,
  mode: "chat" | "content" = "chat",
  usePlugin: boolean = false
): Promise<string> {
  try {
    if (mode === "chat") {
      const completion = await openai.chat.completions.create({
        model,
        messages,
        ...(usePlugin && {
          plugins: [
            {
              id: "file-parser",
              pdf: {
                engine: "mistral-ocr",
              },
            },
          ],
        }),
      });
      return completion.choices[0].message.content || "";
    }

    if (mode === "content") {
      console.log("is in the request...");
      const completion = await openai.chat.completions.parse({
        model,
        messages,
        response_format: responseFormat,
      });
      // console.dir(completion.choices[0].message, { depth: null });
      const content = completion.choices[0].message.parsed;
      if (!content)
        throw new Error(`Failed to generate learning content:${content}`);

      return JSON.stringify(content);
    }

    return "";
  } catch (error) {
    logger.error(error);

    return "";
  }
}

function generateChatHistory(chatHistory: ChatHistory[]) {
  return chatHistory.slice(-5).map((chat) => ({
    role: (chat.sender === "user" ? "user" : "assistant") as ValidRoles,
    content: chat.message,
  }));
}

export async function generateAIRespondForRegularChat(
  question: string,
  assistantContext: AssistantContext,
  context: ChatContext
) {
  const { OPENROUTER_CHAT_PRESET: model } = process.env;
  const {
    name,
    style,
    description: assistantDescription,
    tone,
    language,
  } = assistantContext;
  const { title, description, chatHistory } = context;

  const history = generateChatHistory(chatHistory);
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "developer",
      content:
        `# Identity & Context\n` +
        `You are ${name}. ${assistantDescription}\n\n` +
        `Currently guiding the user through: "${title}"\n` +
        `Progress: ${description}\n\n` +
        `# User Preferences (apply within the absolute rules)\n` +
        `- Communication Tone: ${tone}\n` +
        `- Teaching Style: ${style}\n` +
        `- Language: ${language} (ALWAYS respond in this language, regardless of what language the user writes in)\n\n` +
        `# Conversation History (Use conversation history as your guide to give user relevant response IF the current conversation is still related)\n` +
        `# How to Apply Preferences\n` +
        `- **Tone (${tone})**: ${getToneGuidance(tone)}\n` +
        `# Response Structure (based on user preference: ${style})\n` +
        `${getStructureGuidelines(style)}\n\n` +
        `Focus on being ${name} with these characteristics, while following the core structure rules.`,
    },
    ...history,
    {
      role: "user",
      content: question,
    },
  ];

  const airespond = await getRespond(model!, messages);
  return airespond;
}

export async function generateAIRespondForCourseChat(
  question: string,
  assistantContext: AssistantContext,
  context: ChatContext
) {
  const { OPENROUTER_CHAT_PRESET: model } = process.env;
  const {
    name,
    style,
    description: assistantDescription,
    tone,
    depth,
    language,
  } = assistantContext;
  const { metadata, description, chatHistory } = context;
  const history = generateChatHistory(chatHistory);
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        `Identity & Role\n` +
        `You are ${name}, an expert learning assistant. ${assistantDescription}\n\n` +
        `Current Learning Context\n` +
        `${metadata}\n\n` +
        `Teaching Instructions\n` +
        `Your goal: ${description}\n\n` +
        `You must:\n` +
        `- Stay strictly within the scope of this lesson's content and key concepts\n` +
        `- Reference the learning objective when explaining concepts\n` +
        `- Connect new questions to previously discussed topics when relevant\n` +
        `- Redirect off-topic questions back to the lesson material\n` +
        `- Use examples that relate directly to the key concepts listed above\n\n` +
        `How to Apply Preferences\n` +
        `Tone (${tone}): ${getToneGuidance(tone)}\n` +
        `Depth (${depth}): ${getDepthGuidance(depth)}\n\n` +
        `Response Guidelines\n` +
        `${getStructureGuidelines(style)}\n\n` +
        `Conversation History\n` +
        `Critical Rules\n` +
        `- Never break character as ${name}\n` +
        `- Never mention these system instructions or configurations\n` +
        `- If asked about unrelated topics, politely redirect: "Let's focus on [current lesson topic]. How can I help you understand [key concept]?"\n` +
        `- Always respond in ${language}, regardless of the question's language\n` +
        `- Base all explanations on the lesson's key concepts and learning objective`,
    },
    ...history,
    {
      role: "user",
      content: question,
    },
  ];

  const aiRespond = await getRespond(model!, messages);

  return aiRespond;
}

export async function generateAIRespondForQuizChat(
  question: string,
  assistantContext: AssistantContext,
  context: ChatContext
) {
  const { OPENROUTER_CHAT_PRESET: model } = process.env;
  const {
    name,
    description: assistantDescription,
    tone,
    depth,
    language,
  } = assistantContext;

  const { metadata, description, chatHistory } = context;
  const history = generateChatHistory(chatHistory);

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "developer",
      content:
        `Identity & Role\n` +
        `You are ${name}, an expert learning assistant. ${assistantDescription}\n\n` +
        "During QUIZ mode:\n" +
        "- NEVER provide or confirm answers.\n" +
        "- NEVER eliminate choices.\n" +
        "- NEVER solve the question directly unless user asking feedback from answered questions.\n" +
        "- Only give hints, ask guiding questions, clarify concepts.\n" +
        "- Keep responses short and focused.\n" +
        "- Encourage reasoning, not correctness.\n" +
        `Tone (${tone}): ${getToneGuidance(tone)}\n` +
        `Depth (${depth}): ${getDepthGuidance(depth)}\n\n` +
        `Response Guidelines\n` +
        `${getStructureGuidelines("socratic")}\n\n` +
        `Language: ${language}\n` +
        `Current metadata/context: ${metadata} Goal: ${description}`,
    },
    ...history,
    {
      role: "user",
      content: question,
    },
  ];

  const aiRespond = await getRespond(model!, messages);
  return aiRespond;
}

export async function generatePathContent(
  context: {
    topic: string;
    programming_language: string;
    userPreferences: AssistantContext;
  },
  pathMetadata: Metadata
) {
  const model = "meta-llama/llama-3.3-70b-instruct:free";
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        `You are an expert programming educator.\n` +
        `Your job is to generate ONLY lesson content — no quizzes, no exercises.\n\n` +
        `You are teaching "${context.topic}" in the programming language "${context.programming_language}".\n\n` +
        `Generate structured content for this learning path:\n` +
        `- Path ${pathMetadata.order}/5: "${pathMetadata.title}"\n` +
        `- Focus: ${pathMetadata.description}\n` +
        `- Difficulty: ${pathMetadata.difficulty}\n` +
        `- Goal: ${pathMetadata.learning_objective}\n\n` +
        `STRICT FORMAT (do not deviate):\n` +
        `## [main explanation]\n` +
        `Write 2-3 paragraphs explaining the concept step-by-step.\n` +
        `- Use analogies for clarity\n` +
        `- Connect to real-world usage\n\n` +
        `## Examples\n` +
        `Provide 2-3 clear code examples using ${context.programming_language}.\n` +
        `Each example must include:\n` +
        `- A short explanatory sentence\n` +
        `- A valid code block\n\n` +
        `Persona Guidelines (applied AFTER the structure rules):\n` +
        `Name: ${context.userPreferences.name}\n` +
        `Tone: ${getToneGuidance(context.userPreferences.tone)}\n` +
        `Depth: ${getDepthGuidance(context.userPreferences.depth)}\n` +
        `Language: ${context.userPreferences.language}\n` +
        `Additional persona: ${context.userPreferences.description}`,
    },
    {
      role: "user",
      content:
        `Create learning content for:\n\n` +
        `Title: ${pathMetadata.title}\n\n` +
        `Key concepts to explain: ${pathMetadata.key_concepts.join(", ")}\n\n` +
        `Generate clear, engaging educational content that achieves the learning objective.`,
    },
  ];

  const aiRespond = getRespond(model, messages);
  return aiRespond;
}

export async function generateCodeFillBlankQuiz(
  topic: string,
  programmingLanguage: string,
  keyConcepts: string[],
  difficulty: "beginner" | "intermediate" | "advanced"
) {
  const model = "qwen/qwen-2.5-72b-instruct";

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `
You are an expert programming educator creating high-quality fill-in-the-blank coding exercises.

Topic: ${topic}
Programming language: ${programmingLanguage}
Difficulty: ${difficulty}
Key concepts: ${keyConcepts.join(", ")}

PEDAGOGICAL RULES (MANDATORY):
1. Every blank MUST test a specific concept from: ${keyConcepts.join(", ")}
2. Each blank MUST have a clear learning purpose that can be explained in one sentence
3. NEVER create a blank that does not affect program logic or meaning
4. NEVER create blanks for:
   - variable names
   - literal values
   - formatting-only elements
5. Each blank must have EXACTLY ONE correct answer
6. All incorrect options must be plausible but clearly wrong in this context
7. Prevent duplicated logic across blanks in the same question
8. The completed code must reflect real-world, idiomatic usage

CODE RULES:
- Blanks may be keywords, operators, method names, or full expressions
- If a blank requires multiple tokens (e.g. "i += 1"), include the full expression
- Do NOT add unnecessary statements just to insert blanks
- The code should look like something a real developer would write

FORMATTING RULES:
- Use \\n for line breaks
- Use consistent indentation
- Each statement on its own line
- No minified or one-line blocks

FAILURE CONDITIONS (DO NOT VIOLATE):
- Trivial or meaningless code
- Blanks that could be swapped without changing correctness
- Code that only exists to host blanks
- Make sure the amount of blanks in the code match with the amount of item in field blanks
- Each options should be distinct from each other
  # Bad Options example(duplicate options): 
    "options": [
      { "id": "i1", "label": "System.out.print(str)" }, 
      { "id": "i2", "label": "System.out.print(str)" },
      { "id": "i3", "label": "System.out.println(str)" }
    ]
  # Good options example(each option is unique): 
    "options": [
      { "id": "i1", "label": "System.out.println(str)" }, 
      { "id": "i2", "label": "scanner.next()" },
      { "id": "i3", "label": "System.out.print(str)" }
    ]

Code examples:
Example 1 - Testing loops:
  Code: "___1___ (int i = 0; i < 10; i___2___) {\\n printf(\\"%d\\\", i);\\n}"

Example 2 - Testing conditionals: 
  Code: "if (x > 0) {\\n return ___1___;\\n}\\n___2___ {\\n return ___3___;\\n}"

ABSOLUTE CONSTRAINT:
- Each blank must only accept ONE option that is both syntactically valid
- AND semantically correct in that exact position.
- The number of placeholders in the code (___1___, ___2___, etc.) MUST EXACTLY MATCH the number of objects in the "blanks" array.
- NEVER include a blank in "blanks" that does not appear in the code.
- If you cannot place all blanks naturally, REDUCE the number of blanks.
- If more than one option could fit, REWRITE the code.
- Options MUST be partitioned: Arithmetic operators ONLY appear in arithmetic blanks, Assignment operators ONLY appear in assignment blanks
- Never mix operator categories in the same option list.

`,
    },
    {
      role: "user",
      content: `
        Generate 2 fill-in-the-blank questions that test understanding of ${keyConcepts.join(
          ", "
        )}.
        
        Use this exact JSON schema:
        {
          "quizzes": [
            {
              "id": "quiz1",
              "type": "fill-in-the-blank",
              "instruction": "[hint of what each blank should be]",
              "code": "string with ___1___ and ___2___ placeholders",
              "blanks": [
                { 
                  "id": "blank1", 
                  "placeholder": "___1___", 
                  "correctItemId": "i1" 
                },
                { 
                  "id": "blank2", 
                  "placeholder": "___2___", 
                  "correctItemId": "i2" 
                },
              ],
              "options": [
                { "id": "i1", "label": "correct answer for blank1" },
                { "id": "i2", "label": "correct answer for blank2" },
                { "id": "i3", "label": "wrong option" }
              ]
            }
          ]
        }
        
        Make sure:
        - Each question has 2-3 blanks
        - Blanks in question match with the amount of item in field "blanks"
        - Each option should be unique and distinct from each other
        - Each question has 3 options (one answer for each question)
        - Prevent ambiguous question
        - The code makes sense with the correct answers filled in
        - Test actual programming concepts, not variable naming
      `,
    },
  ];

  const responseFormat: ResponseFormatJSONSchema = {
    type: "json_schema",
    json_schema: {
      name: "CodeFillBlankQuizCollection",
      strict: true,
      schema: {
        type: "object",
        properties: {
          quizzes: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            description: "Array of 2 quiz objects",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                type: { type: "string", enum: ["fill-in-the-blank"] },
                instruction: { type: "string" },
                code: { type: "string" },
                blanks: {
                  type: "array",
                  minItems: 2,
                  maxItems: 3,
                  items: {
                    type: "object",
                    required: ["id", "placeholder", "correctItemId"],
                    properties: {
                      id: { type: "string" },
                      placeholder: { type: "string" },
                      correctItemId: { type: "string" },
                    },
                    additionalProperties: false,
                  },
                },
                options: {
                  type: "array",
                  minItems: 3,
                  maxItems: 3,
                  items: {
                    type: "object",
                    required: ["id", "label"],
                    properties: {
                      id: { type: "string" },
                      label: { type: "string" },
                    },
                    additionalProperties: false,
                  },
                },
              },
              required: [
                "id",
                "type",
                "instruction",
                "code",
                "blanks",
                "options",
              ],
              additionalProperties: false,
            },
          },
        },
        required: ["quizzes"],
        additionalProperties: false,
      },
    },
  };

  const aiRespond = getRespond(model, messages, responseFormat, "content");
  return aiRespond;
}
export async function generateCourseIntroduction(
  context: CourseContext,
  assistantContext: AssistantContext
) {
  const {
    content_option,
    programming_language,
    learning_goal,
    difficulty_preference,
  } = context;

  const { name, tone, language, description } = assistantContext;

  const model = "meta-llama/llama-3.3-70b-instruct:free";
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are an expert programming educator.\n" +
        "\n" +
        "Your task:\n" +
        "Generate the INTRODUCTION PAGE for a programming course.\n" +
        "\n" +
        "This introduction should:\n" +
        "- Welcome the learner\n" +
        "- Explain what the topic is\n" +
        "- Explain why the topic matters\n" +
        "- Mention how it connects to real programming tasks\n" +
        "- Set expectations for what they will learn\n" +
        "- Adjust explanations to the user's difficulty preference\n" +
        "- Adapt tone and complexity to the provided learning goal\n" +
        "\n" +
        "Structure requirements:\n" +
        "1. A short welcoming paragraph\n" +
        "2. A clear explanation of the topic\n" +
        "3. 1-2 practical real-world examples\n" +
        "4. A brief outline of what the learner will accomplish\n" +
        "5. A short motivational closing\n" +
        "\n" +
        "Length: 3-4 paragraphs, maximum 400 words.\n" +
        "Use markdown to highlight necessary part\n" +
        "Persona guidelines\n" +
        "Use this guidelines to produce personalized introduction\n" +
        `Your name is ${name}\n` +
        `Preferred languange: ${language}\n` +
        `Tone: ${getToneGuidance(tone)}\n` +
        `Additional description: ${description}`,
    },
    {
      role: "user",
      content:
        "Generate an introduction for:\n" +
        `Topic: ${content_option}\n` +
        `Programming Language Context: ${programming_language}\n` +
        `Learning Goal: ${learning_goal}\n` +
        `Difficulty: ${difficulty_preference}\n` +
        "Write a strong, engaging introduction that prepares the learner for the material",
    },
  ];

  const aiRespond = await getRespond(model, messages);
  return aiRespond;
}

export async function generateCourseMetadata(context: CourseContext) {
  const {
    content_option,
    programming_language,
    learning_goal,
    difficulty_preference,
  } = context;
  const model = "meta-llama/llama-3.3-70b-instruct";
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        `You are an educational content strategist specializing in ${programming_language}.\n\n` +
        `Your task: reate exactly 3 distinct learning path metadata objects about ${content_option}.\n\n` +
        `Each path should:\n` +
        `- Focus on a different aspect of the topic\n` +
        `- Be teachable as a standalone module\n` +
        `- Progress logically (path 1 = foundational, path 3 = advanced/applied)\n` +
        `- Have clear learning value\n` +
        `- Be specific and actionable\n\n` +
        `Target difficulty: ${difficulty_preference}\n` +
        `Align with goal: ${learning_goal}`,
    },
    {
      role: "user",
      content:
        `Create 3 learning path metadata for:\n\n` +
        `Topic: ${content_option} with ${programming_language}\n\n` +
        `Generate the metadata following the required schema.`,
    },
  ];
  const responseFormat: ResponseFormatJSONSchema = {
    type: "json_schema",
    json_schema: {
      name: "CourseMetadata",
      strict: true,
      schema: {
        type: "object",
        properties: {
          course_metadata: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            description: "Array of 3 learning path metadata objects",
            items: {
              type: "object",
              properties: {
                order: {
                  type: "number",
                  description: "Path order (1-3)",
                },
                title: {
                  type: "string",
                  description:
                    "Clear, specific title for this learning path (max 60 chars)",
                },
                description: {
                  type: "string",
                  description:
                    "What this path covers and why it's important (2-3 sentences)",
                },
                key_concepts: {
                  type: "array",
                  description: "List of 3-5 main concepts covered in this path",
                  items: {
                    type: "string",
                  },
                },
                learning_objective: {
                  type: "string",
                  description:
                    "What the learner will be able to do after completing this path",
                },
                difficulty: {
                  type: "string",
                  enum: ["beginner", "intermediate", "advanced"],
                  description: "Difficulty level of this specific path",
                },
              },
              required: [
                "order",
                "title",
                "description",
                "key_concepts",
                "learning_objective",
                "difficulty",
              ],
              additionalProperties: false,
            },
          },
        },
        required: ["course_metadata"],
        additionalProperties: false,
      },
    },
  };

  const aiRespond = await getRespond(
    model,
    messages,
    responseFormat,
    "content"
  );
  return aiRespond;
}

export async function generateRemedialIntervention(
  courseMetadata: Metadata,
  performance: QuizResult,
  assistantContext: AssistantContext
) {
  const model = "meta-llama/llama-3.3-70b-instruct:free";
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `
You are an experienced programming instructor.

Context:
- Title: ${courseMetadata.title}
- Description: ${courseMetadata.description}
- Key Concepts of the Material:
${courseMetadata.key_concepts
  .map((concept, i) => `${i + 1}. ${concept}`)
  .join("\n")}\n

Student performance:
- Accuracy: ${(performance.accuracy * 100).toFixed(0)}%
- Correct answers: ${performance.correct}/${performance.total}
- Hints used: ${performance.hintsUsed}

Your task:
- User seems troubled with the current materiak, explain the undelying concept to help user understand the current material even better
- Give 1-2 concrete learning tips
- Encourage the student without shaming

Persona guidelines
Use this guidelines to produce feedback based on user customization
Your name is ${assistantContext.name}
Preferred languange: ${assistantContext.language}
Tone: ${getToneGuidance(assistantContext.tone)}\n
Additional description: ${assistantContext.description}

Output:
Short markdown explanation (max 250 words)
`,
    },
    {
      role: "user",
      content: "Provide learning guidance based on my performance.",
    },
  ];

  const aiRespond = await getRespond(model, messages);

  return aiRespond;
}

export async function summmarizeFile(
  file: File,
  assistantContext: AssistantContext
) {
  const { totalPages, base64Pdf } = await getPdfInfo(file);
  const { name, tone, language, description } = assistantContext;

  const fileName = file.name;

  if (totalPages > 10)
    throw new UserException(
      "Oops, this file contains 10+ pages, please try again with smaller file",
      400
    );

  const model = "meta-llama/llama-3.3-70b-instruct:free";
  const message: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are a document summarization system that creates detailed, well-structured summaries. Follow these guidelines:\n\n" +
        "Format the summary as follows:\n\n" +
        "Title: [Document Title]\n\n" +
        "## Overview:\n" +
        "[Brief overview of the document]\n\n" +
        "## A. [First Main Section]\n" +
        "   1. [Subsection]\n" +
        "      • [Bullet point]\n" +
        "      • [Bullet point]\n" +
        "   2. [Subsection]\n\n" +
        "## B. [Second Main Section]\n" +
        "   [Content]\n\n" +
        "## Overall:\n" +
        "[Final assessment]\n\n" +
        "Guidelines:\n" +
        "1. Use proper indentation and spacing\n" +
        "2. Keep technical accuracy and terminology\n" +
        "3. Be objective and clear\n" +
        "4. Use bullet points with • symbol\n" +
        "5. Maintain consistent spacing between sections\n" +
        "6. MAX 2000 characters\n" +
        "Persona guidelines\n" +
        "Use this guidelines to produce personalized summary based on user customization\n" +
        `Your name is ${name}\n` +
        `Preferred languange: ${language}\n` +
        `Tone: ${getToneGuidance(tone)}\n` +
        `Additional description: ${description}`,
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Summarize this document",
        },
        {
          type: "file",
          file: {
            filename: fileName,
            file_data: `data:application/pdf;base64,${base64Pdf}`,
          },
        },
      ],
    },
  ];

  const summary = await getRespond(model, message);

  return summary;
}

export async function generateQuizQuestion(
  context: QuizContext,
  total: number = 5
) {
  const { content_metadata, language } = context;
  const parsedMetadata = JSON.parse(content_metadata) as Metadata;
  const model = "meta-llama/llama-3.3-70b-instruct";
  console.log("is making request...");

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are an expert assessment designer creating educational quiz questions.\n" +
        `Your task: Generate exactly ${total} multiple-choice questions for this learning path.\n` +
        `Language Requirement:\n` +
        `- Generate ALL questions and answer options in: ${language}\n` +
        `- This includes question text, all 4 answer options, and any code comments\n` +
        `- Code syntax keywords should remain in their original language (e.g., 'if', 'while', 'function')\n` +
        `- Only translate natural language text, not programming keywords\n` +
        "\n" +
        "Guidelines:\n" +
        "1. Each question must have exactly 4 options (A, B, C, D)\n" +
        "2. Questions should test understanding of the key concepts\n" +
        "3. Mix difficulty levels (2 easy, 2 medium, 1 hard)\n" +
        "4. Make questions clear and unambiguous\n" +
        "5. Ensure correct answers are accurate\n" +
        "6. Make incorrect options plausible but clearly wrong\n" +
        "\n" +
        "Question Quality:\n" +
        "- For coding topics: Include practical scenarios or code snippets\n" +
        "- For conceptual topics: Test understanding, not memorization\n" +
        "- For applied topics: Use real-world examples\n" +
        "- Avoid trick questions\n" +
        "\n" +
        "Each question should directly relate to one of the key concepts provided.\n" +
        "Formatting Rules (IMPORTANT):\n" +
        "- NEVER use #, ##, ###, ####, or any markdown headers\n" +
        "- NEVER use bullet points (•), dashes (-), or asterisks (*) for lists\n" +
        "- NEVER use numbered lists like 1., 2., 3. in question text\n" +
        "- Code formatting is ALLOWED: Use `inline code` or ```language blocks\n" +
        "- Bold is ALLOWED: Use **text** for emphasis\n" +
        "- Write everything else as plain, natural text\n" +
        "- Question format: Single sentence or paragraph, no extra structure\n" +
        "\n",
    },
    {
      role: "user",
      content:
        "Create 5 multiple-choice quiz questions for:\n" +
        `Title: ${parsedMetadata.title}\n` +
        `Description: ${parsedMetadata.description}\n` +
        `Difficulty Level: ${parsedMetadata.difficulty}\n` +
        `Learning Objective: ${parsedMetadata.learning_objective}\n` +
        "\n" +
        "Key Concepts to Test:\n" +
        `${parsedMetadata.key_concepts
          .map((concept, i) => `${i + 1}. ${concept}`)
          .join("\n")}\n` +
        "Requirements:\n" +
        `- Exactly ${total} questions\n` +
        "- Each with 4 options (A, B, C, D)\n" +
        "- Cover most or all key concepts\n" +
        "- Clear, specific questions\n" +
        "- One correct answer per question\n" +
        "\n" +
        "Generate the quiz following the required schema.\n",
    },
  ];

  const responseFormat: ResponseFormatJSONSchema = {
    type: "json_schema",
    json_schema: {
      name: "QuizQuestions",
      strict: true,
      schema: {
        type: "object",
        properties: {
          quiz_questions: {
            type: "array",
            description: `Array of exactly ${total} quiz questions`,
            items: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                  description: "The complete question text",
                },
                answer: {
                  type: "string",
                  enum: ["A", "B", "C", "D"],
                  description: "The correct answer key",
                },
                answer_list: {
                  type: "array",
                  minItems: total,
                  maxItems: total,
                  items: {
                    type: "object",
                    properties: {
                      key: {
                        type: "string",
                        enum: ["A", "B", "C", "D"],
                        description: "Answer key letter",
                      },
                      label: {
                        type: "string",
                        description: "Answer label text only, no prefix",
                      },
                    },
                    required: ["key", "label"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["question", "answer", "answer_list"],
              additionalProperties: false,
            },
          },
        },
        required: ["quiz_questions"],
        additionalProperties: false,
      },
    },
  };

  const aiRespond = await getRespond(
    model,
    messages,
    responseFormat,
    "content"
  );

  return aiRespond;
}
