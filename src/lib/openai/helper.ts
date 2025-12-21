import {
  PromptDepthGuidance,
  PromptStyleGuidance,
  PromptToneGuidance,
} from "./type";
import { CanvasFactory } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";
import { UserException } from "../utils";

export function getStructureGuidelines(
  style: keyof PromptStyleGuidance
): string {
  const structures = {
    concise: `
- Keep responses brief (2-4 sentences for simple questions)
- Use bullet points only when listing multiple items
- Avoid headers unless explaining multi-part concepts`,

    detailed: `
- Provide thorough explanations with context
- Break complex topics into clear sections with headers
- Include examples to illustrate key points
- Offer "want to go deeper?" prompts for advanced learners`,

    conversational: `
- Write in natural, flowing paragraphs
- Avoid excessive formatting (minimal bullets/headers)
- Use analogies and relatable examples
- Ask clarifying questions when needed`,

    structured: `
- Use clear headers for multi-part answers
- Organize with numbered steps or bullet points when appropriate
- Include "Summary:" or "Key Takeaway:" sections
- Format code or formulas in proper blocks`,

    socratic: `
- Guide discovery with questions rather than direct answers
- Offer hints before full explanations
- Use "What do you think?" prompts
- Celebrate reasoning attempts`,
  };

  return structures[style];
}

export function getToneGuidance(tone: keyof PromptToneGuidance): string {
  const guidance = {
    friendly: "Be warm and approachable, use conversational language",
    professional: "Be clear and respectful, slightly more formal phrasing",
    casual: "Be relaxed and informal, like talking to a friend",
    encouraging: "Be supportive and positive, celebrate progress",
    neutral: "Be balanced and straightforward, no extra emotional coloring",
  };
  return guidance[tone] || guidance.neutral;
}

export function getDepthGuidance(depth: keyof PromptDepthGuidance): string {
  const guidance = {
    surface: "Cover just the essential concept. Skip deep details unless asked",
    intermediate:
      "Explain the concept plus key details. One layer deeper than basics",
    deep: "Comprehensive explanation including edge cases, nuances, and advanced considerations",
    adaptive: "Start simple. Offer 'want more detail?' prompts to go deeper",
  };
  return guidance[depth] || guidance.intermediate;
}

export async function getPdfInfo(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  function isPdf(buffer: Buffer): boolean {
    const header = buffer.subarray(0, 5).toString("ascii");
    return header === "%PDF-";
  }
  if (!isPdf(buffer))
    throw new UserException("Oops, we only accept PDF file", 400);

  const base64Pdf = buffer.toString("base64");

  const pdf = new PDFParse({ data: buffer, CanvasFactory });
  const totalPages = (await pdf.getInfo()).total;

  return { totalPages, base64Pdf };
}

export function getTopicExamples(topic: string, language: string): string {
  const examples: Record<string, Record<string, string>> = {
    "variables and data types": {
      java: `
✓ "___1___ age = 25;" - Use: int, double, long (Primitive types)
✓ "___1___ name = \"John\";" - Use: String (Reference types)
✓ "final ___1___ PI = 3.14;" - Use: double (Type after final)
✓ "int x = (___1___) 3.14;" - Use: int (Explicit casting)
`,
      javascript: `
✓ "___1___ age = 25;" - Use: let, const, var
✓ "const PI = ___1___;" - Use: 3.14 (Literal values)
✓ "let isReady = ___1___;" - Use: true, false (Booleans)
`,
      c: `
✓ "___1___ age = 25;" - Use: int, float, char (No 'let' or 'var')
✓ "___1___ pi = 3.14;" - Use: float, double
✓ "char letter = ___1___;" - Use: 'A' (Single quotes for char)
❌ WARNING: C has no 'global' or 'boolean' keyword. Use 'int' for true/false or declare outside functions for scope.
`,
    },

    "operator and expressions": {
      java: `
✓ "x ___1___ 5;" - Use: +=, -=, *=, /= (Assignment)
✓ "if (a ___1___ b)" - Use: ==, !=, <, > (Comparison)
✓ "boolean both = a ___1___ b;" - Use: &&, || (Logical)
`,
      javascript: `
✓ "if (x ___1___ '5')" - Use: ===, !== (Strict equality)
✓ "const result = a ___1___ b;" - Use: **, %, / (Arithmetic)
✓ "let val = x ___1___ 'default';" - Use: ?? (Nullish coalescing)
`,
      c: `
✓ "x ___1___ 5;" - Use: +=, %=, *= (Assignment)
✓ "if (x > 0 ___1___ y > 0)" - Use: &&, || (Logical)
✓ "int result = ___1___x;" - Use: ++, --, ! (Unary)
`,
    },

    conditionals: {
      java: `
✓ "___1___ (x > 0) { ... }" - Use: if, while
✓ "switch(x) { ___1___ 1: break; }" - Use: case
✓ "return (x > 0) ___1___ true ___2___ false;" - Use: ?, : (Ternary)
`,
      javascript: `
✓ "if (x > 0) { ... } ___1___ { ... }" - Use: else
✓ "___1___ (type) { case 'A': ... }" - Use: switch
✓ "if (x > 0) { ... } ___1___ if (x < 0) { ... }" - Use: else
`,
      c: `
✓ "___1___ (x > 0) { ... }" - Use: if
✓ "if (x > 0) { ... } ___1___ { ... }" - Use: else
✓ "switch(x) { ___1___ 1: ___2___; }" - Use: case, break
❌ WARNING: C does not use 'elif'. Use 'else if'.
`,
    },

    looping: {
      java: `
✓ "___1___ (int i = 0; i < 10; i++)" - Use: for
✓ "for (String s ___1___ list)" - Use: : (Enhanced for loop)
✓ "___1___ { ... } while (x < 10);" - Use: do
`,
      javascript: `
✓ "for (let x ___1___ array)" - Use: of (Array iteration)
✓ "for (let key ___1___ object)" - Use: in (Object iteration)
✓ "___1___ (i < 10) { i++; }" - Use: while
`,
      c: `
✓ "for (___1___ i = 0; i < 10; i++)" - Use: int (C99+ declaration)
✓ "___1___ (condition) { ... }" - Use: while
✓ "do { ... } ___1___ (condition);" - Use: while
`,
    },

    array: {
      java: `
✓ "int[] arr = ___1___ int[5];" - Use: new
✓ "int len = arr.___1___;" - Use: length (Property)
✓ "arr[___1___] = 10;" - Use: 0, 1, 2 (Index)
`,
      javascript: `
✓ "const len = arr.___1___;" - Use: length (Property)
✓ "arr.___1___(x => x * 2);" - Use: map, filter, forEach
✓ "const [a, b] = ___1___;" - Use: array (Destructuring)
`,
      c: `
✓ "int arr___1___ = {1, 2, 3};" - Use: [] (Brackets)
✓ "int len = sizeof(arr) ___1___ sizeof(arr[0]);" - Use: / (Length calculation)
✓ "int *ptr = ___1___;" - Use: arr (Array to pointer)
❌ WARNING: C arrays have NO .length property.
`,
    },

    "input and output": {
      java: `
✓ "System.out.___1___(\"Hi\");" - Use: println, print, printf
✓ "Scanner sc = new ___1___(System.in);" - Use: Scanner
✓ "int n = sc.___1___();" - Use: nextInt
`,
      javascript: `
✓ "console.___1___(data);" - Use: log, table, error, warn
✓ "const name = ___1___('Name?');" - Use: prompt
`,
      c: `
✓ "___1___(\"%d\", x);" - Use: printf
✓ "scanf(\"___1___\", &x);" - Use: %d, %f, %s (Format specifiers)
✓ "scanf(\"%d\", ___1___x);" - Use: & (Address-of operator)
✓ "___1___(\"Hello\");" - Use: puts, printf
`,
    },
  };

  const lang = language.toLowerCase();

  // Normalize topic name to handle potential typos in user input or list values
  let normalizedTopic = topic.toLowerCase().trim();
  if (normalizedTopic === "coditionals") normalizedTopic = "conditionals";

  const result = examples[normalizedTopic]?.[lang];

  return result ? `\nTOPIC-SPECIFIC EXAMPLES AND CONSTRAINTS:\n${result}` : "";
}

export function getSyntaxPatterns(language: string): string {
  const patterns: Record<string, { invalid: string; valid: string }> = {
    java: {
      invalid: `
Java-specific INVALID patterns (NEVER GENERATE):
❌ "if x > 0 { }" - missing parentheses around condition (Java requires parentheses)
❌ "switch (x) case 1: { }" - missing braces around switch body
❌ "while (j = 0; j < 3; j++)" - assignment in while condition (should use for loop)
❌ "for (int i = 0; i < arr.size(); i++)" - arrays use .length not .size()
❌ "String s = 'hello';" - single quotes for strings (should be double quotes)
❌ "if (x) { }" - non-boolean in condition (should be x != 0 or x == true)
❌ "for (i = 0; i < 10; i++)" - missing type declaration (should be int i = 0)
❌ "System.out.println(x + y + z)" without proper string concatenation context
❌ "catch { }" - missing exception type (should be catch (Exception e))
❌ "public class { }" - missing class name
❌ "int[] arr = {1, 2, 3}" - missing semicolon
❌ "for (int i = 0, i < 10, i++)" - wrong separators (should use semicolons)
      `,
      valid: `
Java VALID syntax patterns:
✓ "for (int i = 0; i < 10; i++) { body }"
✓ "while (condition) { body }"
✓ "do { body } while (condition);"
✓ "if (condition) { } else if (condition) { } else { }"
✓ "switch (x) { case 1: break; default: break; }"
✓ "for (Type item : array) { body }" - enhanced for loop
✓ "arr.length" - array length property
✓ "String s = \"text\";" - String with double quotes
✓ "try { } catch (Exception e) { }" - exception handling
✓ "System.out.println(value);" - output statement
      `,
    },
    javascript: {
      invalid: `
JavaScript-specific INVALID patterns (NEVER GENERATE):
❌ "for (i = 0; i < 10; i++)" without let/const/var in strict contexts
❌ "const x; x = 5;" - const requires initialization (should be const x = 5)
❌ "for (let x in arr)" when iterating array values (should use 'of' not 'in')
❌ "for (let x of obj)" when iterating object keys (should use 'in' not 'of')
❌ "array.length()" - length is a property not a method (should be array.length)
❌ "if (x = 5)" as condition - assignment instead of comparison (should be === or ==)
❌ "switch (x) { case 1 }" - missing colon after case (should be case 1:)
❌ "function() { }" without name in statement context
❌ "let x = 5; let x = 10;" - cannot redeclare let/const variables
❌ "const arr = []; arr = [1, 2];" - cannot reassign const (but can mutate)
❌ "if (x === 5) { } else if { }" - missing condition in else if
      `,
      valid: `
JavaScript VALID syntax patterns:
✓ "for (let i = 0; i < 10; i++) { body }"
✓ "for (let item of array) { body }" - iterate array values
✓ "for (let key in object) { body }" - iterate object keys
✓ "while (condition) { body }"
✓ "do { body } while (condition);"
✓ "if (condition) { } else { }"
✓ "arr.length" - array length property (no parentheses)
✓ "const x = 5;" or "let x = 5;" - modern declarations
✓ "switch (x) { case 1: break; default: break; }"
✓ "function name() { }" or "const name = () => { }" - function declarations
      `,
    },
    c: {
      invalid: `
C-specific INVALID patterns (NEVER GENERATE):
❌ "if x > 0 { }" - missing parentheses (C requires parentheses around conditions)
❌ "for (int i = 0; i < 10; i++)" - C89/C90 doesn't allow declarations in for loop
❌ "int arr.length" - no length property in C (must track size separately or use sizeof)
❌ "string s = \"hello\";" - no string type (should use char* or char[])
❌ "printf(x);" without format specifier - undefined behavior (should be printf("%d", x))
❌ "scanf(\"%d\", x);" - missing address-of operator (should be &x)
❌ "bool x = true;" without stdbool.h - bool not available in C89/C90 (use int)
❌ "for (i = 0; i < size(); i++)" - calling function in condition every iteration (inefficient)
❌ "int arr[] = {1, 2, 3}" - missing semicolon
❌ "char* s = 'hello';" - single quotes for multi-char (should be double quotes)
❌ "int x;" without initialization in some contexts - may contain garbage value
      `,
      valid: `
C VALID syntax patterns:
✓ "int i; for (i = 0; i < 10; i++) { body }" - C89/C90 style
✓ "for (int i = 0; i < 10; i++) { body }" - C99+ style
✓ "while (condition) { body }"
✓ "do { body } while (condition);"
✓ "if (condition) { } else { }"
✓ "switch (x) { case 1: break; default: break; }"
✓ "sizeof(arr) / sizeof(arr[0])" - array length calculation
✓ "printf(\"%d\", x);" - formatted output with format specifier
✓ "scanf(\"%d\", &x);" - input with address-of operator
✓ "char s[] = \"hello\";" or "char* s = \"hello\";" - string declaration
      `,
    },
  };

  const lang = language.toLowerCase();
  const pattern = patterns[lang];

  if (!pattern) {
    return `Language "${language}" syntax patterns not found. Using generic patterns only.`;
  }

  return `${pattern.invalid}\n${pattern.valid}`;
}

export function getGoldenExamples(language: string): string {
  const languageKey = language.toLowerCase();

  const examples: Record<string, unknown> = {
    java: {
      instruction:
        "Fill in ___1___ with the keyword to instantiate the array, and ___2___ with the property used to retrieve the number of elements.",
      code: "String[] names = ___1___ String[3];\nint count = names.___2___;",
      blanks: [
        { id: "b1", placeholder: "___1___", correctItemId: "i1" },
        { id: "b2", placeholder: "___2___", correctItemId: "i2" },
      ],
      options: [
        { id: "i1", label: "new" },
        { id: "i2", label: "length" },
        { id: "i3", label: "size()" },
      ],
    },
    c: {
      instruction:
        "Fill in ___1___ with the integer format specifier, and ___2___ with the address-of operator required for input.",
      code: 'int age;\nscanf("___1___", ___2___age);',
      blanks: [
        { id: "b1", placeholder: "___1___", correctItemId: "i1" },
        { id: "b2", placeholder: "___2___", correctItemId: "i2" },
      ],
      options: [
        { id: "i1", label: "%d" },
        { id: "i2", label: "&" },
        { id: "i3", label: "*" },
      ],
    },
    javascript: {
      instruction:
        "Fill in ___1___ with the modern block-scoped declaration keyword, and ___2___ with the operator used to iterate over array values.",
      code: "const colors = ['red', 'blue'];\nfor (___1___ color ___2___ colors) {\n  console.log(color);\n}",
      blanks: [
        { id: "b1", placeholder: "___1___", correctItemId: "i1" },
        { id: "b2", placeholder: "___2___", correctItemId: "i2" },
      ],
      options: [
        { id: "i1", label: "let" },
        { id: "i2", label: "of" },
        { id: "i3", label: "in" },
      ],
    },
  };

  const selectedExample = examples[languageKey];

  if (!selectedExample) return "";

  return `
## GOLDEN EXAMPLE FOR ${language.toUpperCase()} (MANDATORY STRUCTURE)
You must follow the parity and logic shown in this example:
${JSON.stringify(selectedExample, null, 2)}

CRITICAL: Notice how the instruction mentions ___1___ and ___2___, and both appear exactly in the code and the blanks array.
`;
}

// export async function chunkText(text: string) {
//   const chunks = [];
//   const maxLength = 40000;
//   const sentences = text.split(".");
//   let currChunk = "";

//   for (const sentence of sentences) {
//     if ((currChunk + sentence).length > maxLength) {
//       chunks.push(currChunk);
//       currChunk = sentence;
//     } else {
//       currChunk += " " + sentence;
//     }
//   }

//   if (currChunk) chunks.push(currChunk.trim());

//   return chunks;
// }
