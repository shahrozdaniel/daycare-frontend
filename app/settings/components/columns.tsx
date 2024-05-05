"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate, format24HourTime } from "@/lib/utils";
import { Download, EyeIcon, Trash2 } from "lucide-react";
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
import AddDocument from "./AddDocument";
import { useState } from "react";
import Link from "next/link";
export type DocumentProperties = {
  id: string;
  documentName: string;
  documentType: string;
  description: string;
  reloadTale?: any;
  utility?: any;
};

export const columns: ({...args}:any)=>ColumnDef<any>[] =({IsAdmin,userPermission}:{IsAdmin:boolean,userPermission:any})=>{ 
  return [
  {
    accessorKey: "documentName",
    header: () => {
      return <div className="text-left">Document Name</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left ml-2">{row?.original?.documentName}</div>
      );
    },
  },
  {
    accessorKey: "documentType",
    header: () => {
      return <div className="text-left">Document Type</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left ml-2">{row?.original?.documentType}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => {
      return <div className="text-left">Document Description</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left ml-2" title={row?.original?.description}>
          {row?.original?.description.length > 40
            ? `${row?.original?.description.slice(0, 40)}...`
            : row?.original?.description}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const doc = row.original;
      const handleDelete = () => {
        doc?.setIsdelete(true);
        doc?.setDeleteData(doc?.id);
      };
      const hadnleEdit = async (data: any) => {
        doc?.setopen(true);
        doc?.setEditableData(data);
      };
      return (
        <>
          <div className="flex justify-evenly items-center">
            <Link href={doc?.file || ""} target={""}>
              <Download className="text-grey-g1 cursor-pointer" size={20} />
            </Link>
            {(IsAdmin || userPermission?.setting?.add_edit)&& 
            <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={"/svgs/note.svg"}
                  alt="actions"
                  height={18}
                  width={18}
                  onClick={() => hadnleEdit(doc)}
                  className="cursor-pointer"
                />
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
              size={20}
            />
            </>}
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
]
};