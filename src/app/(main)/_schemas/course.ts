import z from "zod";

export const courseSchema = z.object({
  content_option: z.string().min(1, "Material is required"),
  programming_language: z.string().min(1, "Programming language is required"),

  difficulty_preference: z.enum(["beginner", "intermediate", "advanced"]),
  learning_goal: z.string().min(1, "Learning goal is required").max(500),

  // hint???
  prior_knowledge: z.string().min(1, "Prior knowledge is required").max(500),
});

export type CourseFormData = z.infer<typeof courseSchema>;
