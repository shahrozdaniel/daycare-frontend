import * as React from "react";

import { cn } from "@/lib/utils";
import { UseFormRegister } from "react-hook-form";
import { RegisterUserBody } from "@/app/register/components/api/RegisterApi";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<RegisterUserBody>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, register, ...props }, ref) => {
    return (
      <input
        type={type}
        // {...register(name as string)}
        name={name}
        className={cn(
          "flex h-10 w-full rounded-md border placeholder:text-grey-placeholder border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
