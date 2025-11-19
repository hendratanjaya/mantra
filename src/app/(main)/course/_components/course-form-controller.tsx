import { Controller, UseFormReturn } from "react-hook-form";
import { CourseFieldControllerType } from "../type";
import { CourseFormData } from "../../_schemas/course";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { SelectForm } from "./select-form";
import { cn } from "@/lib/utils";

export function CourseFormController({
  name,
  label,
  placeholder,
  description,
  maxChar,
  isTextArea,
  form,
}: CourseFieldControllerType & { form: UseFormReturn<CourseFormData> }) {
  const [charCounter, setCharCounter] = useState(0);
  const handleCharCount = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>
  ) => {
    const { value } = e.target;
    const charCount = value.length;
    setCharCounter(charCount);
  };
  const contentType = form.watch("content_type");

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          className={cn(
            `col-span-2 gap-y-2`,
            name !== "content_type" &&
              name.startsWith("content_") &&
              contentType !== name &&
              "hidden"
          )}
        >
          <FieldLabel>
            {label}
            <span className=" flex flex-1 justify-end pr-3">
              {!!maxChar && (
                <small>
                  {charCounter}/{maxChar}
                </small>
              )}
            </span>
          </FieldLabel>
          {isTextArea ? (
            <Textarea
              {...field}
              id={`course_${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                if (maxChar) handleCharCount(e);
              }}
              maxLength={maxChar}
              autoComplete="off"
              className="h-[100px]"
            />
          ) : ["difficulty_preference", "content_type"].includes(name) ? (
            <SelectForm onValueChange={field.onChange} name={name} />
          ) : name === "content_file" ? (
            <Input
              type="file"
              content=".pdf,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file ?? null);
              }}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          ) : (
            <Input
              {...field}
              id={`course_${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                if (maxChar) handleCharCount(e);
              }}
              maxLength={maxChar}
              autoComplete="off"
            />
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          {!!description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    />
  );
}
