"use client";
import { ReactNode, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Modal from "@/components/common/Modal/Modal";
import EditEmailTemplate from "../components/EditEmailTemplate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteEmaiTemplate } from "@/services/notificationManagemt";

export type EmailTemplate = {
  id: string;
  name: string;
  reminder: string;
  frequency: string;
};

export const emailTemplateColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    // header: "Email Template Name",
    header: () => {
      return <div className="text-left pl-6">Email Template Name</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left pl-8">
          {row.original.name}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "Status",
  //   header: "status",
  // },
  {
    accessorKey: "trigger",
    header: "Trigger",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      console.log(row?.original)
      const data = row.original;
      let setEditData = row?.original?.setEditData
      let setisedit = row?.original?.setisEdit
      const handleEdit = async () => {
        setEditData(data)
        setisedit(true)
      }
      const handleDelete = async() => {
          let res ;
          try {
            res = await deleteEmaiTemplate(row?.original?.totalData?.id)
            if(res?.success){
              toast.success(res?.message)
              row?.original?.reloadTable()
            }
          } catch (error:any) {
            toast.error(error?.response?.data?.error)
            console.log(error)
          }
      }
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                <MoreHorizontal className="h-7 w-4 ml-2 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem
                className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                onClick={handleEdit}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1" onClick={() => {
                      row.original.openConfirmModal(row?.original?.totalData?.id);
                    }}>
                Delete
              </DropdownMenuItem>

              {/* <DropdownMenuItem
                className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
              >
                View
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <ToastContainer/>
        </>
      );
    },
  },
];