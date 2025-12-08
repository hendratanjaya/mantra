import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class UserException extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);

    this.name = "UserException";
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
