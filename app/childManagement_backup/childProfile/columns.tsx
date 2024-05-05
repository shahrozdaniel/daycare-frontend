"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate, format24HourTime } from "@/lib/utils";
import { Download, EyeIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dayCareSettingDocsDelete } from "@/services/dayCareSetting";
import { ToastContainer, ToastContentProps, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import { childImmunazationDelete } from "@/services/childrenActionServices";
import { formatDateWithUTC } from "@/utils/utilityFunctions";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
export type DocumentProperties = {
  id: string;
  documentName: string;
  documentType: string;
  description: string;
  reloadTale?: any;
  utility?: any;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "type",
    header: "Vaccination Type",
  },
  {
    accessorKey: "vaccination_date",
    header: "Vaccination Date",
    cell: ({ row }) => {
      return (
        <>
          {row.getValue("vaccination_date")
            ? formatDateWithUTC(row.getValue("vaccination_date"))
            : ""}
        </>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const doc = row.original;
      const handleDelete = async (id: any) => {
        let res: {
          success: any;
          message:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | ((props: ToastContentProps<unknown>) => ReactNode)
            | null
            | undefined;
        };
        try {
          res = await childImmunazationDelete(id);
          if (res?.success) {
            setTimeout(() => {
              toast.success(res?.message);
            }, 1000);
            doc.reloadTable();
          } else toast.error("Something Went wrong");
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        }
      };
      const hadnleEdit = async (data: any) => {
        row.original?.setView(true);
        row.original?.setUrl(data);
      };
      return (
        <>
          <div className="flex items-center justify-center">
            <Link href={row?.original?.document ? row?.original?.document : ""}>
              <Download className="text-grey-g1 cursor-pointer " />
            </Link>
            {/* <EyeIcon className="text-grey-g1 cursor-pointer " onClick={() => hadnleEdit(row?.original?.document ? row?.original?.document : '')} /> */}

            <DropdownMenu>
              {/* <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                  <Image src={"/svgs/note.svg"} alt="actions" height={20} width={20} />
                </Button>
              </DropdownMenuTrigger> */}

              <Trash2
                className="text-grey-g1 cursor-pointer mx-2"
                onClick={() => handleDelete(row?.original?.docid)}
              />
            </DropdownMenu>
          </div>
          <ToastContainer />
        </>
      );
    },
  },
];
