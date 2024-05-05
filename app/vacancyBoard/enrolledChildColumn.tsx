"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { formatDateWithUTC } from "@/utils/utilityFunctions";
import Image from "next/image";
export type enrolledChidColumnType = {
  id: string;
  childName: string;
  endDate: string;
};

export const enrolledChildColumn: ColumnDef<enrolledChidColumnType>[] = [
  {
    accessorKey: "childName",
    header: () => {
      return (
        <div className="flex justify-start">
          <div className="self-start pl-2">Child Name</div>
        </div>
      );
    },
    cell: ({ row }) => {
      let childObject: any = row.getValue("childName");
      return (
        <div className="flex items-center gap-2 px-3">
          {childObject ? (
            <>
              <Image
                className="w-[50px] h-[50px] rounded-full object-cover"
                src={
                  childObject.childphoto
                    ? childObject.childphoto
                    : "/svgs/no-image.svg"
                }
                alt="user"
                width={50}
                height={50}
              />
              {/* {console.log("row--->", row)} */}
              <div className=" text-base font-medium font-sans capitalize px-2">
                <span className="capitalize">{childObject.childname}</span>
              </div>
            </>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      console.log("row,row", row.getValue("schedule"));
      let days: any[] = row.getValue("schedule");
      return (
        <div className="flex items-center gap-2 max-w-[100px]">
          {days?.map((item: any, index) => {
            return (
              <p key={index} className="p-2 bg-teal-400">
                {item.substring(0, 1)}
              </p>
            );
          })}
          {/* {row.getValue("graduationDate")
            ? formatDateWithUTC(row.getValue("graduationDate"))
            : "--"} */}
        </div>
      );
    },
  },
  {
    accessorKey: "graduationDate",
    header: "Graduation Date",
    cell: ({ row }) => {
      return (
        <>
          {row.getValue("graduationDate")
            ? formatDateWithUTC(row.getValue("graduationDate"))
            : "--"}
        </>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("reason")}</span>;
    },
  },
];
