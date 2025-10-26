"use client";
import { logoutAction } from "@/app/_actions/action";
import { useActionState } from "react";

export function LogoutButton() {
  const [_, formAction, __] = useActionState(logoutAction, null);
  return (
    <form action={formAction}>
      <button type="submit">Log out</button>
    </form>
  );
}
