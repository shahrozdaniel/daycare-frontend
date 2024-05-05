"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type User = {
  id: string;
  subsidyName: string;
  subsidyProvider: string;
  amount: string;
  description: string;
  action: string;
  openEditModal: any;
  openViewModal: any;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "subsidyName",
    header: "Subsidy Name",
  },
  {
    accessorKey: "subsidyProvider",
    header: "Subsidy Provider",
  },

  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex align-items-center gap-2">
          <button
            type="button"
            onClick={() => row.original.openEditModal(row.original)}
          >
            <Image
              src={"/svgs/gray-edit.svg"}
              alt="user"
              width={24}
              height={24}
            />
          </button>
          <button
            type="button"
            onClick={() => row.original.openViewModal(row.original)}
          >
            <Image
              src={"/svgs/eye-icon-gray.svg"}
              alt="user"
              width={24}
              height={24}
            />
          </button>
        </div>
      );
    },
  },
];
