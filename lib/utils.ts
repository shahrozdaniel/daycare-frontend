import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date?.toLocaleDateString("en-US", options)?.replace(/\//g, "-");
}

export function format24HourTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
    hour12: false,
  };

  const formattedTime = date?.toLocaleTimeString("en-US", options);
  return formattedTime;
}
