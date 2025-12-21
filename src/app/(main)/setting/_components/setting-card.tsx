import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangeEvent, useContext, useState } from "react";
import { UserProviderContext } from "../../_providers/user-provider";
import { AssistantPersonaContext } from "../../_providers/assistant-provider";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { userEditFormData, userEditSchema } from "../../_schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  assistantPersonaData,
  assistantPersonaSchema,
} from "../../_schemas/assistantPersona";
import { Textarea } from "@/components/ui/textarea";
import { updatePersonaData, updateUserData } from "../action";
import { toast } from "sonner";
import { AssistantContext } from "@/lib/openai/type";
import { SelectForm } from "./select-form";
import { styleList, toneList } from "../_constants";
import { LoaderCircle } from "lucide-react";

export function SettingCard() {
  return (
    <div className="flex w-full max-w-sm md:max-w-xl h-full py-5 flex-col gap-6">
      <Tabs defaultValue="account" className="flex-1">
        <TabsList className="w-full gap-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="persona">Assistant</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="h-full">
          <UserEditForm />
        </TabsContent>
        <TabsContent value="persona" className="h-full">
          <PersonaEditForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UserEditForm() {
  const { user, setUser } = useContext(UserProviderContext)!;
  const [updating, setUpdating] = useState(false);
  const form = useForm<userEditFormData>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
    },
  });

  const onSubmit = async (data: userEditFormData) => {
    if (!user) {
      toast.error("User not found");
      return;
    }
    setUpdating(true);
    const updateRes = await updateUserData(data, user!.id);
    if (updateRes.error) {
      toast.error(updateRes.message);
    } else {
      setUser({
        ...user,
        ...updateRes.updatedUser,
      });
    }
    toast.info(updateRes.message);
    setUpdating(false);
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Make changes to your account here.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FieldSet>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Input your name"
                      disabled={updating}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Username</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Input your username"
                      disabled={updating}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter>
          <Button disabled={updating}>
            {updating ? "Updating..." : "Save changes"}
            {updating && <LoaderCircle className="animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

function PersonaEditForm() {
  const { user } = useContext(UserProviderContext)!;
  const { persona, setPersona } = useContext(AssistantPersonaContext)!;
  const [updating, setUpdating] = useState(false);
  const [selectedTone, setSelectedTone] = useState(persona?.tone || "");
  const [selectedStyle, setSelectedStyle] = useState(persona?.style || "");
  const [charCounter, setCharCounter] = useState(
    persona?.description.length || 0
  );

  const handleCharCount = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>
  ) => {
    const { value } = e.target;
    const charCount = value.length;
    setCharCounter(charCount);
  };

  const form = useForm<assistantPersonaData>({
    resolver: zodResolver(assistantPersonaSchema),
    defaultValues: {
      name: persona?.name || "",
      description: persona?.description || "",
      style: persona?.style || "",
      tone: persona?.tone || "",
    },
  });

  const onSubmit = async (data: assistantPersonaData) => {
    if (!user || !persona) {
      toast.error("User or assistant not found");
      return;
    }
    setUpdating(true);
    const updateRes = await updatePersonaData(data, user!.id);
    if (updateRes.error) {
      toast.error(updateRes.message);
    } else {
      setPersona({
        ...persona,
        ...(updateRes.updatedAssistant as Partial<AssistantContext>),
      });
    }
    toast.info(updateRes.message);
    setUpdating(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Assistant Persona</CardTitle>
          <CardDescription>Make changes to your account here.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FieldSet>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Input your name"
                      disabled={updating}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="style"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Style</FieldLabel>
                    <SelectForm
                      options={styleList}
                      disabled={updating}
                      placeholder="Select your preferred style"
                      value={selectedStyle}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedStyle(value);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    {selectedStyle && (
                      <FieldDescription>
                        {styleList.find(
                          (style) => style.value === selectedStyle
                        )?.description || ""}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="tone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Tone</FieldLabel>
                    <SelectForm
                      disabled={updating}
                      options={toneList}
                      placeholder="Select your preferred tone"
                      value={selectedTone}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedTone(value);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    {selectedTone && (
                      <FieldDescription>
                        {toneList.find((tone) => tone.value === selectedTone)
                          ?.description || "Im here"}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>
                      Additional Description{" "}
                      <span className=" flex flex-1 justify-end pr-3">
                        <small>
                          {charCounter}/{300}
                        </small>
                      </span>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      disabled={updating}
                      maxLength={300}
                      autoComplete="off"
                      className="h-[100px]"
                      placeholder="Addiitional description for you assistant"
                      onChange={(e) => {
                        field.onChange(e);
                        handleCharCount(e);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter>
          <Button disabled={updating}>
            {updating ? "Updating..." : "Save changes"}
            {updating && <LoaderCircle className="animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
