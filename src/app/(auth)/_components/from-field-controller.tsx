"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input, InputPassword } from "@/components/ui/input";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FieldControllerType } from "../types";

export function FieldController<T extends FieldValues>({
  name,
  label,
  placeholder,
  isEmail,
  isPassword,
  form,
}: FieldControllerType & { form: UseFormReturn<T> }) {
  return (
    <Controller
      name={name as Path<T>}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className="gap-y-2">
          <FieldLabel htmlFor={`register_${name}`}>{label}</FieldLabel>
          {isPassword ? (
            <InputPassword
              {...field}
              id={`register_${name}`}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
            />
          ) : (
            <Input
              {...field}
              id={`register_${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete="off"
              type={isEmail ? "email" : undefined}
            />
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
