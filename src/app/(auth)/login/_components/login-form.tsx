"use client";

import { useState, useTransition } from "react";
import { AuthState, LoginFormData } from "../../types";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../_schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "../action";
import { FieldGroup } from "@/components/ui/field";
import { loginFormFields, oauthState } from "../../_constants";
import { FieldController } from "../../_components/from-field-controller";
import AuthForm from "../../_components/auth-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // const oauthSuccess = searchParams.get(oauthState.success) === "true";
  // const oauthError = searchParams.get(oauthState.error) === "true";

  const [pending, startTransition] = useTransition();

  const [authState, setAuthState] = useState<AuthState>({
    error: false,
    message: "",
  });
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    startTransition(async () => {
      const state = await loginAction(data);
      if (!state.success) {
        if (!state.type) setAuthState({ error: true, message: state.message });
        else form.setError(state.type, { message: state.message });
      } else {
        toast.success(state.message);
        setAuthState({ error: false, message: "" });
        router.push("/register");
      }
    });
  };

  const Form = () => {
    return (
      <form id="login" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-y-4">
          {loginFormFields.map((fField) => {
            return (
              <FieldController key={fField.name} {...fField} form={form} />
            );
          })}
        </FieldGroup>
      </form>
    );
  };

  // if (oauthError) toast.error("ERRORRRR");
  // if (oauthSuccess) toast.success("SUCCESSSSS");

  return (
    <AuthForm
      title="Login"
      desc="Welcome to Mantra"
      authState={authState}
      form={<Form />}
      formId="login"
      pending={pending}
    />
  );
}
