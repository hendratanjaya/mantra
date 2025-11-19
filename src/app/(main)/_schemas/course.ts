import z from "zod";

export const courseSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(100, "Title too long"),
    topic: z.string().min(1, "Topic is required").max(200, "Topic too long"),

    content_type: z.enum(["content_text", "content_file"]),
    content_text: z.string().optional(),
    content_file: z.any().optional(),

    difficulty_preference: z.enum(["beginner", "intermediate", "advanced"]),
    learning_goal: z.string().min(1, "Learning goal is required").max(500), 

    // hint???
    prior_knowledge: z.string().min(1, "Prior knowledge is required").max(500), 
  })
  .refine(
    (data) => {
      //one content source must be provided
      return !!(data.content_text || data.content_file);
    },
    {
      message:
        "Please provide content as text, or file based on content type you choose",
      path: ["content_type"],
    }
  );

export type CourseFormData = z.infer<typeof courseSchema>;
