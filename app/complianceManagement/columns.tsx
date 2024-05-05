"use client";

import { ColumnDef } from "@tanstack/react-table";
import {formatDate, format24HourTime} from "@/lib/utils"
import { Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";

export type Compliance = {    
  name: string;
  dateUpdated: Date;
  download: string;
  view: string;
  status: string;
};

export const columns: ColumnDef<Compliance>[] = [
  {
    accessorKey: "name",
    header: "Compliance Name",
  },
  {
    accessorKey: "dateUpdated",
    header: "Date Updated",
    cell: ({ row }) => {
        const formattedDate: string = formatDate(row.getValue("dateUpdated"));
        return <div>{formattedDate}</div>;
      },
  },
  {
    accessorKey: "download",
    header: "Download",
    cell: ({ row }) => {
        return <Download/>;
    },
  },
  {
    accessorKey: "view",
    header: "View",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        return <Button className="bg-button-color">{row.getValue('status')}</Button>;
    },
  },
];
