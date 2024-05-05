"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type User = {
  id: string;
  childName: string;
  subsidyProgram: string;
  startDate: string;
  amount: string;
  action: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "childName",
    header: "Child Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div>
            {" "}
            <Image src={"/images/pic.svg"} alt="user" width={35} height={35} />
          </div>
          <div className="">Toodler</div>
        </div>
      );
    },
  },
  {
    accessorKey: "subsidyProgram",
    header: "Subsidy Program",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex  align-items-center gap-2">
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
              src={"/svgs/eye-icon-gray.svg"}
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
