"use client";
import { Progress } from "@/components/common/Progress";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type User = {
  id: string;
  classroom: string;
  attendance: string;
  present: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "classroom",
    header: "Classroom",
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      return (
        <div>
          <Progress indicatorColor="bg-[#FFB200]" value={33} />
        </div>
      );
    },
  },

  {
    accessorKey: "present",
    header: "Present",
    cell: ({ row }) => {
      return (
        <div>
          <div className="w-[40px] border border-solid border-blue-300 px-2 py-[4px] rounded-[8px] bg-[#f0f9ff]">
            45
          </div>
        </div>
      );
    },
  },
];
