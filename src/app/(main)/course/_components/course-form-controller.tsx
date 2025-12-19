import { Controller, UseFormReturn } from "react-hook-form";
import { CourseFieldControllerType, CourseSelectField } from "../type";
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
import { fielWithOptions } from "../_constants";

export function CourseFormController({
  name,
  label,
  placeholder,
  description,
  maxChar,
  isTextArea,
  isSelect,
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
          ) : isSelect ? (
            <SelectForm
              onValueChange={field.onChange}
              options={fielWithOptions[name as CourseSelectField]}
              placeholder={placeholder}
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
