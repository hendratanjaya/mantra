"use client";
import { User } from "@/generated/prisma";
import { createContext, ReactNode, useState } from "react";

export type SafeUser = Omit<User, "password">;

export type UserContextType = {
  user: SafeUser | null;
  setUser: React.Dispatch<React.SetStateAction<SafeUser | null>>;
};

export const UserProviderContext = createContext<UserContextType | null>(null);

export default function UserProvider({
  children,
  user: initialUser,
}: {
  children: ReactNode;
  user: SafeUser;
}) {
  const [user, setUser] = useState<SafeUser | null>(initialUser);

  return (
    <UserProviderContext.Provider value={{ user, setUser }}>
      {children}
    </UserProviderContext.Provider>
  );
}
