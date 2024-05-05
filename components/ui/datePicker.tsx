"use client";

import React from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useController, FieldPath, FieldValues } from "react-hook-form";
import { format } from "date-fns";

interface DatePickerProps {
  name: FieldPath<FieldValues>;
  control?: any;
  label: string;
}

export function DatePickerComponent({ name, control, label }: DatePickerProps) {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
  });

  return (
    <div className="flex flex-col mb-4 bg-input_bg rounded-[20px] w-full">
      {/* <label className="block text-sm font-medium text-gray-700">{label}</label> */}
      <Popover>
        <PopoverTrigger asChild className="bg-input_bg">
          <div className="w-full text-left font-normal rounded-[20px]">
            <Button
              variant={"outline"}
              className={cn(
                "w-full",
                !value && "text-muted-foreground bg-input_bg rounded-[20px]"
              )}
              type="button"
            >
              {value ? format(value, "PPP") : <span>{label}</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
