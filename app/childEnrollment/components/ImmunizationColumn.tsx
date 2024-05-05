"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Download, EyeIcon, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dayCareSettingDocsDelete } from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiInstance } from "@/utils/ApiInstance";
// import { deleteImmunization } from "../childEnrolmentAPI";
import Link from "next/link";
import { log } from "util";
import { childImmunazationDelete } from "@/services/childrenActionServices";

export const ImmunizationColumn: ColumnDef<any>[] = [
  {
    accessorKey: "type",
    header: "vaccination Type",
  },
  {
    accessorKey: "vaccination_date",
    header: "vaccination Date",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const doc = row.original;
      
      const handleDelete = async () => {
        let res;
        try {
          res = await childImmunazationDelete(doc?.id);
          if (res?.success) {
            toast.success(res?.message);
            doc?.reloadTale();
          } else toast.error("Something Went wrong");
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        }
      };
      const hadnleEdit = async (data: any) => {
        doc?.setopen(true);
        doc?.setEditableData(data);
      };
      return (
        <>
          <div className="flex items-center justify-center">
          {doc?.document&& <Link href={doc?.document} target={''}>
              <Download className="text-grey-g1 cursor-pointer" />
            </Link>}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                  <Image
                    src={"/svgs/note.svg"}
                    alt="actions"
                    height={20}
                    width={20}
                    onClick={() => hadnleEdit(doc)}
                  />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
            <Trash2
              className="text-grey-g1 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
          <ToastContainer />
        </>
      );
    },
  },
];