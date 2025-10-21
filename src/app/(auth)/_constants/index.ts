import { FieldControllerType } from "../types";

export const registerFormFields: FieldControllerType[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "input your name",
  },
  {
    name: "username",
    label: "Username",
    placeholder: "input your username",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "input your email",
    isEmail: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "input your password",
    isPassword: true,
  },
  {
    name: "conf_password",
    label: "Confirmation Password",
    placeholder: "input your password confirmation",
    isPassword: true,
  },
];

export const loginFormFields: FieldControllerType[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "input your email",
    isEmail: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "input your password",
    isPassword: true,
  },
];

export const oauthState = { error: "oauthError", success: "oauthSuccess" };
