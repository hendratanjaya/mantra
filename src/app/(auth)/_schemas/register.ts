import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.email().min(1, "Email is required"),
  password: z.string().min(6, "Password should contains at least 6 characters"),
  conf_password: z.string().min(1, "Password confirmation is required"),
});
