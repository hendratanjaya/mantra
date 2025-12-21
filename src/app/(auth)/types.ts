import { JSX } from "react";
import { loginSchema } from "./_schemas/login";
import z from "zod";
import { registerSchema } from "./_schemas/register";

export type DataToValidate = {
  existingEmail: string;
  existingUsername: string;
  formEmail: string;
  formUsername: string;
};
export type AuthRespond<T extends Record<string, string>> = {
  success: boolean;
  type: keyof T | null;
  message: string;
};
export type FieldControllerType = {
  name: "name" | "username" | "email" | "password" | "conf_password";
  label: string;
  placeholder: string;
  isPassword?: boolean;
  isEmail?: boolean;
};
export type AuthState = {
  error: boolean | null;
  message: string;
};

export type AuthFormType = {
  title: string;
  formId: "register" | "login";
  desc: string;
  authState: AuthState;
  form: JSX.Element;
  pending: boolean;
};

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export type GoogleOauthUserData = {
  name: string;
  picture: string;
  email: string;
};
