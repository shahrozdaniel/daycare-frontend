"use client";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface CustomProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorColor: string;
  borderColor?: string;
}

const CircularProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps
>(({ className, value, indicatorColor, borderColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-40 w-40 overflow-hidden rounded-full border-4 border-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`absolute inset-0 border-[7px] border-transparent border-secondary border-t-[transparent] rounded-full transition-all`}
      style={{
        backgroundColor: indicatorColor, // Set the color using borderBottomColor
        borderBottomColor: borderColor,
        // border:"5px solid red ",
        transform: `rotate(${(value || 0) * 3.6}deg)`,
        transformOrigin: "center center",
      }}
    />
  </ProgressPrimitive.Root>
));

CircularProgress.displayName = ProgressPrimitive.Root.displayName;

export { CircularProgress };
