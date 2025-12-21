import z from "zod";

export const userEditSchema = z.object({
  name: z.string().min(1, "Name is required").max(20, "Name too long"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username too long"),
});

export type userEditFormData = z.infer<typeof userEditSchema>;
