"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type User = {
  id: string;
  childName: string;
  balance: string;
  credit: string;
  classroom: string;
  tutionPlan: string;
  action: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "childName",
    header: "Child Name",
    cell: ({ row }) => {
      return (
        <div className="flex  items-center gap-2">
          <Image src={"/images/pic.svg"} alt="user" width={35} height={35} />
          <p className="">Toodler</p>
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "credit",
    header: "Credit",
  },

  {
    accessorKey: "classroom",
    header: "Classroom",
  },
  {
    accessorKey: "tutionPlan",
    header: "Tution Plan",
  },

  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex align-items-center gap-2">
          <div>
            <Image
              src={"/svgs/gray-edit.svg"}
              alt="user"
              width={24}
              height={24}
            />
          </div>
          <div>
            <Image
              src={"/svgs/three-dots.svg"}
              alt="user"
              width={24}
              height={24}
            />
          </div>
        </div>
      );
    },
  },
];
