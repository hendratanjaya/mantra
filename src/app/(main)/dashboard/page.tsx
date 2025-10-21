"use client";
import { logoutAction } from "@/app/_actions/action";
import { useActionState } from "react";

export default function Page() {
  const [_, formAction, __] = useActionState(logoutAction, null);
  return (
    <div className="flex w-full justify-between bg-primary">
      <div>ini di main</div>
      <form action={formAction}>
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
