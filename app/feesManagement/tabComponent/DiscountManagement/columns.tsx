"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type User = {
  id: string;
  discountName: string;
  discountType: string;
  amount: string;
  description: string;
  action: string;
  openEditModal: any;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "discountName",
    header: "Discount Name",
  },
  {
    accessorKey: "discountType",
    header: "Discount Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },

  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      console.log("row", row);
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
        </div>
      );
    },
  },
];
