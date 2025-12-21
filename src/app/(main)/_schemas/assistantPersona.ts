import z from "zod";

export const assistantPersonaSchema = z.object({
  name: z.string().min(1, "Name is required").max(20, "Name too long"),
  style: z.string().min(1, "Style is required"),
  tone: z.string().min(1, "Tone is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description too long"),
});

export type assistantPersonaData = z.infer<typeof assistantPersonaSchema>;
