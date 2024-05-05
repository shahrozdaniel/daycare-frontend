"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

export type User = {
  id: string;
  childName: string;
  amount: string;
  payer: string;
  classroom: string;
  invoiceDate: string;
  dueDate: string;
  status: string;
  action: string;
  openEditModal: any;
  openPaymentModal: any;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "childName",
    header: "Child Name",
    cell: ({ row }) => {
      let childObject: any = row.getValue("childName");
      return (
        <div className="flex items-center gap-2">
          <Image
            src={childObject.photo ? childObject.photo : "/svgs/no-image.svg"}
            alt="user"
            className="w-[35px] h-[35px] rounded-full"
            width={35}
            height={35}
          />
          <p>
            {childObject.firstName} {childObject.lastName}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "payer",
    header: "Payer",
    cell: ({ row }) => {
      let payerdata: any = row.getValue("payer");
      return (
        <div className="flex items-center gap-2">
          {payerdata
            ? payerdata.map((item: any, index: number) => (
                <p key={index}>{item}</p>
              ))
            : null}
        </div>
      );
    },
  },

  {
    accessorKey: "classroom",
    header: "Classroom",
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let status: number = row.getValue("status");
      const getPaymentStatus = (status: number) => {
        switch (status) {
          case 0:
            return "Due";
          case 1:
            return "Paid";
          case 2:
            return "Cancelled";
          default:
            return "";
        }
      };
      return (
        <div className="flex  items-center gap-2">
          <Image
            src={status === 1 ? "/svgs/active-icon.svg" : "/svgs/due-icon.svg"}
            alt="user"
            width={16}
            height={16}
          />
          <p>{getPaymentStatus(status)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex align-items-center gap-2">
          {/* <button onClick={() => row.original.openEditModal(row.original)}>
            <Image
              src={"/svgs/gray-edit.svg"}
              alt="user"
              width={24}
              height={24}
            />
          </button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                {/* <span className="sr-only">Open menu</span> */}
                <MoreHorizontal className="h-6 w-4 ml-2 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              {row.getValue("status") === 1 ? null : (
                <DropdownMenuItem
                  className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                  onClick={() => row.original.openPaymentModal(row.original)}
                >
                  Add Payment
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
