"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate, format24HourTime } from "@/lib/utils"
import { EyeIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dayCareSettingDocsDelete } from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Link from "next/link";
import { childImmunazationDelete } from "@/services/childrenActionServices";
export type DocumentProperties = {
  id: string;
  documentName: string;
  documentType: string;
  description: string;
  reloadTale?: any
  utility?: any
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "type",
    header: "Vaccination Type",
  },
  {
    accessorKey: "vaccination_date",
    header: "Vaccination Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const doc = row.original;
      const handleDelete = async (id: any) => {
        console.log(id)
        let res;
        try {
          res = await childImmunazationDelete(id)
          if (res?.success) {
            toast.success(res?.message)
            doc.reloadTable()
          } else (
            toast.error('Something Went wrong')
          )
        } catch (error: any) {
          toast.error(error?.response?.data?.message)
        }
      }
      const hadnleEdit = async (data: any) => {
        row.original?.setView(true)
        row.original?.setUrl(data)
      }
      console.log(row?.original?.document)
      return (
        <>
          <div className="flex items-center justify-center">
            <Link href={row?.original?.document ? row?.original?.document : ''}  >
              <EyeIcon className="text-grey-g1 cursor-pointer " />
            </Link>
            {/* <EyeIcon className="text-grey-g1 cursor-pointer " onClick={() => hadnleEdit(row?.original?.document ? row?.original?.document : '')} /> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                  {/* <Image src={"/svgs/note.svg"} alt="actions" height={20} width={20} /> */}
                </Button>
              </DropdownMenuTrigger>

              <Trash2 className="text-grey-g1 cursor-pointer mx-2" onClick={() => handleDelete(row?.original?.docid)} />
            </DropdownMenu>
          </div>
          <ToastContainer />

        </>
      );
    },
  },
];
