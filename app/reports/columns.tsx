"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate, format24HourTime } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { formatDateWithUTC } from "@/utils/utilityFunctions";
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

export const coloums: ColumnDef<any>[] = [
  {
    accessorKey: "educatorName",
    // header: "Educator Name",
    header: () => {
      return (
        <div className="flex justify-start">
          <div className="self-start pl-2">Educator Name</div>
        </div>
      );
    },
    cell: ({ row }: any) => {
      console.log("row", row);
      const data = row.getValue("educatorName");
      return (
        <Link href={`/userManagement/educatorProfile/${row.original.id}`}>
          <div
            className="flex gap-2 items-center ml-3"
            style={{ cursor: "pointer" }}
          >
            {data ? (
              <>
                <div className="flex justify-center items-center rounded-full w-11 h-11 border-[#4767B8] border bg-[#F3FAFF]">
                  <Image
                    src={data.photo ? data.photo : "/svgs/no-image.svg"}
                    alt="user"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full object-cover "
                  />
                </div>

                <div className="flex flex-col">
                <p className="font-[400]  capitalize text-[#323232] text-sm">
                    {data?.name}
                  </p>
                  <p className="w-10">
                    {data?.certification?.certifications?.length > 0 && (
                      <span className="text-[0.75rem]">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="capitalize text-center font-sans text-[#B42505] bg-[#FFD39F] text-[11px] font-medium leading-4  px-1 py-[1px] rounded-lg">
                                {data?.certification?.certifications.length} C
                              </p>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#FFD39F] px-3 py-2 rounded">
                              {data?.certification?.certifications.length ===
                                0 ? null : (
                                <div className="flex flex-row gap-2 items-center ">
                                  {data?.certification?.certifications?.map(
                                    (item: any, index: any) => {
                                      return (
                                        <div
                                          className="bg-white text-[#4B4B4B] px-2 py-1 border rounded-lg"
                                          key={index}
                                        >
                                          {item?.documentType}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                    )}
                  </p>

                  {/* <div className="flex justify-between gap-2">
                    {row
                      .getValue("educatorName")
                      ?.certification?.certifications?.map(
                        (item: any, index: any) => {
                          return (
                            <div
                              className="bg-red-r2 w-fit h-fit text-red-r1 px-[1px] text-[8px]"
                              key={index}
                            >
                              {item.documentType}
                            </div>
                          );
                        }
                      )}
                  </div> */}
                </div>
              </>
            ) : null}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "Classroom",
    header: "Classroom",
  },
  {
    accessorKey: "RoleName",
    header: "Role",
    cell: ({ row }) => {
      // console.log("row parent", row.getValue("ParentName"));
      return (
        <div className="flex flex-col">
       <div className="  font-[400]  text-center text-[#323232] text-sm">
            {row.getValue("RoleName")}
          </div>
          {/* <div className="flex gap-2">
            <Image
              src={"/svgs/message-table-icon.svg"}
              width={20}
              height={20}
              alt=""
            />
            <Image
              src={"/svgs/phone-table-icon.svg"}
              width={20}
              height={20}
              alt=""
            />
            <Image
              src={"/svgs/info-table-icon.svg"}
              width={20}
              height={20}
              alt=""
            />
          </div> */}
        </div>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Joining Date",
    cell: ({ row }) => {
      return <>{row.getValue("start_date")?formatDateWithUTC(row.getValue("start_date")):""}</>;
    },
   
  },
  {
    accessorKey: "Date",
    header: "Date",
    cell: ({ row }) => {
      return <>{row.getValue("Date")?formatDateWithUTC(row.getValue("Date")):"--"}</>;
    },
  },
  {
    accessorKey: "CheckIn",
    header: "Check-In",
    cell: ({ row }) => {
      let reloadTable = row?.original?.reloadtable;
      console.log("check In", row?.original?.isActive);
      // const formattedTime: string = format24HourTime(
      //   row.getValue("joiningdate")
      // );
      let todayUnixDate = Date.now();
      const dateString = row?.original?.start_date;
      const dateObject = new Date(dateString);
      const unixTime = dateObject.getTime();
      console.log(
        "condition check",
        unixTime,
        todayUnixDate,
        unixTime < todayUnixDate
      );
      let checkInTime = row?.original?.attendence;
      console.log("check in time", row.getValue("CheckIn"));
      return (
        <div>
          {row.getValue("CheckIn") ? row.getValue("CheckIn") : "--"}
        </div>
      );
    },
  },
  {
    accessorKey: "CheckOut",
    header: "Check-Out",
    cell: ({ row }) => {
      console.log("row", row);
      let reloadTable = row?.original?.reloadtable;
      let checkoutDate: any = row.getValue("CheckOut");
      let checkInTime = row?.original?.attendence;

      return (
        <div>
          {row.getValue("CheckOut") == 'Invalid date AM' ? '---' : row.getValue("CheckOut")}
        </div>
      );

      // return <div></div>;
    },
  },
  {
    accessorKey: "Duration",
    header: "Duration (HH:MM)",
    cell: ({ row }) => {
      let duration = row?.original?.Duration;
      return (
        <div>
          {duration === "NaN:NaN" || duration == null || duration == undefined
            ? "--"
            : duration}
        </div>
      );

      // return <div></div>;
    },
  },
  {
    accessorKey: "Incident",
    header: "View Profile",
    cell: ({ row }) => {
      let duration = row?.original?.Duration;
      return (
        <div className="curser-pointer">
          <Link href={`/userManagement/educatorProfile/${row?.original?.id}`}>
            <span>View Profile</span>
          </Link>
        </div>
      );

      // return <div></div>;
    },
  },

];
