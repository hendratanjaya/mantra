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
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { SummaryFormData, summarySchema } from "../../_schemas/summary";
import { zodResolver } from "@hookform/resolvers/zod";
import { summaryFormFields } from "../_constants";
import { SummarFormController } from "./summary-form-controller";
import { genearateNewSummary } from "../action";
import { AssistantPersonaContext } from "../../_providers/assistant-provider";
import { AssistantContext } from "@/lib/openai/type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserProviderContext } from "../../_providers/user-provider";
import { LoaderCircle } from "lucide-react";

export function AddNewSummaryForm({
  isExceedLimit,
}: {
  isExceedLimit: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState(false);
  const assistantContext = useContext(AssistantPersonaContext)!;
  const { user } = useContext(UserProviderContext)!;
  const router = useRouter();

  const form = useForm<SummaryFormData>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      title: "",
      topic: "",
      content_file: undefined,
    },
  });

  const onSubmit = (data: SummaryFormData) => {
    console.log("masukk");
    if (!user) {
      toast.error("Oops, who are you?");
      return;
    }
    startTransition(async () => {
      toast.info("This might take a while");
      const state = await genearateNewSummary(
        data,
        assistantContext?.persona as AssistantContext,
        user.id
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

      const courseId = state.field;
      router.push(`summarize/${courseId}`);
    });
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset();
        else if (open && isExceedLimit) {
          setOpenDialog(false);
          toast.info("You've reached the 3-summaries limit.");
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
            <DialogTitle>Add New Course Summary</DialogTitle>
            <DialogDescription>
              Add relevant context of material you want to learn. Click save
              when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldSet>
            <FieldGroup className="grid grid-cols-2 gap-5">
              {summaryFormFields.map((field) => {
                return (
                  <SummarFormController
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
