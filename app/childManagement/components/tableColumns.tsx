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
function calculateDuration(startDate: Date, endDate: Date): string {
  const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Format the duration as HH:mm
  const formattedDuration = `${padZero(hours)}:${padZero(minutes)}`;

  return formattedDuration;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

// const Childid =

export const tableColumn: ColumnDef<any>[] = [
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
              <div className=" text-base font-medium font-sans lowercase">
                <span className="capitalize">{childObject.name}</span>
                {childObject.allergy_details && (
                  <div className="flex justify-between">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="capitalize text-center font-sans text-[#B42505] text-[11px] font-normal leading-4 bg-[#FFD39F] px-2 rounded-lg">
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
          <p className="mb-1 text-base font-normal font-sans mx-auto capitalize">
            {row.getValue("ParentName")}
          </p>
          <hr className="bg-[#B9B6E2] w-3/4  mx-auto my-1" />
          <div className="flex justify-between mt-1 mx-auto w-[70%]">
            <Image src={"/svgs/table-fill.svg"} width={15} height={15} alt="" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    src={"/svgs/phone-fill.svg"}
                    width={15}
                    height={15}
                    alt=""
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-[#cff5bf] p-5 w-[150px]">
                  <p className="font-sans text-black  text-center">
                    {row?.original?.phoneNo}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
        <div className="font-base font-normal font-sans">
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
        <div className="font-base font-normal font-sans">
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
        <div className="flex items-center justify-center py-[3px]  bg-[#FFEBEB] rounded p-2">
          <p className="font-sans text-[14px] font-medium text-[#E32121]">
            {" "}
            {row.getValue("status")}{" "}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      // console.log(user);
      let childid = user?.child_id
      // console.log('registration Id ',user)
      return (
        <div className="flex">
          <Link href={`/childRegistration?child_id=${row.original.id}?child_id=${childid}`}>
            <Image
              src={"/svgs/note.svg"}
              alt="actions"
              height={20}
              width={20}
            />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                {/* <span className="sr-only">Open menu</span> */}
                <MoreHorizontal className="h-6 w-4 ml-2 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <Link href={`/childRegistration?child_id=${row.original.id}?child_id=${childid}`}>
                <DropdownMenuItem
                  className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                //   onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  View
                </DropdownMenuItem>
              </Link>

              {/* <DropdownMenuSeparator /> */}
              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Notify Parent
              </DropdownMenuItem> */}
              <Link href={`/childEnrollment/${row.original.id}?child_id=${childid}`}>
                <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                  Complete Form
                </DropdownMenuItem>
              </Link>

              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Reject
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Edit
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Approve Payment
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
