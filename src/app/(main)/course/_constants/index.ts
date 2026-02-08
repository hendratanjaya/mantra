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

export const cQuiz = {
  beginner: {
    "variables and data types": [
      {
        id: "c-vdt-01",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the keyword for a constant value, and ___2___ with the format specifier for a long integer.",
        code: '___1___ double PI = 3.14159;\nlong population = 8000000L;\nprintf("Pop: ___2___\\n", population);',
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "const" },
          { id: "i2", label: "%ld" },
          { id: "i3", label: "define" },
        ],
      },
      {
        id: "c-vdt-02",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ to declare a character variable and ___2___ with the correct specifier to print its ASCII integer value.",
        code: "___1___ letter = 'A';\nprintf(\"ASCII value: ___2___\", letter);",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "char" },
          { id: "i2", label: "%d" },
          { id: "i3", label: "%s" },
        ],
      },
      {
        id: "c-vdt-03",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the type used for large decimal precision and ___2___ with the operator to find the memory size in bytes.",
        code: "___1___ preciseValue = 0.123456789;\nint size = ___2___(preciseValue);",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "double" },
          { id: "i2", label: "sizeof" },
          { id: "i3", label: "length" },
        ],
      },
      {
        id: "c-vdt-04",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ to declare an unsigned integer and ___2___ with its corresponding format specifier.",
        code: '___1___ int distance = 500;\nprintf("Distance: ___2___", distance);',
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "unsigned" },
          { id: "i2", label: "%u" },
          { id: "i3", label: "%d" },
        ],
      },
      {
        id: "c-vdt-05",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the keyword for a global variable defined in another file.",
        code: '___1___ int sharedCounter;\n\nvoid show() {\n    printf("%d", sharedCounter);\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "extern" },
          { id: "i2", label: "static" },
          { id: "i3", label: "volatile" },
        ],
      },
    ],
    "operator and expressions": [
      {
        id: "c-ope-01",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the modulo operator and ___2___ with the logical AND operator.",
        code: "int remainder = 10 ___1___ 3;\nif (x > 0 ___2___ x < 100) { ... }",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "%" },
          { id: "i2", label: "&&" },
          { id: "i3", label: "&" },
        ],
      },
      {
        id: "c-ope-02",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the post-increment operator and ___2___ with the compound addition operator.",
        code: "int count = 5;\ncount___1___;\ncount ___2___ 10; // Equivalent to count = count + 10",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "++" },
          { id: "i2", label: "+=" },
          { id: "i3", label: "=+" },
        ],
      },
      {
        id: "c-ope-03",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the 'not equal to' operator and ___2___ with the logical NOT operator.",
        code: "if (status ___1___ 0) { ... }\nif (___2___isFinished) { ... }",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "!=" },
          { id: "i2", label: "!" },
          { id: "i3", label: "<>" },
        ],
      },
      {
        id: "c-ope-04",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the cast operator to perform floating-point division on two integers.",
        code: "int a = 5, b = 2;\nfloat result = (___1___)a / b;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "float" },
          { id: "i2", label: "double" },
          { id: "i3", label: "int" },
        ],
      },
      {
        id: "c-ope-05",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the logical OR operator used to check if at least one condition is true.",
        code: 'if (score > 90 ___1___ extraCredit == true) {\n    printf("Grade: A");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "||" },
          { id: "i2", label: "|" },
          { id: "i3", label: "OR" },
        ],
      },
    ],
    "input and output": [
      {
        id: "c-io-01",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the address-of operator required by scanf.",
        code: 'int age;\nprintf("Enter age: ");\nscanf("%d", ___1___age);',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "&" },
          { id: "i2", label: "*" },
          { id: "i3", label: "ref" },
        ],
      },
      {
        id: "c-io-02",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the newline escape character and ___2___ with the tab escape character.",
        code: 'printf("Line 1___1___Line 2");\nprintf("Column 1___2___Column 2");',
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "\\n" },
          { id: "i2", label: "\\t" },
          { id: "i3", label: "/n" },
        ],
      },
      {
        id: "c-io-03",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the function used to read a single character from the keyboard.",
        code: 'char ch;\nprintf("Press any key: ");\nch = ___1___();',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "getchar" },
          { id: "i2", label: "putchar" },
          { id: "i3", label: "scanf_c" },
        ],
      },
      {
        id: "c-io-04",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the specifier for a string and ___2___ with the specifier for a single character.",
        code: 'char name[20] = "Bob";\nchar grade = \'A\';\nprintf("Name: ___1___, Grade: ___2___", name, grade);',
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "%s" },
          { id: "i2", label: "%c" },
          { id: "i3", label: "%str" },
        ],
      },
      {
        id: "c-io-05",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the specifier to limit a float output to exactly two decimal places.",
        code: 'float tax = 12.505;\nprintf("Tax amount: ___1___", tax); // Output should be 12.51',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "%.2f" },
          { id: "i2", label: "%2f" },
          { id: "i3", label: "%.f2" },
        ],
      },
    ],
    coditionals: [
      {
        id: "c-cond-01",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ to catch all cases not explicitly handled in a switch statement.",
        code: 'switch(grade) {\n  case \'A\': printf("Good"); break;\n  ___1___: printf("Invalid"); break;\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "default" },
          { id: "i2", label: "else" },
          { id: "i3", label: "otherwise" },
        ],
      },
      {
        id: "c-cond-02",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the relational operator for equality and ___2___ with the keyword to provide an alternative path.",
        code: 'if (x ___1___ 10) {\n    printf("Equal");\n} ___2___ {\n    printf("Not Equal");\n}',
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "==" },
          { id: "i2", label: "else" },
          { id: "i3", label: "=" },
        ],
      },
      {
        id: "c-cond-03",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the keyword used to exit a switch case after a match is found.",
        code: 'switch(day) {\n    case 1:\n        printf("Monday");\n        ___1___;\n    case 2:\n        printf("Tuesday");\n        ___1___;\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "break" },
          { id: "i2", label: "stop" },
          { id: "i3", label: "exit" },
        ],
      },
      {
        id: "c-cond-04",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the keyword used to check an additional condition if the first 'if' is false.",
        code: 'if (score >= 90) {\n    printf("A");\n} ___1___ (score >= 80) {\n    printf("B");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "else if" },
          { id: "i2", label: "elif" },
          { id: "i3", label: "when" },
        ],
      },
      {
        id: "c-cond-05",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the logical operator that negates a condition (Logical NOT).",
        code: 'int isRaining = 0;\nif (___1___isRaining) {\n    printf("Go outside");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "!" },
          { id: "i2", label: "not" },
          { id: "i3", label: "~" },
        ],
      },
    ],
    looping: [
      {
        id: "c-loop-01",
        topic: "Looping",
        instruction:
          "Fill in ___1___ for a loop that checks the condition after executing the body.",
        code: '___1___ {\n    printf("Run once\\n");\n} while (0);',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "do" },
          { id: "i2", label: "while" },
          { id: "i3", label: "repeat" },
        ],
      },
      {
        id: "c-loop-02",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the keyword to skip the current iteration and move to the next one.",
        code: 'for (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) ___1___;\n    printf("%d ", i);\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "continue" },
          { id: "i2", label: "skip" },
          { id: "i3", label: "break" },
        ],
      },
      {
        id: "c-loop-03",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the keyword for a loop used when the number of iterations is known.",
        code: '___1___ (int i = 0; i < 5; i++) {\n    printf("Iteration %d\\n", i);\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "for" },
          { id: "i2", label: "while" },
          { id: "i3", label: "loop" },
        ],
      },
      {
        id: "c-loop-04",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the keyword to immediately terminate and exit the loop.",
        code: "while (1) {\n    if (sensorValue > 100) ___1___;\n    readSensor();\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "break" },
          { id: "i2", label: "exit" },
          { id: "i3", label: "return" },
        ],
      },
      {
        id: "c-loop-05",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the keyword for a loop that continues as long as a condition is true.",
        code: 'int energy = 10;\n___1___ (energy > 0) {\n    printf("Working...\\n");\n    energy--;\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "while" },
          { id: "i2", label: "until" },
          { id: "i3", label: "during" },
        ],
      },
    ],
    array: [
      {
        id: "c-arr-01",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the operator used to determine the total memory size of an array.",
        code: "int numbers[] = {1, 2, 3};\nint size = ___1___(numbers);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "sizeof" },
          { id: "i2", label: "length" },
          { id: "i3", label: "count" },
        ],
      },
      {
        id: "c-arr-02",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the correct index to access the first element and ___2___ to access the third element.",
        code: "int scores[5] = {90, 85, 70, 95, 80};\nint first = scores[___1___];\nint third = scores[___2___];",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "0" },
          { id: "i2", label: "2" },
          { id: "i3", label: "1" },
        ],
      },
      {
        id: "c-arr-03",
        topic: "Array",
        instruction:
          'Fill in ___1___ with the size required to store the string "Hi" including the null terminator.',
        code: 'char greeting[___1___] = "Hi";',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "3" },
          { id: "i2", label: "2" },
          { id: "i3", label: "4" },
        ],
      },
      {
        id: "c-arr-04",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the square brackets used for array declaration and ___2___ with the curly braces for initialization.",
        code: "int vals___1___ ___2___ 10, 20, 30 };",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "[]" },
          { id: "i2", label: "{" },
          { id: "i3", label: "()" },
        ],
      },
      {
        id: "c-arr-05",
        topic: "Array",
        instruction:
          "Fill in ___1___ to calculate the number of elements by dividing total size by the size of one element.",
        code: "int arr[] = {10, 20, 30, 40};\nint len = sizeof(arr) / ___1___(arr[0]);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "sizeof" },
          { id: "i2", label: "count" },
          { id: "i3", label: "lengthof" },
        ],
      },
    ],
  },
  intermediate: {
    "variables and data types": [
      {
        id: "c-vdt-int-01",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the storage class that makes a variable retain its value between function calls, and ___2___ with the format specifier for unsigned long long.",
        code: 'void counter() {\n    ___1___ int count = 0;\n    count++;\n    unsigned long long bigNum = 1234567890123ULL;\n    printf("Count: %d, Big: ___2___\\n", count, bigNum);\n}',
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "static" },
          { id: "i2", label: "%llu" },
          { id: "i3", label: "const" },
          { id: "i4", label: "%lu" },
        ],
      },
      {
        id: "c-vdt-int-02",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the keyword to create a type alias and ___2___ with the new type name for unsigned int.",
        code: "___1___ unsigned int ___2___;\n___2___ age = 25;",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "typedef" },
          { id: "i2", label: "uint" },
          { id: "i3", label: "alias" },
          { id: "i4", label: "type" },
        ],
      },
      {
        id: "c-vdt-int-03",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the keyword that prevents compiler optimization on a variable that may be modified externally.",
        code: "___1___ int sensorReading;\nwhile (sensorReading < 100) {\n    // Wait for sensor\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "volatile" },
          { id: "i2", label: "extern" },
          { id: "i3", label: "register" },
        ],
      },
      {
        id: "c-vdt-int-04",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the specifier for a pointer type and ___2___ with the format specifier for printing pointer addresses.",
        code: 'int value = 42;\nint___1___ ptr = &value;\nprintf("Address: ___2___\\n", ptr);',
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "*" },
          { id: "i2", label: "%p" },
          { id: "i3", label: "&" },
          { id: "i4", label: "%x" },
        ],
      },
      {
        id: "c-vdt-int-05",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the storage class that limits a variable's scope to the file it's declared in.",
        code: "___1___ int fileCounter = 0;\n\nvoid increment() {\n    fileCounter++;\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "static" },
          { id: "i2", label: "extern" },
          { id: "i3", label: "private" },
        ],
      },
    ],
    "operator and expressions": [
      {
        id: "c-ope-int-01",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the ternary operator symbol and ___2___ with the compound assignment operator for modulo.",
        code: "int max = (a > b) ___1___ a : b;\nint remainder = 17;\nremainder ___2___ 5;  // remainder is now 2",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "?" },
          { id: "i2", label: "%=" },
          { id: "i3", label: ":" },
          { id: "i4", label: "/=" },
        ],
      },
      {
        id: "c-ope-int-02",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the pre-increment operator and ___2___ to show the difference in evaluation order with post-increment.",
        code: "int x = 5, y = 5;\nint a = ___1___x;  // a = 6, x = 6\nint b = y___2___;  // b = 5, y = 6",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "++" },
          { id: "i2", label: "++" },
          { id: "i3", label: "--" },
          { id: "i4", label: "+1" },
        ],
      },
      {
        id: "c-ope-int-03",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the bitwise AND operator and ___2___ with the bitwise OR operator.",
        code: "int mask = 0x0F ___1___ 0xFF;  // Extract lower nibble\nint flags = READ_FLAG ___2___ WRITE_FLAG;  // Combine flags",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "&" },
          { id: "i2", label: "|" },
          { id: "i3", label: "&&" },
          { id: "i4", label: "||" },
        ],
      },
      {
        id: "c-ope-int-04",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the left shift operator and ___2___ with the right shift operator.",
        code: "int multiplied = value ___1___ 2;  // Multiply by 4\nint divided = value ___2___ 3;     // Divide by 8",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "<<" },
          { id: "i2", label: ">>" },
          { id: "i3", label: "<" },
          { id: "i4", label: ">" },
        ],
      },
      {
        id: "c-ope-int-05",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the sizeof operator to calculate the number of elements in an array.",
        code: "int arr[] = {1, 2, 3, 4, 5};\nint count = ___1___(arr) / ___1___(arr[0]);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "sizeof" },
          { id: "i2", label: "length" },
          { id: "i3", label: "count" },
        ],
      },
    ],
    "input and output": [
      {
        id: "c-io-int-01",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the function to open a file and ___2___ with the mode for appending text.",
        code: 'FILE *fp = ___1___("log.txt", "___2___");\nif (fp == NULL) return 1;',
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "fopen" },
          { id: "i2", label: "a" },
          { id: "i3", label: "w" },
        ],
      },
      {
        id: "c-io-int-02",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the function used to write formatted data into a string buffer rather than the console.",
        code: 'char buffer[50];\nint age = 25;\n___1___(buffer, "Age is %d", age);',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "sprintf" },
          { id: "i2", label: "fprintf" },
          { id: "i3", label: "sscanf" },
        ],
      },
      {
        id: "c-io-int-03",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the macro representing the end of a file and ___2___ with the function to close the stream.",
        code: "while ((ch = fgetc(fp)) != ___1___) {\n    putchar(ch);\n}\n___2___(fp);",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "EOF" },
          { id: "i2", label: "fclose" },
          { id: "i3", label: "NULL" },
        ],
      },
      {
        id: "c-io-int-04",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the safer function for reading strings that prevents buffer overflow by limiting characters.",
        code: "char name[10];\n___1___(name, 10, stdin);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "fgets" },
          { id: "i2", label: "gets" },
          { id: "i3", label: "scanf" },
        ],
      },
      {
        id: "c-io-int-05",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the standard error stream used to print error messages even if output is redirected.",
        code: 'if (error_occurred) {\n    fprintf(___1___, "An error happened!\\n");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "stderr" },
          { id: "i2", label: "stdout" },
          { id: "i3", label: "errno" },
        ],
      },
    ],
    coditionals: [
      {
        id: "c-cond-int-01",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the ternary operator and ___2___ with the separator to replace this if-else block.",
        code: "// int x = (y > 5) ? 10 : 20;\nint x = (y > 5) ___1___ 10 ___2___ 20;",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "?" },
          { id: "i2", label: ":" },
          { id: "i3", label: ";" },
        ],
      },
      {
        id: "c-cond-int-02",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the operator that demonstrates short-circuiting (the second part is only checked if the first is true).",
        code: 'if (ptr != NULL ___1___ ptr->value > 0) {\n    printf("Valid pointer and value\\n");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "&&" },
          { id: "i2", label: "||" },
          { id: "i3", label: "&" },
        ],
      },
      {
        id: "c-cond-int-03",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the bitwise operator used to check if a specific bit (mask) is set within a status flag.",
        code: 'int FLAG_READY = 0x01;\nif ((status ___1___ FLAG_READY) != 0) {\n    printf("System Ready\\n");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "&" },
          { id: "i2", label: "&&" },
          { id: "i3", label: "==" },
        ],
      },
      {
        id: "c-cond-int-04",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the keyword used to jump to a specific label (though generally discouraged, it is used for error cleanup).",
        code: "if (data == NULL) ___1___ cleanup;\n\ncleanup:\n    free(buffer);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "goto" },
          { id: "i2", label: "jump" },
          { id: "i3", label: "break" },
        ],
      },
      {
        id: "c-cond-int-05",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the preprocessor directive used for conditional compilation based on defined macros.",
        code: '#define DEBUG_MODE\n___1___ DEBUG_MODE\n    printf("Debug info active\\n");\n#endif',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "#ifdef" },
          { id: "i2", label: "#if" },
          { id: "i3", label: "#defined" },
        ],
      },
    ],
    looping: [
      {
        id: "c-loop-int-01",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the comma operator used to initialize multiple variables within a single for-loop header.",
        code: 'for (int i = 0, j = 10; i < j; i++ ___1___ j--) {\n    printf("%d, %d\\n", i, j);\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "," },
          { id: "i2", label: ";" },
          { id: "i3", label: "&&" },
        ],
      },
      {
        id: "c-loop-int-02",
        topic: "Looping",
        instruction:
          "Fill in ___1___ to create an idiomatically correct infinite loop often used in embedded systems or server listeners.",
        code: "for (___1___) {\n    if (check_stop_signal()) break;\n    process_request();\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: ";;" },
          { id: "i2", label: "true" },
          { id: "i3", label: "1" },
        ],
      },
      {
        id: "c-loop-int-03",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the correct pointer increment logic to iterate through a string until the null terminator is reached.",
        code: 'char *ptr = "Hello";\nwhile (*ptr != \'\\0\') {\n    printf("%c", *ptr);\n    ptr___1___;\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "++" },
          { id: "i2", label: "+= sizeof(char*)" },
          { id: "i3", label: " = ptr + 1" },
        ],
      },
      {
        id: "c-loop-int-04",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the keyword used to exit only the innermost loop when working with nested structures.",
        code: "for (int i = 0; i < 5; i++) {\n    for (int j = 0; j < 5; j++) {\n        if (found) ___1___;\n    }\n    // Execution continues here after the blank\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "break" },
          { id: "i2", label: "continue" },
          { id: "i3", label: "return" },
        ],
      },
      {
        id: "c-loop-int-05",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the logic to skip the even-indexed elements in an array iteration.",
        code: 'for (int i = 0; i < size; i++) {\n    if (i % 2 == 0) ___1___;\n    printf("%d ", arr[i]);\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "continue" },
          { id: "i2", label: "break" },
          { id: "i3", label: "goto end" },
        ],
      },
    ],
    array: [
      {
        id: "c-arr-int-01",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the pointer notation equivalent to the array subscript access arr[i].",
        code: "int arr[5] = {10, 20, 30, 40, 50};\nint value1 = arr[2];\nint value2 = ___1___;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "*(arr + 2)" },
          { id: "i2", label: "*arr + 2" },
          { id: "i3", label: "arr + 2" },
        ],
      },
      {
        id: "c-arr-int-02",
        topic: "Array",
        instruction:
          "Fill in ___1___ to correctly declare a 2D array with 2 rows and 3 columns.",
        code: "int matrix___1___ = {\n    {1, 2, 3},\n    {4, 5, 6}\n};",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "[2][3]" },
          { id: "i2", label: "[3][2]" },
          { id: "i3", label: "[2, 3]" },
        ],
      },
      {
        id: "c-arr-int-03",
        topic: "Array",
        instruction:
          "Fill in ___1___ to dynamically allocate an array of integers on the heap.",
        code: "int size = 10;\nint *dynamicArr = (int *)___1___(size * sizeof(int));\nif (dynamicArr != NULL) {\n    // Use array...\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "malloc" },
          { id: "i2", label: "alloc" },
          { id: "i3", label: "new" },
        ],
      },
      {
        id: "c-arr-int-04",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the keyword to declare an array whose size is determined at runtime (VLA).",
        code: "void process(int n) {\n    ___1___ int tempArray[n]; // Valid since C99\n    // ...\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "int" }, // Note: No extra keyword needed, but testing the type placement
          { id: "i2", label: "static" },
          { id: "i3", label: "extern" },
        ],
      },
      {
        id: "c-arr-int-05",
        topic: "Array",
        instruction:
          "Fill in ___1___ to correctly pass a 2D array to a function, specifying the column width.",
        code: "void printMatrix(int m[][___1___], int rows) {\n    // Function body\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "3" },
          { id: "i2", label: "*" },
          { id: "i3", label: " " },
        ],
      },
    ],
  },
};

export const javaQuiz = {
  beginner: {
    "variables and data types": [
      {
        id: "java-vdt-01",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the keyword for a constant value that cannot be changed after assignment.",
        code: "___1___ double PI = 3.14159;\n// PI = 3.14; // This would cause a compiler error",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "final" },
          { id: "i2", label: "const" },
          { id: "i3", label: "static" },
        ],
      },
      {
        id: "java-vdt-02",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the primitive type for a single character and ___2___ with the Object type for text.",
        code: "___1___ letter = 'A';\n___2___ name = \"Java\";",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "char" },
          { id: "i2", label: "String" },
          { id: "i3", label: "string" },
        ],
      },
      {
        id: "java-vdt-03",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the numeric type used for very large whole numbers (64-bit).",
        code: "___1___ worldPopulation = 8000000000L;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "long" },
          { id: "i2", label: "int" },
          { id: "i3", label: "short" },
        ],
      },
      {
        id: "java-vdt-04",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the keyword used to let the compiler infer the variable type (available since Java 10).",
        code: '___1___ message = "Hello World";\n// Compiler treats message as a String',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "var" },
          { id: "i2", label: "auto" },
          { id: "i3", label: "let" },
        ],
      },
      {
        id: "java-vdt-05",
        topic: "Variables and Data Types",
        instruction:
          "Fill in ___1___ with the primitive type used for true/false values.",
        code: '___1___ isJavaFun = true;\nif (isJavaFun) {\n    System.out.println("Yes!");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "boolean" },
          { id: "i2", label: "bool" },
          { id: "i3", label: "bit" },
        ],
      },
    ],
    "operator and expressions": [
      {
        id: "java-ope-01",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the operator used for string concatenation.",
        code: 'String firstName = "Java";\nString fullName = firstName ___1___ " Script";\n// Result: "Java Script"',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "+" },
          { id: "i2", label: "&" },
          { id: "i3", label: "." },
        ],
      },
      {
        id: "java-ope-02",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the increment operator and ___2___ with the modulus operator to check for a remainder.",
        code: "int count = 10;\ncount___1___; // Add 1 to count\nint remainder = count ___2___ 3;",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "++" },
          { id: "i2", label: "%" },
          { id: "i3", label: "^" },
        ],
      },
      {
        id: "java-ope-03",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the logical AND operator and ___2___ with the logical OR operator.",
        code: "if (age > 18 ___1___ hasLicense == true) { ... }\nif (isWeekend ___2___ isHoliday) { ... }",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "&&" },
          { id: "i2", label: "||" },
          { id: "i3", label: "AND" },
        ],
      },
      {
        id: "java-ope-04",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the compound assignment operator to add 5 to the current value of 'score'.",
        code: "int score = 100;\nscore ___1___ 5; // Equivalent to score = score + 5",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "+=" },
          { id: "i2", label: "=+" },
          { id: "i3", label: "++" },
        ],
      },
      {
        id: "java-ope-05",
        topic: "Operator and Expressions",
        instruction:
          "Fill in ___1___ with the relational operator for 'not equal to'.",
        code: 'if (inputStatus ___1___ "EXIT") {\n    System.out.println("Continuing...");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "!=" },
          { id: "i2", label: "<>" },
          { id: "i3", label: "not=" },
        ],
      },
    ],
    "input and output": [
      {
        id: "java-io-01",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the class used to read user input and ___2___ with the keyword to create a new instance of it.",
        code: "___1___ input = ___2___ Scanner(System.in);\nint age = input.nextInt();",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "Scanner" },
          { id: "i2", label: "new" },
          { id: "i3", label: "Read" },
        ],
      },
      {
        id: "java-io-02",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the method that prints text and moves to a new line.",
        code: 'System.out.___1___("Hello Java");',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "println" },
          { id: "i2", label: "print" },
          { id: "i3", label: "write" },
        ],
      },
      {
        id: "java-io-03",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the method used to read an entire line of text as a String.",
        code: "Scanner sc = new Scanner(System.in);\nString name = sc.___1___();",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "nextLine" },
          { id: "i2", label: "nextString" },
          { id: "i3", label: "read" },
        ],
      },
      {
        id: "java-io-04",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the standard input stream object passed to the Scanner constructor.",
        code: "Scanner input = new Scanner(System.___1___);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "in" },
          { id: "i2", label: "out" },
          { id: "i3", label: "keyboard" },
        ],
      },
      {
        id: "java-io-05",
        topic: "Input and Output",
        instruction:
          "Fill in ___1___ with the method used to output formatted text (similar to C's printf).",
        code: 'double price = 19.99;\nSystem.out.___1___("Price: %.2f", price);',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "printf" },
          { id: "i2", label: "formatln" },
          { id: "i3", label: "printF" },
        ],
      },
    ],
    coditionals: [
      {
        id: "java-cond-01",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the keyword to check another condition if the first is false, and ___2___ for the final catch-all block.",
        code: 'if (score > 90) {\n    grade = "A";\n} ___1___ (score > 80) {\n    grade = "B";\n} ___2___ {\n    grade = "F";\n}',
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "else if" },
          { id: "i2", label: "else" },
          { id: "i3", label: "elif" },
        ],
      },
      {
        id: "java-cond-02",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the keyword used to start a multi-way branch based on a single value.",
        code: 'String day = "MON";\n___1___ (day) {\n    case "MON": \n        System.out.println("Start");\n        break;\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "switch" },
          { id: "i2", label: "select" },
          { id: "i3", label: "match" },
        ],
      },
      {
        id: "java-cond-03",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the keyword to prevent 'falling through' to the next case in a switch statement.",
        code: 'case "RED":\n    System.out.println("Stop");\n    ___1___;\ncase "GREEN":\n    System.out.println("Go");',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "break" },
          { id: "i2", label: "stop" },
          { id: "i3", label: "exit" },
        ],
      },
      {
        id: "java-cond-04",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the keyword that handles any cases not explicitly defined in a switch block.",
        code: 'switch (level) {\n    case 1: System.out.println("Easy"); break;\n    ___1___: System.out.println("Unknown");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "default" },
          { id: "i2", label: "else" },
          { id: "i3", label: "other" },
        ],
      },
      {
        id: "java-cond-05",
        topic: "Conditionals",
        instruction:
          "Fill in ___1___ with the correct method to check if two Strings have the same content (rather than checking memory address).",
        code: 'String s1 = "hello";\nif (s1.___1___("hello")) {\n    System.out.println("Match found");\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "equals" },
          { id: "i2", label: "==" },
          { id: "i3", label: "compare" },
        ],
      },
    ],
    looping: [
      {
        id: "java-loop-01",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the keyword for a loop that always executes its block at least once before checking the condition.",
        code: '___1___ {\n    System.out.println("Processing...");\n} while (condition);',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "do" },
          { id: "i2", label: "while" },
          { id: "i3", label: "for" },
        ],
      },
      {
        id: "java-loop-02",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the boolean literal used to create an intentional infinite while-loop.",
        code: 'while (___1___) {\n    System.out.println("Running service...");\n    if (stopSignal) break;\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "true" },
          { id: "i2", label: "1" },
          { id: "i3", label: "yes" },
        ],
      },
      {
        id: "java-loop-03",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the keyword used to terminate the loop entirely when a condition is met.",
        code: "for (int i = 0; i < 100; i++) {\n    if (i == 5) ___1___;\n    System.out.println(i);\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "break" },
          { id: "i2", label: "continue" },
          { id: "i3", label: "stop" },
        ],
      },
      {
        id: "java-loop-04",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the keyword used to skip the rest of the current iteration and move to the next one.",
        code: "for (int i = 1; i <= 5; i++) {\n    if (i == 3) ___1___;\n    System.out.println(i);\n} // Output: 1, 2, 4, 5",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "continue" },
          { id: "i2", label: "skip" },
          { id: "i3", label: "break" },
        ],
      },
      {
        id: "java-loop-05",
        topic: "Looping",
        instruction:
          "Fill in ___1___ with the update expression that increments the loop counter by 1 in each step.",
        code: 'for (int i = 0; i < 10; ___1___) {\n    System.out.println("Step: " + i);\n}',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "i++" },
          { id: "i2", label: "i + 1" },
          { id: "i3", label: "++" },
        ],
      },
    ],
    array: [
      {
        id: "java-arr-01",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the square brackets for type declaration and ___2___ with the keyword to allocate memory.",
        code: "int___1___ numbers = ___2___ int[5];",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "[]" },
          { id: "i2", label: "new" },
          { id: "i3", label: "malloc" },
        ],
      },
      {
        id: "java-arr-02",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the property used to get the number of elements in a Java array.",
        code: 'String[] names = {"Alice", "Bob", "Charlie"};\nint size = names.___1___;',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "length" },
          { id: "i2", label: "size()" },
          { id: "i3", label: "count" },
        ],
      },
      {
        id: "java-arr-03",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the separator used in an enhanced for-loop (for-each) to iterate through elements.",
        code: "int[] scores = {85, 92, 78};\nfor (int s ___1___ scores) {\n    System.out.println(s);\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: ":" },
          { id: "i2", label: "in" },
          { id: "i3", label: "->" },
        ],
      },
      {
        id: "java-arr-04",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the index of the first element and ___2___ with the index of the last element in this array.",
        code: "int[] vals = {10, 20, 30};\nint first = vals[___1___];\nint last = vals[___2___];",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "0" },
          { id: "i2", label: "2" },
          { id: "i3", label: "1" },
        ],
      },
      {
        id: "java-arr-05",
        topic: "Array",
        instruction:
          "Fill in ___1___ with the curly braces used to perform an 'anonymous' array initialization.",
        code: "int[] data;\ndata = new int[] ___1___ 1, 2, 3 };",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "{" },
          { id: "i2", label: "[" },
          { id: "i3", label: "(" },
        ],
      },
    ],
  },
  intermediate: {
    "variables and data type": [
      {
        id: "java-var-int-01",
        topic: "Narrowing Casting",
        instruction:
          "Fill in ___1___ with the syntax to manually cast a double to an int.",
        code: "double d = 9.78;\nint i = ___1___ d;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "(int)" },
          { id: "i2", label: "int" },
          { id: "i3", label: "toInteger()" },
        ],
      },
      {
        id: "java-var-int-02",
        topic: "Wrapper Classes",
        instruction:
          "Fill in ___1___ with the wrapper class used for the 'int' primitive to allow it in Collections.",
        code: "ArrayList<___1___> list = new ArrayList<>();",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "Integer" },
          { id: "i2", label: "Int" },
          { id: "i3", label: "Number" },
        ],
      },
      {
        id: "java-var-int-03",
        topic: "Constant Variables",
        instruction:
          "Fill in ___1___ with the keyword used to declare a constant whose value cannot change once assigned.",
        code: "public static ___1___ int MAX_VALUE = 100;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "final" },
          { id: "i2", label: "static" },
          { id: "i3", label: "const" },
        ],
      },
      {
        id: "java-var-int-04",
        topic: "Autoboxing",
        instruction:
          "Fill in ___1___ with the term for automatically converting a primitive into its wrapper object.",
        code: "Integer x = 5; // This process is called ___1___",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "Autoboxing" },
          { id: "i2", label: "Unboxing" },
          { id: "i3", label: "Wrapping" },
        ],
      },
      {
        id: "java-var-int-05",
        topic: "Var Keyword",
        instruction:
          "Fill in ___1___ with the keyword introduced in Java 10 for local variable type inference.",
        code: "___1___ message = 'Hello Mantra';",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "var" },
          { id: "i2", label: "auto" },
          { id: "i3", label: "dynamic" },
        ],
      },
    ],
    "operator and expressions": [
      {
        id: "java-op-int-01",
        topic: "Instanceof Operator",
        instruction:
          "Fill in ___1___ with the operator used to test if an object is an instance of a specific class.",
        code: "if (myObj ___1___ String) {\n  System.out.println('It is a string');\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "instanceof" },
          { id: "i2", label: "isA" },
          { id: "i3", label: "typeOf" },
        ],
      },
      {
        id: "java-op-int-02",
        topic: "Compound Assignment",
        instruction:
          "Fill in ___1___ with the operator that performs both division and assignment.",
        code: "int x = 100;\nx ___1___ 5; // x is now 20",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "/=" },
          { id: "i2", label: "%=" },
          { id: "i3", label: "div=" },
        ],
      },
      {
        id: "java-op-int-03",
        topic: "Bitwise Shift",
        instruction:
          "Fill in ___1___ with the operator used to shift bits to the left.",
        code: "int val = 2; // binary 0010\nint result = val ___1___ 1; // result is 4 (binary 0100)",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "<<" },
          { id: "i2", label: ">>" },
          { id: "i3", label: ">>>" },
        ],
      },
      {
        id: "java-op-int-04",
        topic: "Short-circuit Evaluation",
        instruction:
          "Identify which operator prevents the second expression from running if the first is false.",
        code: "if (list != null ___1___ list.size() > 0) {\n  // list.size() won't crash if list is null\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "&&" },
          { id: "i2", label: "&" },
          { id: "i3", label: "AND" },
        ],
      },
      {
        id: "java-op-int-05",
        topic: "Unsigned Right Shift",
        instruction:
          "Fill in ___1___ with the operator that shifts bits right, filling the new bits with zeros regardless of sign.",
        code: "int n = -1;\nint result = n ___1___ 24;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: ">>>" },
          { id: "i2", label: ">>" },
          { id: "i3", label: ">>!" },
        ],
      },
    ],
    "input and output": [
      {
        id: "java-io-int-01",
        topic: "Buffered Reading",
        instruction:
          "Fill in ___1___ with the class that reads text from a character-input stream, buffering characters for efficiency.",
        code: "FileReader fr = new FileReader('test.txt');\n___1___ reader = new ___1___(fr);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "BufferedReader" },
          { id: "i2", label: "Scanner" },
          { id: "i3", label: "StreamReader" },
        ],
      },
      {
        id: "java-io-int-02",
        topic: "Formatted Output",
        instruction:
          "Fill in ___1___ with the method used to write formatted text to the console (similar to C's printf).",
        code: "double price = 19.99;\nSystem.out.___1___('Price: %.2f', price);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "printf" },
          { id: "i2", label: "formatln" },
          { id: "i3", label: "printFmt" },
        ],
      },
      {
        id: "java-io-int-03",
        topic: "File Existence",
        instruction:
          "Fill in ___1___ with the method used to check if a file actually exists on the disk.",
        code: "File file = new File('data.txt');\nif (file.___1___()) { /* ... */ }",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "exists" },
          { id: "i2", label: "isFound" },
          { id: "i3", label: "available" },
        ],
      },
      {
        id: "java-io-int-04",
        topic: "PrintWriter",
        instruction:
          "Fill in ___1___ with the class used to write formatted representations of objects to a text-output stream.",
        code: "___1___ out = new ___1___('output.txt');\nout.println('Hello Mantra');",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "PrintWriter" },
          { id: "i2", label: "BufferedWriter" },
          { id: "i3", label: "FileWriter" },
        ],
      },
      {
        id: "java-io-int-05",
        topic: "Try-with-resources",
        instruction:
          "Identify the block structure that ensures resources like streams are closed automatically.",
        code: "___1___ (FileReader fr = new FileReader('file.txt')) {\n  // work with file\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "try" },
          { id: "i2", label: "using" },
          { id: "i3", label: "resource" },
        ],
      },
    ],
    conditionals: [
      {
        id: "java-cond-int-01",
        topic: "Switch Expression",
        instruction:
          "Fill in ___1___ with the arrow syntax used in modern Java switch expressions.",
        code: "String result = switch (day) {\n  case 'MON' ___1___ 'Start';\n  default ___1___ 'Middle';\n};",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "->" },
          { id: "i2", label: ":" },
          { id: "i3", label: "=>" },
        ],
      },
      {
        id: "java-cond-int-02",
        topic: "Yield Keyword",
        instruction:
          "Fill in ___1___ with the keyword used to return a value from a multi-line switch expression block.",
        code: "int val = switch (type) {\n  case 1 -> {\n    int x = 10;\n    ___1___ x * 2;\n  }\n  default -> 0;\n};",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "yield" },
          { id: "i2", label: "return" },
          { id: "i3", label: "break" },
        ],
      },
      {
        id: "java-cond-int-03",
        topic: "Pattern Matching",
        instruction:
          "Fill in ___1___ and ___2___ with the syntax for Pattern Matching for instanceof (Java 16+).",
        code: "if (obj instanceof String ___1___) {\n  System.out.println(___2___.length());\n}",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i1" },
        ],
        options: [
          { id: "i1", label: "s" },
          { id: "i2", label: "str" },
          { id: "i3", label: "String" },
        ],
      },
      {
        id: "java-cond-int-04",
        topic: "Boolean Logic",
        instruction:
          "Fill in ___1___ with the operator that performs a logical XOR (Exclusive OR).",
        code: "boolean error = (true ___1___ true); // result is false",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "^" },
          { id: "i2", label: "!" },
          { id: "i3", label: "||" },
        ],
      },
      {
        id: "java-cond-int-05",
        topic: "Object Equality",
        instruction:
          "Fill in ___1___ with the correct method to compare the content of two String objects.",
        code: "if (name1.___1___(name2)) {\n  System.out.println('Same text');\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "equals" },
          { id: "i2", label: "==" },
          { id: "i3", label: "compare" },
        ],
      },
    ],
    looping: [
      {
        id: "java-loop-int-01",
        topic: "Enhanced For Loop",
        instruction:
          "Fill in ___1___ with the separator used in the for-each loop to iterate over a collection.",
        code: "List<String> names = List.of('A', 'B');\nfor (String n ___1___ names) {\n  System.out.println(n);\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: ":" },
          { id: "i2", label: "->" },
          { id: "i3", label: "in" },
        ],
      },
      {
        id: "java-loop-int-02",
        topic: "Iterator",
        instruction:
          "Fill in ___1___ and ___2___ with the methods used to manually traverse a collection safely.",
        code: "Iterator<Integer> it = list.iterator();\nwhile (it.___1___()) {\n  Integer i = it.___2___();\n}",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "hasNext" },
          { id: "i2", label: "next" },
          { id: "i3", label: "hasMore" },
        ],
      },
      {
        id: "java-loop-int-03",
        topic: "Stream forEach",
        instruction:
          "Fill in ___1___ with the method used to perform an action for each element of a stream.",
        code: "List.of(1, 2, 3).stream().___1___(System.out::println);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "forEach" },
          { id: "i2", label: "runEach" },
          { id: "i3", label: "apply" },
        ],
      },
      {
        id: "java-loop-int-04",
        topic: "Stream Filter",
        instruction:
          "Fill in ___1___ with the intermediate stream operation used to exclude elements.",
        code: "long count = list.stream().___1___(x -> x > 10).count();",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "filter" },
          { id: "i2", label: "where" },
          { id: "i3", label: "select" },
        ],
      },
      {
        id: "java-loop-int-05",
        topic: "Stream Map",
        instruction:
          "Fill in ___1___ with the stream operation that transforms each element into something else.",
        code: "List<Integer> lengths = names.stream().___1___(String::length).toList();",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "map" },
          { id: "i2", label: "convert" },
          { id: "i3", label: "transform" },
        ],
      },
    ],
    array: [
      {
        id: "java-arr-int-01",
        topic: "Arrays Utility",
        instruction:
          "Fill in ___1___ with the static method used to sort an array in ascending order.",
        code: "int[] data = {5, 2, 8, 1};\nArrays.___1___(data);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "sort" },
          { id: "i2", label: "arrange" },
          { id: "i3", label: "order" },
        ],
      },
      {
        id: "java-arr-int-02",
        topic: "Array to List",
        instruction:
          "Fill in ___1___ with the method used to return a fixed-size list backed by the specified array.",
        code: 'String[] arr = {"A", "B"};\nList<String> list = Arrays.___1___(arr);',
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "asList" },
          { id: "i2", label: "toList" },
          { id: "i3", label: "fromArray" },
        ],
      },
      {
        id: "java-arr-int-03",
        topic: "Multidimensional Arrays",
        instruction:
          "Fill in ___1___ and ___2___ to access the value '7' in this 2D array.",
        code: "int[][] matrix = { {1, 2}, {7, 9} };\nint val = matrix[___1___][___2___];",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "1" },
          { id: "i2", label: "0" },
          { id: "i3", label: "2" },
        ],
      },
      {
        id: "java-arr-int-04",
        topic: "Binary Search",
        instruction:
          "Fill in ___1___ with the method used to search a sorted array for a specific value.",
        code: "int[] nums = {10, 20, 30, 40};\nint pos = Arrays.___1___(nums, 30);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "binarySearch" },
          { id: "i2", label: "find" },
          { id: "i3", label: "lookup" },
        ],
      },
      {
        id: "java-arr-int-05",
        topic: "Stream API",
        instruction:
          "Fill in ___1___ with the method used to convert an array into a Stream.",
        code: "int[] nums = {1, 2, 3};\nint sum = Arrays.___1___(nums).sum();",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "stream" },
          { id: "i2", label: "asStream" },
          { id: "i3", label: "of" },
        ],
      },
    ],
  },
};

export const javascriptQuiz = {
  beginner: {
    "operator and expressions": [
      {
        id: "js-op-beg-01",
        topic: "Arithmetic Operators",
        instruction:
          "Fill in ___1___ with the operator used to find the remainder of a division (modulo).",
        code: "let remainder = 10 ___1___ 3; // result is 1",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "%" },
          { id: "i2", label: "/" },
          { id: "i3", label: "#" },
        ],
      },
      {
        id: "js-op-beg-02",
        topic: "Strict Equality",
        instruction:
          "Fill in ___1___ with the operator that checks for both value and type equality.",
        code: "if (5 ___1___ '5') {\n  // This will be false\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "===" },
          { id: "i2", label: "==" },
          { id: "i3", label: "=" },
        ],
      },
      {
        id: "js-op-beg-03",
        topic: "Logical AND",
        instruction:
          "Fill in ___1___ with the operator that returns true only if both operands are true.",
        code: "if (isLoggedIn ___1___ hasPermission) {\n  // Access granted\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "&&" },
          { id: "i2", label: "||" },
          { id: "i3", label: "!" },
        ],
      },
      {
        id: "js-op-beg-04",
        topic: "Increment",
        instruction:
          "Fill in ___1___ with the shorthand operator to increase a variable's value by 1.",
        code: "let count = 0;\ncount___1___;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "++" },
          { id: "i2", label: "+=" },
          { id: "i3", label: "+" },
        ],
      },
      {
        id: "js-op-beg-05",
        topic: "String Concatenation",
        instruction:
          "Fill in ___1___ with the operator used to join two strings together.",
        code: "let full = 'Java' ___1___ 'Script';",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "+" },
          { id: "i2", label: "&" },
          { id: "i3", label: "concat" },
        ],
      },
    ],
    "variables and data type": [
      {
        id: "js-var-beg-01",
        topic: "Variable Declaration",
        instruction:
          "Fill in ___1___ with the keyword used to declare a variable that cannot be reassigned.",
        code: "___1___ PI = 3.14159;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "const" },
          { id: "i2", label: "let" },
          { id: "i3", label: "var" },
        ],
      },
      {
        id: "js-var-beg-02",
        topic: "Data Types",
        instruction:
          "Fill in ___1___ with the operator used to check the data type of a value.",
        code: "let name = 'Mantra';\nconsole.log(___1___ name);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "typeof" },
          { id: "i2", label: "type" },
          { id: "i3", label: "instanceof" },
        ],
      },
      {
        id: "js-var-beg-03",
        topic: "Boolean Type",
        instruction:
          "Fill in ___1___ with the correct boolean literal for a false value.",
        code: "let isComplete = ___1___;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "false" },
          { id: "i2", label: "False" },
          { id: "i3", label: "0" },
        ],
      },
      {
        id: "js-var-beg-04",
        topic: "Template Literals",
        instruction:
          "Fill in ___1___ with the character used to define template strings for variable interpolation.",
        code: "let greeting = ___1___Hello, ${name}___1___;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "`" },
          { id: "i2", label: "'" },
          { id: "i3", label: '"' },
        ],
      },
      {
        id: "js-var-beg-05",
        topic: "Null vs Undefined",
        instruction:
          "Fill in ___1___ with the value that represents an intentional absence of any object value.",
        code: "let result = ___1___;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "null" },
          { id: "i2", label: "undefined" },
          { id: "i3", label: "void" },
        ],
      },
    ],
    "input and output": [
      {
        id: "js-io-beg-01",
        topic: "Console Output",
        instruction:
          "Fill in ___1___ with the method used to print a message to the debugging console.",
        code: "console.___1___('Processing data...');",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "log" },
          { id: "i2", label: "print" },
          { id: "i3", label: "write" },
        ],
      },
      {
        id: "js-io-beg-02",
        topic: "Browser Alert",
        instruction:
          "Fill in ___1___ with the function that displays an objective dialog box with a message.",
        code: "___1___('Welcome to Mantra!');",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "alert" },
          { id: "i2", label: "popup" },
          { id: "i3", label: "notice" },
        ],
      },
      {
        id: "js-io-beg-03",
        topic: "User Confirmation",
        instruction:
          "Fill in ___1___ with the method that asks the user to verify an action with OK or Cancel.",
        code: "let proceed = ___1___('Do you want to delete this?');",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "confirm" },
          { id: "i2", label: "ask" },
          { id: "i3", label: "verify" },
        ],
      },
      {
        id: "js-io-beg-04",
        topic: "User Input String",
        instruction:
          "Fill in ___1___ with the method used to display a dialog that prompts the user for text input.",
        code: "let name = ___1___('Please enter your name:');",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "prompt" },
          { id: "i2", label: "input" },
          { id: "i3", label: "getText" },
        ],
      },
      {
        id: "js-io-beg-05",
        topic: "Console Error",
        instruction:
          "Fill in ___1___ with the console method specifically used for outputting error messages.",
        code: "console.___1___('Something went wrong!');",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "error" },
          { id: "i2", label: "warn" },
          { id: "i3", label: "stop" },
        ],
      },
    ],
    conditionals: [
      {
        id: "js-cond-beg-01",
        topic: "If Statement",
        instruction:
          "Fill in ___1___ with the keyword used to execute code only if a condition is true.",
        code: "___1___ (score > 50) {\n  console.log('Passed');\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "if" },
          { id: "i2", label: "when" },
          { id: "i3", label: "check" },
        ],
      },
      {
        id: "js-cond-beg-02",
        topic: "Else Clause",
        instruction:
          "Fill in ___1___ with the keyword that handles the alternative when the 'if' condition is false.",
        code: "if (isRaining) {\n  takeUmbrella();\n} ___1___ {\n  wearSunglasses();\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "else" },
          { id: "i2", label: "otherwise" },
          { id: "i3", label: "then" },
        ],
      },
      {
        id: "js-cond-beg-03",
        topic: "Switch Statement",
        instruction:
          "Fill in ___1___ with the keyword used to define a specific match within a switch block.",
        code: "switch (day) {\n  ___1___ 'Monday':\n    console.log('Start');\n    break;\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "case" },
          { id: "i2", label: "match" },
          { id: "i3", label: "option" },
        ],
      },
      {
        id: "js-cond-beg-04",
        topic: "Comparison",
        instruction:
          "Fill in ___1___ with the operator used to check if a value is greater than or equal to another.",
        code: "if (age ___1___ 18) {\n  canVote = true;\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: ">=" },
          { id: "i2", label: "=>" },
          { id: "i3", label: ">" },
        ],
      },
      {
        id: "js-cond-beg-05",
        topic: "Switch Default",
        instruction:
          "Fill in ___1___ with the keyword that runs if no cases match in a switch statement.",
        code: "switch (color) {\n  case 'red': stop(); break;\n  ___1___: go();\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "default" },
          { id: "i2", label: "fallback" },
          { id: "i3", label: "else" },
        ],
      },
    ],
    looping: [
      {
        id: "js-loop-beg-01",
        topic: "For Loop Syntax",
        instruction:
          "Fill in ___1___ with the keyword used to initialize a standard counter-based loop.",
        code: "___1___ (let i = 0; i < 5; i++) {\n  console.log(i);\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "for" },
          { id: "i2", label: "loop" },
          { id: "i3", label: "repeat" },
        ],
      },
      {
        id: "js-loop-beg-02",
        topic: "While Loop",
        instruction:
          "Fill in ___1___ with the keyword for a loop that runs as long as a condition remains true.",
        code: "___1___ (count < 10) {\n  count++;\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "while" },
          { id: "i2", label: "until" },
          { id: "i3", label: "during" },
        ],
      },
      {
        id: "js-loop-beg-03",
        topic: "Infinite Loop Prevention",
        instruction:
          "Fill in ___1___ with the part of the for-loop that updates the counter to eventually end the loop.",
        code: "for (let i = 0; i < 10; ___1___) {\n  // code\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "i++" },
          { id: "i2", label: "i = 0" },
          { id: "i3", label: "i < 10" },
        ],
      },
      {
        id: "js-loop-beg-04",
        topic: "Break Statement",
        instruction:
          "Fill in ___1___ with the keyword used to exit a loop immediately.",
        code: "for (let i = 0; i < 10; i++) {\n  if (i === 5) ___1___;\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "break" },
          { id: "i2", label: "stop" },
          { id: "i3", label: "exit" },
        ],
      },
      {
        id: "js-loop-beg-05",
        topic: "Continue Statement",
        instruction:
          "Fill in ___1___ with the keyword used to skip the current iteration and move to the next one.",
        code: "for (let i = 0; i < 5; i++) {\n  if (i === 2) ___1___;\n  console.log(i);\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "continue" },
          { id: "i2", label: "skip" },
          { id: "i3", label: "next" },
        ],
      },
    ],
    array: [
      {
        id: "js-arr-beg-01",
        topic: "Array Creation",
        instruction:
          "Fill in ___1___ with the square brackets used to define an array literal.",
        code: "const colors = ___1___ 'red', 'blue', 'green' ];",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "[" },
          { id: "i2", label: "{" },
          { id: "i3", label: "(" },
        ],
      },
      {
        id: "js-arr-beg-02",
        topic: "Array Length",
        instruction:
          "Fill in ___1___ with the property that returns the number of elements in the array.",
        code: "const fruits = ['apple', 'orange'];\nconsole.log(fruits.___1___);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "length" },
          { id: "i2", label: "size" },
          { id: "i3", label: "count" },
        ],
      },
      {
        id: "js-arr-beg-03",
        topic: "Adding Elements",
        instruction:
          "Fill in ___1___ with the method used to add a new element to the end of an array.",
        code: "let pets = ['cat', 'dog'];\npets.___1___('bird');",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "push" },
          { id: "i2", label: "add" },
          { id: "i3", label: "append" },
        ],
      },
      {
        id: "js-arr-beg-04",
        topic: "Accessing Elements",
        instruction:
          "Fill in ___1___ with the correct index to access the first element of the array.",
        code: "const names = ['Alice', 'Bob'];\nconst first = names[___1___];",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "0" },
          { id: "i2", label: "1" },
          { id: "i3", label: "-1" },
        ],
      },
      {
        id: "js-arr-beg-05",
        topic: "Removing Elements",
        instruction:
          "Fill in ___1___ with the method that removes the last element from an array.",
        code: "let tools = ['hammer', 'drill'];\nlet last = tools.___1___();",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "pop" },
          { id: "i2", label: "remove" },
          { id: "i3", label: "shift" },
        ],
      },
    ],
  },
  intermediate: {
    "variables and data type": [
      {
        id: "js-var-int-01",
        topic: "Block Scope",
        instruction:
          "Fill in ___1___ with the keyword that provides block scoping and prevents hoisting to the top of the function.",
        code: "if (true) {\n  ___1___ score = 100;\n}\n// score is not accessible here",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "let" },
          { id: "i2", label: "var" },
          { id: "i3", label: "global" },
        ],
      },
      {
        id: "js-var-int-02",
        topic: "Type Coercion",
        instruction:
          "Fill in ___1___ with the value resulting from the string and number addition.",
        code: "let val = '5' + 2; // val becomes ___1___",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "'52'" },
          { id: "i2", label: "7" },
          { id: "i3", label: "NaN" },
        ],
      },
      {
        id: "js-var-int-03",
        topic: "Object Shorthand",
        instruction:
          "Fill in ___1___ with the variable name to use property shorthand in this object.",
        code: "const speed = 50;\nconst car = { ___1___ };",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "speed" },
          { id: "i2", label: "speed: speed" },
          { id: "i3", label: "this.speed" },
        ],
      },
      {
        id: "js-var-int-04",
        topic: "Primitive vs Reference",
        instruction:
          "Identify what happens when an object is assigned to a new variable.",
        code: "let a = { n: 1 };\nlet b = a;\nb.n = 2;\n// a.n is now ___1___",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "2" },
          { id: "i2", label: "1" },
          { id: "i3", label: "undefined" },
        ],
      },
      {
        id: "js-var-int-05",
        topic: "Symbol Type",
        instruction:
          "Fill in ___1___ with the data type used to create unique, anonymous identifiers for object properties.",
        code: "const id = ___1___('id');",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "Symbol" },
          { id: "i2", label: "Unique" },
          { id: "i3", label: "Secret" },
        ],
      },
    ],
    "operator and expressions": [
      {
        id: "js-op-int-01",
        topic: "Nullish Coalescing",
        instruction:
          "Fill in ___1___ with the operator that returns the right-hand side when the left-hand side is null or undefined.",
        code: "let settings = null;\nlet theme = settings ___1___ 'dark';",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "??" },
          { id: "i2", label: "||" },
          { id: "i3", label: "?." },
        ],
      },
      {
        id: "js-op-int-02",
        topic: "Ternary Operator",
        instruction:
          "Fill in ___1___ and ___2___ to complete the conditional (ternary) operator.",
        code: "let status = (age >= 18) ___1___ 'Adult' ___2___ 'Minor';",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "?" },
          { id: "i2", label: ":" },
          { id: "i3", label: "!" },
        ],
      },
      {
        id: "js-op-int-03",
        topic: "Optional Chaining",
        instruction:
          "Fill in ___1___ with the operator used to safely access a nested property that might not exist.",
        code: "const user = {};\nconst city = user.___1___address.city;",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "?." },
          { id: "i2", label: "??" },
          { id: "i3", label: "!!" },
        ],
      },
      {
        id: "js-op-int-04",
        topic: "Logical Assignment",
        instruction:
          "Fill in ___1___ with the operator that assigns a value only if the variable is currently falsy.",
        code: "let msg = '';\nmsg ___1___ 'Default Message';",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "||=" },
          { id: "i2", label: "&&=" },
          { id: "i3", label: "??=" },
        ],
      },
      {
        id: "js-op-int-05",
        topic: "Spread Operator",
        instruction:
          "Fill in ___1___ with the operator used to expand an array into individual elements.",
        code: "const parts = ['shoulders', 'knees'];\nconst body = ['head', ___1___parts, 'toes'];",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "..." },
          { id: "i2", label: "*" },
          { id: "i3", label: "[]" },
        ],
      },
    ],
    "input and output": [
      {
        id: "js-io-int-01",
        topic: "Fetch API",
        instruction:
          "Fill in ___1___ with the method used to start the process of fetching a resource from the network.",
        code: "___1___('https://api.example.com/data')\n  .then(response => response.json());",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "fetch" },
          { id: "i2", label: "get" },
          { id: "i3", label: "request" },
        ],
      },
      {
        id: "js-io-int-02",
        topic: "JSON Parsing",
        instruction:
          "Fill in ___1___ with the method that converts a JSON string into a JavaScript object.",
        code: "const json = '{\"id\": 1}';\nconst obj = JSON.___1___(json);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "parse" },
          { id: "i2", label: "stringify" },
          { id: "i3", label: "toObject" },
        ],
      },
      {
        id: "js-io-int-03",
        topic: "Asynchronous Input",
        instruction:
          "Fill in ___1___ with the keyword used to pause execution until a promise is resolved.",
        code: "async function getData() {\n  const res = ___1___ fetch(url);\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "await" },
          { id: "i2", label: "wait" },
          { id: "i3", label: "pause" },
        ],
      },
      {
        id: "js-io-int-04",
        topic: "JSON Stringify",
        instruction:
          "Fill in ___1___ with the method that converts a JavaScript value to a JSON string.",
        code: "const data = { score: 10 };\nconst jsonString = JSON.___1___(data);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "stringify" },
          { id: "i2", label: "convert" },
          { id: "i3", label: "format" },
        ],
      },
      {
        id: "js-io-int-05",
        topic: "Console Table",
        instruction:
          "Fill in ___1___ with the method that displays tabular data as a table in the console.",
        code: "const users = [{id:1, name:'A'}, {id:2, name:'B'}];\nconsole.___1___(users);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "table" },
          { id: "i2", label: "group" },
          { id: "i3", label: "dir" },
        ],
      },
    ],
    conditionals: [
      {
        id: "js-cond-int-01",
        topic: "Ternary Operator",
        instruction:
          "Fill in ___1___ and ___2___ with the symbols for the conditional (ternary) operator.",
        code: "const access = isAdmin ___1___ 'Full' ___2___ 'Limited';",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "?" },
          { id: "i2", label: ":" },
          { id: "i3", label: "!" },
        ],
      },
      {
        id: "js-cond-int-02",
        topic: "Short-circuit Evaluation",
        instruction:
          "Fill in ___1___ with the operator that executes the right side only if the left side is truthy.",
        code: "isLoggedIn ___1___ displayDashboard();",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "&&" },
          { id: "i2", label: "||" },
          { id: "i3", label: "??" },
        ],
      },
      {
        id: "js-cond-int-03",
        topic: "Nullish Coalescing",
        instruction:
          "Fill in ___1___ with the operator used to provide a default value only for null or undefined.",
        code: "const username = inputName ___1___ 'Guest';",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "??" },
          { id: "i2", label: "||" },
          { id: "i3", label: "&&" },
        ],
      },
      {
        id: "js-cond-int-04",
        topic: "Truthy/Falsy",
        instruction:
          "Identify which value is considered 'falsy' in a conditional check.",
        code: "let value = ___1___;\nif (value) { /* this won't run */ }",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "0" },
          { id: "i2", label: "'0'" },
          { id: "i3", label: "[]" },
        ],
      },
      {
        id: "js-cond-int-05",
        topic: "Optional Chaining",
        instruction:
          "Fill in ___1___ to safely check a property before evaluating the condition.",
        code: "if (user___1___settings___1___isActive) { \n  proceed(); \n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "?." },
          { id: "i2", label: "." },
          { id: "i3", label: "!!" },
        ],
      },
    ],
    looping: [
      {
        id: "js-loop-int-01",
        topic: "For...of Loop",
        instruction:
          "Fill in ___1___ with the keyword used to iterate over the *values* of an iterable (like an array).",
        code: "const colors = ['red', 'green'];\nfor (const color ___1___ colors) {\n  console.log(color);\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "of" },
          { id: "i2", label: "in" },
          { id: "i3", label: "from" },
        ],
      },
      {
        id: "js-loop-int-02",
        topic: "For...in Loop",
        instruction:
          "Fill in ___1___ with the keyword used to iterate over the *enumerable properties* (keys) of an object.",
        code: "const car = { make: 'Tesla', model: '3' };\nfor (const key ___1___ car) {\n  console.log(key);\n}",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "in" },
          { id: "i2", label: "of" },
          { id: "i3", label: "each" },
        ],
      },
      {
        id: "js-loop-int-03",
        topic: "forEach Method",
        instruction:
          "Fill in ___1___ with the array method that executes a provided function once for each array element.",
        code: "const nums = [1, 2, 3];\nnums.___1___(n => console.log(n));",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "forEach" },
          { id: "i2", label: "every" },
          { id: "i3", label: "map" },
        ],
      },
      {
        id: "js-loop-int-04",
        topic: "Every Method",
        instruction:
          "Fill in ___1___ with the method that tests whether *all* elements in the array pass the test.",
        code: "const allPositive = [1, 2, 3].___1___(n => n > 0);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "every" },
          { id: "i2", label: "some" },
          { id: "i3", label: "all" },
        ],
      },
      {
        id: "js-loop-int-05",
        topic: "Some Method",
        instruction:
          "Fill in ___1___ with the method that checks if *at least one* element passes the test.",
        code: "const hasEven = [1, 3, 4].___1___(n => n % 2 === 0);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "some" },
          { id: "i2", label: "any" },
          { id: "i3", label: "exists" },
        ],
      },
    ],
    array: [
      {
        id: "js-arr-int-01",
        topic: "Array Methods",
        instruction:
          "Fill in ___1___ with the method used to create a new array with all elements that pass a test.",
        code: "const ages = [18, 21, 15, 30];\nconst adults = ages.___1___(age => age >= 18);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "filter" },
          { id: "i2", label: "find" },
          { id: "i3", label: "map" },
        ],
      },
      {
        id: "js-arr-int-02",
        topic: "Destructuring",
        instruction:
          "Fill in ___1___ with the syntax to extract the first two elements and ___2___ for the rest of the elements.",
        code: "const [a, b, ___1___ ___2___] = [1, 2, 3, 4, 5];",
        blanks: [
          { id: "b1", placeholder: "___1___", correctItemId: "i1" },
          { id: "b2", placeholder: "___2___", correctItemId: "i2" },
        ],
        options: [
          { id: "i1", label: "..." },
          { id: "i2", label: "rest" },
          { id: "i3", label: "others" },
        ],
      },
      {
        id: "js-arr-int-03",
        topic: "Transformation",
        instruction:
          "Fill in ___1___ with the method that transforms each element in an array and returns a new array of the same length.",
        code: "const nums = [1, 2, 3];\nconst doubled = nums.___1___(x => x * 2);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "map" },
          { id: "i2", label: "forEach" },
          { id: "i3", label: "reduce" },
        ],
      },
      {
        id: "js-arr-int-04",
        topic: "Reduction",
        instruction:
          "Fill in ___1___ with the method used to execute a reducer function on each element to result in a single value.",
        code: "const sum = [1, 2, 3].___1___((acc, curr) => acc + curr, 0);",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "reduce" },
          { id: "i2", label: "combine" },
          { id: "i3", label: "aggregate" },
        ],
      },
      {
        id: "js-arr-int-05",
        topic: "Search",
        instruction:
          "Fill in ___1___ with the method that returns the index of the first element that satisfies the provided testing function.",
        code: "const fruits = ['apple', 'banana', 'cherry'];\nconst index = fruits.___1___(f => f === 'banana');",
        blanks: [{ id: "b1", placeholder: "___1___", correctItemId: "i1" }],
        options: [
          { id: "i1", label: "findIndex" },
          { id: "i2", label: "indexOf" },
          { id: "i3", label: "search" },
        ],
      },
    ],
  },
  advanced: [],
};
