import React, { ReactNode } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: any;
  className?: string;
  children: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "import"
    | null
    | undefined;
  form?: "white" | "blue";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  form,
  onClick,
  variant = "outline",
  className,
  children,
}) => {
  return (
    <ShadcnButton
      variant={variant}
      type={type}
      onClick={onClick}
      className={`bg-accent ${
        form === "white"
          ? "text-button-color border-button-color hover:bg-button-color hover:text-white px-1"
          : "text-white bg-button-color border-button-color hover:text-button-color"
      }  py-2 px-4 rounded-[6px] focus:ring-accent focus:ring-offset-2 focus:ring-2 focus:outline-none ${className}`}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
