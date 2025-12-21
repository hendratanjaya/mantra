import { AuthFormType } from "../types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthStateManager from "./auth-state-manager";
import Link from "next/link";
import OauthButton from "./oauth-button";
import { LoaderCircle } from "lucide-react";

export default function AuthForm({
  title,
  desc,
  authState,
  form,
  formId,
  pending,
}: AuthFormType) {
  return (
    <div className="w-[450px]">
      <Card className="w-full sm:max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter className="block space-y-2">
          <AuthStateManager {...authState} />
          <OauthButton pending={pending} />
          <Button
            className="w-full"
            type="submit"
            form={formId}
            disabled={pending}
          >
            {title}
            {pending && <LoaderCircle className="animate-spin" />}
          </Button>
          <small>
            {formId === "login" ? (
              <span>
                Don&apos;t have accont?{" "}
                <Link className="auth-link" href={"/register"}>
                  Register
                </Link>{" "}
                now
              </span>
            ) : (
              <span>
                Have an account?{" "}
                <Link className="auth-link" href={"/login"}>
                  Login
                </Link>
              </span>
            )}
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}
