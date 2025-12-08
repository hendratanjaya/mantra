import { Controller, UseFormReturn } from "react-hook-form";
import { SummaryFormData } from "../../_schemas/summary";
import { ChangeEvent, useState } from "react";
import { SummaryFieldControllerType } from "../type";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function SummarFormController({
  name,
  label,
  placeholder,
  description,
  maxChar,
  form,
}: SummaryFieldControllerType & { form: UseFormReturn<SummaryFormData> }) {
  const [charCounter, setCharCounter] = useState(0);
  const handleCharCount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const charCount = value.length;
    setCharCounter(charCount);
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className={cn(`col-span-2 gap-y-2`)}>
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
          {name === "content_file" ? (
            <Input
              type="file"
              content="pdf,txt"
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
