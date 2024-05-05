"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate, format24HourTime } from "@/lib/utils";
import { EyeIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dayCareSettingDocsDelete } from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/common/Modal/Modal";
// import AddDocument from "./AddDocument";
import { useState } from "react";
import Link from "next/link";
import { deleteCertifDocumentEducator } from "@/services/User-management-API";
export type DocumentProperties = {
  id: string;
  documentName: string;
  documentType: string;
  description: string;
  reloadTale?: any;
  utility?: any;
};

export const certificationcolumn: ColumnDef<any>[] = [
  {
    accessorKey: "documentName",
    header: "Document Name",
  },
  {
    accessorKey: "documentType",
    header: "Type",
  },
  {
    accessorKey: "documentDate",
    header: "Date",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const doc = row.original;
      const handleDelete = async () => {
        let res;
        let staffid = doc?.staffId;
        try {
          res = await deleteCertifDocumentEducator(doc?.id, staffid);
          if (res?.success) {
            toast.success(res?.message);
            doc.reloadTale();
          } else toast.error("Something Went wrong");
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        }
      };
      const hadnleEdit = async (data: any) => {
        doc?.openEditModal(true);
        doc?.setEditableData(data);
      };
      return (
        <>
          <div className="flex items-center">
            <Link href={doc?.file} target={""}>
              <EyeIcon className="text-grey-g1 cursor-pointer" />
            </Link>

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
                  {/* <span className="sr-only">Open menu</span> */}
                  {/* <MoreHorizontal className="h-6 w-4 ml-2 rotate-90" /> */}
                </Button>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent align="center">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                  onClick={() => navigator.clipboard.writeText(doc.id)}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">View customer</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">View payment details</DropdownMenuItem>
              </DropdownMenuContent> */}
            </DropdownMenu>
            <Trash2
              className="text-grey-g1 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
          <ToastContainer />
          {/* {doc?.open && <Modal modalOpen={open}
            cancelText={"Cancel"}
            AddText={"Add"}
            modalName={"AddDocument"}>
            <AddDocument editData={editData} closeModal={closeModal} submitFormDocs={submitFormDocs} />
          </Modal>} */}
        </>
      );
    },
  },
];
