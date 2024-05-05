"use client";

import { ColumnDef } from "@tanstack/react-table";
import {formatDate, format24HourTime} from "@/lib/utils"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";

export type Main = {
  ticketId: string;
  createdBy: string;
  category: string;
  problem: string;
  dateCreated: Date;
  updatedOn: Date;
  assignedTo: string;
  status: string;
  mark: string;
};

export const mainColumns: ColumnDef<Main>[] = [
  {
    accessorKey: "ticketId",
    header: "Ticket ID",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "problem",
    header: "Problem",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: ({ row }) => {
      const formattedTime: string = formatDate(row.getValue("dateCreated"));
      return <div>{formattedTime}</div>;
    },
  },
  {
    accessorKey: "updatedOn",
    header: "Updated On",
    cell: ({ row }) => {
      const formattedTime: string = formatDate(row.getValue("updatedOn"));
      return <div>{formattedTime}</div>;
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className="flex gap-2">
        <Image src={"/svgs/redring.svg"} alt="unassigned" height={17} width={17}/>{row.getValue('status')}
        </div>;
    },
  },
  {
    accessorKey: "mark",
    header: "     ",
    cell: ({ row }) => {
      return <Button className="bg-button-color">{row.getValue('mark')}</Button>;
    },
  },
];
