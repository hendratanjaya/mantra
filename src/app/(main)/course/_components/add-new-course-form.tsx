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
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export function AddNewCourseForm({
  isExceedLimit,
}: {
  isExceedLimit: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState(false);
  const assistantContext = useContext(AssistantPersonaContext)!;
  const userContext = useContext(UserProviderContext)!;

  const router = useRouter();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      content_option: "",
      programming_language: "",
      difficulty_preference: "beginner",
      learning_goal: "",
      prior_knowledge: "",
    },
  });

  const onSubmit = (data: CourseFormData) => {
    startTransition(async () => {
      toast.info("This might take a while");
      const state = await generateNewCourse(
        data,
        assistantContext.persona as AssistantContext,
        userContext!.user!.id
      );
      if (state.error) {
        const message = state.message ?? "Oopss, something went wrong";
        toast.error(message);
        setOpenDialog(false);
        form.reset();
        return;
      }
      toast.info("Redirecting...");
      const courseId = state.field;
      router.push(`course/${courseId}`);
    });
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset();
        else if (open && isExceedLimit) {
          setOpenDialog(false);
          toast.info("You've reached the 3-course limit.");
          return;
        }
        setOpenDialog(open);
      }}
      open={openDialog || pending}
    >
      <DialogTrigger asChild>
        <Button>Create New Course</Button>
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
                    disabled={pending}
                  />
                );
              })}
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <DialogClose asChild>
              {!pending && (
                <Button disabled={pending} variant="outline">
                  Cancel
                </Button>
              )}
            </DialogClose>
            <Button disabled={pending} type="submit">
              {pending ? "Generating..." : "Save changes"}
              {pending && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
