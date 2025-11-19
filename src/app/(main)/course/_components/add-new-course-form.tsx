"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CourseFormData, courseSchema } from "../../_schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { courseFormFields } from "../_constants";
import { CourseFormController } from "./course-form-controller";
import { generateNewCourse } from "../action";
import { toast } from "sonner";
import { AssistantPersonaContext } from "../../_providers/assistant-provider";
import { AssistantContext } from "@/lib/openai/type";
import { UserProviderContext } from "../../_providers/user-provider";
import { useRouter, useSearchParams } from "next/navigation";

export function AddNewCourseForm() {
  const [pending, startTransition] = useTransition();
  const [redirecting, setRedirecting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const assistantContext = useContext(
    AssistantPersonaContext
  ) as AssistantContext;
  const userContext = useContext(UserProviderContext);

  const router = useRouter();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      topic: "",
      content_type: "content_text",
      difficulty_preference: "beginner",
      content_text: "",
      content_url: "",
      learning_goal: "",
      prior_knowledge: "",
    },
  });

  const onSubmit = (data: CourseFormData) => {
    console.log("masukk");

    startTransition(async () => {
      const state = await generateNewCourse(
        data,
        assistantContext,
        "cmhe1ovpr0000sbmopoqu9i3t" // hard coded user id
        //userContext!.id
      );
      if (state.error) {
        const message = state.message ?? "Oopss, something went wrong";
        toast.error(message);
        setOpenDialog(false);
        form.reset();
        return;
      }
      // New problem occured... Llama only support 10 max request....
      // To Do render generated course into the dedicated page

      const courseId = state.field; // hard coded course id
      console.log(courseId);
      router.push(`course/${courseId}`);
    });
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset();
        setOpenDialog(open);
      }}
      open={openDialog || pending}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[50vw] max-h-[70vh] overflow-y-auto custom-scrollbar">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Add relevant context of material you want to learn. Click save
              when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldSet>
            <FieldGroup className="grid grid-cols-2 gap-5">
              {courseFormFields.map((field) => {
                return (
                  <CourseFormController
                    key={field.name}
                    {...field}
                    form={form}
                  />
                );
              })}
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={pending} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
