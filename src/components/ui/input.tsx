import * as React from "react";

import { cn } from "@/lib/utils";
import { TbEyeClosed } from "react-icons/tb";
import { RiEyeFill } from "react-icons/ri";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

function InputPassword({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  const [isOpenEye, setIsOpenEye] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={isOpenEye ? "text" : "password"}
        className={className}
        {...props}
      />
      <button
        type="button"
        className="absolute top-[50%] -translate-y-[50%] right-[1.5px] p-1.5 bg-background text-muted-foreground rounded-full"
        onClick={() => setIsOpenEye((prev) => !prev)}
      >
        {isOpenEye ? (
          <TbEyeClosed fontSize={20} />
        ) : (
          <RiEyeFill fontSize={20} />
        )}
      </button>
    </div>
  );
}

export { Input, InputPassword };
