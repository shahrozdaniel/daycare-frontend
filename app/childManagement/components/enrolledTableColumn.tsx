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
import { waitlistTableType, enrolledTableType } from "../page";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";
import {
  Date_formator_YYYY_MM_DD,
  getAMPMTime,
} from "@/utils/utilityFunctions";

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

export const enrolledTableColumn: ColumnDef<any>[] = [
  {
    accessorKey: "childname",
    header: "Child Name",
    cell: ({ row }) => {
      let childObject: any = row.getValue("childname");
      return (
        <div className="flex gap-2 " style={{ cursor: "pointer" }}>
          <Link
            href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}
            className="flex gap-2"
          >
            {childObject ? (
              <>
                <div>
                  <Image
                    className="w-[35px] h-[35px] rounded-full object-cover"
                    src={
                      childObject.photo
                        ? childObject.photo
                        : "/svgs/no-image.svg"
                    }
                    alt="user"
                    width={35}
                    height={35}
                  />
                </div>
                <div className="text-[0.65rem]">
                  <span className="text-base font-medium font-sans capitalize">
                    {childObject.name}
                  </span>
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
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "classroom",
    header: "Classroom",
  },
  {
    accessorKey: "ParentName",
    header: "Parent Name",
    cell: ({ row }) => {
      // console.log("row parent", row.getValue("ParentName"));
      return (
        <div className="flex flex-col justify-center mx-auto capitalize">
          <p className="mb-1 font-normal text-base mx-auto">
            {row.getValue("ParentName")}
          </p>
          <hr className="bg-[#B9B6E2] mx-auto w-3/4 my-1" />
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
            {/* <Image
              src={"/svgs/phone-table-icon.svg"}
              width={15}
              height={15}
              alt=""
            /> */}
            <Image src={"/svgs/info-fill.svg"} width={20} height={20} alt="" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Joining Date",
  },

  {
    accessorKey: "checkin",
    header: "Check In",
    cell: ({ row }) => {
      let checkintime: any = moment(row.getValue("checkin")).format("HH:mm");
      let data = row?.original?.checkin?.split("T")?.[1];

      return <p>{row.getValue("checkin") ? data?.split("+")?.[0] : "- -"}</p>;
    },
  },
  {
    accessorKey: "checkout",
    header: "Check Out",
    cell: ({ row }) => {
      let data = row?.original?.checkout?.split("T")?.[1];
      return <p>{row.getValue("checkout") ? data?.split("+")?.[0] : "- -"}</p>;
    },
    // cell: ({ row }) => {
    //   return (
    //     <div className="flex items-center justify-center py-[3px] py-[4px] bg-[#EC2D30] rounded w-[96px]">
    //       <p className="font-sans text-xs font-normal text-white">
    //         {" "}
    //         {row.getValue("checkout")}{" "}
    //       </p>
    //     </div>
    //   );
    // },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;
      let childId = row?.original?.child_id;
      console.log("child Id", row);
      // console.log(user);
      // console.log("child id original", row.original);
      return (
        <div className="flex">
          <Link
            href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}
          >
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
                <MoreHorizontal className="h-7 w-4 ml-2 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <Link
                href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}
              >
                <DropdownMenuItem
                  className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                  //   onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  Profile
                </DropdownMenuItem>
              </Link>
              {/* <DropdownMenuSeparator /> */}
              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Check In
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Check Out
              </DropdownMenuItem> */}

              <Link href={`/childActivity/${row?.original?.child_id}`}>
                <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                  Daily reports
                </DropdownMenuItem>
              </Link>
              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Move
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Send Note
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Graduate
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
