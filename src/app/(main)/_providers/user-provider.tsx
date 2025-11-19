"use client";
import { User } from "@/generated/prisma";
import { createContext, ReactNode } from "react";

export const UserProviderContext = createContext<Omit<User, "password"> | null>(
  null
);

export default function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: Omit<User, "password">;
}) {
  return (
    <UserProviderContext.Provider value={{ ...user }}>
      {children}
    </UserProviderContext.Provider>
  );
}
