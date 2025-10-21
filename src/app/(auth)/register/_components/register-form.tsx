"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/app/(auth)/_schemas/register";
import { FieldController } from "../../_components/from-field-controller";
import { useState, useTransition } from "react";
import { registerAction } from "../action";
import { AuthState, RegisterFormData } from "../../types";
import { registerFormFields } from "../../_constants";
import AuthForm from "../../_components/auth-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [authState, setAuthState] = useState<AuthState>({
    error: false,
    message: "",
  });
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      conf_password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const isConfirmPasswordMatch = data.password === data.conf_password;

    if (!isConfirmPasswordMatch) {
      form.setError("conf_password", {
        message: "password mismatch",
      });
      return;
    }

    startTransition(async () => {
      const state = await registerAction(data);
      if (!state.success) {
        if (!state.type) setAuthState({ error: true, message: state.message });
        else form.setError(state.type, { message: state.message });
      } else {
        toast.success(state.message);
        setAuthState({ error: false, message: "" });
        router.push("/login");
      }
    });
  };

  const Form = () => {
    return (
      <form id="register" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-y-4">
          {registerFormFields.map((fField) => {
            return (
              <FieldController key={fField.name} {...fField} form={form} />
            );
          })}
        </FieldGroup>
      </form>
    );
  };

  return (
    <AuthForm
      title="Register"
      desc="Register your account"
      authState={authState}
      form={<Form />}
      formId="register"
      pending={pending}
    />
  );
}
