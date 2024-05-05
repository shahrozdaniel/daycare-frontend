"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateWithUTC } from "@/utils/utilityFunctions";

export type Notifications = {
  id: string;
  name: string;
  description: string;
  sentto: string;
  date: string;
  time: string;
};

export const columns: ColumnDef<Notifications>[] = [
  {
    accessorKey: "name",
    // header: "Notification Name",
    header: () => {
      return <div className="text-left pl-6">Notification Name</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left pl-8">
          {row.original.name}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "sentto",
    header: "Sent to",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <>
          {row.getValue("date") ? formatDateWithUTC(row.getValue("date")) : ""}
        </>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;
      // console.log(user);

      return (
        <>
          <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
            <Image
              src={"/svgs/eye-icon.svg"}
              alt="actions"
              height={20}
              width={20}
            />
          </Button>
        </>
      );
    },
  },
];
