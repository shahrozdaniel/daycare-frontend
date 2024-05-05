"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate, format24HourTime } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type User = {
  id: string;
  name: string;
  classroom: string;
  role: string;
  date: Date;
  checkIn: Date;
  checkOut: Date;
  duration: Date;
};

function calculateDuration(startDate: Date, endDate: Date): string {
  const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Format the duration as HH:mm
  const formattedDuration = `${padZero(hours)}:${padZero(minutes)}`;

  return formattedDuration;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    // header: "Educator Name",
    header: () => {
      return (
        <div className="flex justify-start">
          <div className="self-start">Educator Name</div>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Image src={"/images/pic.svg"} alt="user" width={35} height={35} />
          <div className="text-[0.65rem]">
            Casey Jimenez
            <div className="flex justify-between">
              <div className="bg-red-r2 w-fit h-fit text-red-r1 px-[1px] text-[8px]">
                ECR certified
              </div>
              <div className="bg-red-r2 w-fit h-fit text-red-r1 px-[1px] text-[8px]">
                CPR
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "classroom",
    header: "Classroom",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const formattedDate: string = formatDate(row.getValue("date"));
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "checkIn",
    header: "Check-in",
    cell: ({ row }) => {
      const formattedTime: string = format24HourTime(row.getValue("checkIn"));
      return <div>{formattedTime}</div>;
    },
  },
  {
    accessorKey: "checkOut",
    header: "Check-out",
    cell: ({ row }) => {
      const formattedTime: string = format24HourTime(row.getValue("checkOut"));
      return <div>{formattedTime}</div>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration: string = calculateDuration(
        row.getValue("checkIn"),
        row.getValue("checkOut")
      );
      return <div>{duration}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      // console.log(user);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
              <Image
                src={"/svgs/note.svg"}
                alt="actions"
                height={20}
                width={20}
              />
              {/* <span className="sr-only">Open menu</span> */}
              <MoreHorizontal className="h-6 w-4 ml-2 rotate-90" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem
              className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
              View customer
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
              View payment details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
