"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate, format24HourTime } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
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
import { waitlistTableType } from "../page";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { childlistStatus } from "@/services/childrenActionServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Childid =

export const pendingColoum: ColumnDef<any>[] = [
  {
    accessorKey: "ChildName",
    header: "Child Name",
    cell: ({ row }) => {
      let childObject: any = row.getValue("ChildName");

      return (
        <div className="flex gap-2 ">
          {row.getValue("ChildName") ? (
            <>
              <Image
                className="w-[35px] h-[35px] rounded-full object-cover"
                src={
                  childObject.photo ? childObject.photo : "/svgs/no-image.svg"
                }
                alt="user"
                width={35}
                height={35}
              />
              {/* {console.log("row--->", row)} */}
              <div className="text-base font-[500] font-sans  capitalize">
                {childObject.name}
                {childObject.allergy_details && (
                  <div className="flex justify-between">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-center font-sans text-[#B42505] text-[11px] font-normal leading-4 bg-[#FFD39F] px-2 rounded-lg">
                            A
                          </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#F8B2B3] p-5 w-[200px]">
                          <p className="font-sans text-black">
                            {childObject.allergy_details.allergies}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "Classroom",
    header: "Classroom",
  },
  {
    accessorKey: "ParentName",
    header: "Parent Name",
    cell: ({ row }) => {
      // console.log("row parent", row.getValue("ParentName"));
      return (
        <div className="flex flex-col">
          <p className="mb-1 text-[16px] font-normal capitalize text-center mx-auto" >
            {row.getValue("ParentName")}
          </p>
          <hr className="bg-[#B9B6E2] w-3/4  mx-auto my-1" />
          <div className="flex justify-between mx-auto mt-1 w-[70%]">
            <Image src={"/svgs/table-fill.svg"} width={20} height={20} alt="" />
            <Image src={"/svgs/phone-fill.svg"} width={20} height={20} alt="" />
            <Image src={"/svgs/info-fill.svg"} width={20} height={20} alt="" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "RegistrationDate",
    header: "Registration Date",
    cell: ({ row }) => {
      // const formattedDate: string = formatDate(
      //   row.getValue("RegistrationDate")
      // );
      return (
        <div className="text-base font-normal font-sans">
          {row.getValue("RegistrationDate")}
        </div>
      );
    },
  },
  {
    accessorKey: "joiningdate",
    header: "Joining Date",
    cell: ({ row }) => {
      // const formattedTime: string = format24HourTime(
      //   row.getValue("joiningdate")
      // );
      return (
        <div className="text-base font-normal font-sans">
          {row.getValue("joiningdate")}
        </div>
      );
    },
  },
  {
    accessorKey: "earliestavl",
    header: "Earliest Availability",
    cell: ({ row }) => {
      // const formattedTime: string = format24HourTime(
      //   row.getValue("earliestavl")
      // );
      return <div>{row.getValue("earliestavl")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center py-[3px] text-[#E32121] bg-[#FFEBEB] rounded p-2">
          <p className="font-sans text-[14px] font-medium ">
            {" "}
            {row.getValue("status")}{" "}
          </p>
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      // console.log(user);
      let child_id = user?.id;
      const HandleStatus = async (id: any, status: any) => {
        let body = {
          status: status, // can be 0/1/2
        };

        // console.log(id, status)
        let res;
        try {
          res = await childlistStatus(id, body);
          if (res?.success) {
            toast.success(res?.message);
            user?.reloadTable();
          } else {
            toast.error(res?.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <div className="flex items-center ">
         <div className="flex flex-row items-center gap-2">
         <Link href={`/childRegistration?child_id=${child_id}&view=${true}`}>
            <Image
              src={"/svgs/eye-icon.svg"}
              alt="actions"
              height={20}
              width={20}
              
            />
          </Link>
          <Link href={`/childRegistration?child_id=${child_id}`}>
            <Image
              src={"/svgs/note.svg"}
              alt="actions"
              height={15}
              width={15}
          
            />
          </Link>
         </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                {/* <span className="sr-only">Open menu</span> */}
                <MoreHorizontal className="h-6 w-4 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            {user?.statusId != 2 ? <DropdownMenuContent align="center">
              {user?.statusId != 2 && (
                <DropdownMenuItem
                  className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                  onClick={() => HandleStatus(child_id, 1)}
                >
                  Approve
                </DropdownMenuItem>
              )}
              {user?.statusId != 2 && (
                <DropdownMenuItem
                  className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                  onClick={() => HandleStatus(child_id, 2)}
                >
                  Reject
                </DropdownMenuItem>
              )}
            </DropdownMenuContent> : <>
              <DropdownMenuContent align="center">
                <DropdownMenuItem
                  className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                  onClick={() => toast.error('Approval rejected already')}
                >
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>}
          </DropdownMenu>
          <ToastContainer />
        </div>
      );
    },
  },
];
