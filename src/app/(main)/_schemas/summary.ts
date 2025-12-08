import z from "zod";

export const summarySchema = z
  .object({
    title: z.string().min(1, "Title is required").max(50, "Title too long"),
    topic: z.string().min(1, "Topic is required").max(50, "Topic too long"),

    content_file: z.any(),
  })
  .refine(
    (data) => {
      return !!data.content_file;
    },
    {
      message: "File is required",
      path: ["content_file"],
    }
  );

export type SummaryFormData = z.infer<typeof summarySchema>;
