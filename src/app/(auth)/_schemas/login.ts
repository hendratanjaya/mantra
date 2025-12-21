import z from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(6, "Password should contains at least 6 characters"),
});
