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
  disableActionIfHoliday,
  disableActionIfNotWorkingDay,
  formatDateWithUTC,
  getAMPMTime,
} from "@/utils/utilityFunctions";
import { useGlobalContext } from "@/app/context/store";

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

export const GetEnrolledTableColumns = () => {
  const { globalHolidayList, globalSettings } = useGlobalContext();

  const name = disableActionIfHoliday(globalHolidayList);
  const workingDay =
    globalSettings.workingDays &&
    disableActionIfNotWorkingDay(globalSettings.workingDays);

  const enrolledTableColumn: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      // header: "Child Name",
      header: () => {
        return (
          <div className="flex justify-start">
            <div className="self-start pl-2">Child Name</div>
          </div>
        );
      },
      cell: ({ row }) => {
        let childObject: any = row?.original?.ChildName;
        return (
          <div
            className="flex gap-2 items-center px-3"
            style={{ cursor: "pointer" }}
          >
            <Link
              href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}
              className="flex gap-2"
            >
              {childObject ? (
                <>
                  <div>
                    <Image
                      className="w-[50px] h-[50px] rounded-full object-cover"
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
                  <div className="text-[0.65rem] px-2">
                    <span className="capitalize  text-[#323232] text-sm">
                      {childObject.name}
                    </span>
                    <div className="flex gap-2">
                      {childObject.allergy_details &&
                        childObject.allergy_details.allergies !== "" && (
                          <div className="flex justify-between">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="text-center font-sans text-[#B42505] text-[12px] font-medium leading-4 bg-[#FFD39F] px-2 rounded-lg">
                                    Any Allergy
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
                      {childObject?.is_child_anaphylactic && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-center font-sans text-[#B42505] text-[12px] font-medium leading-4 bg-[#FFD39F] px-2 rounded-lg">
                                LT
                              </p>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#F8B2B3] p-5 w-[200px]">
                              <p className="font-sans text-black">Yes</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
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
            <p className="mb-1  mx-auto  text-[#323232] text-sm">
              {row.getValue("ParentName")}
            </p>
            <hr className="bg-[#B9B6E2] mx-auto w-3/4 my-1" />
            <div className="flex justify-evenly mt-1 mx-auto w-[80%]">
              <Image
                src={"/svgs/table-fill.svg"}
                width={15}
                height={15}
                alt=""
              />

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
              {/* <Image
                src={"/svgs/info-fill.svg"}
                width={20}
                height={20}
                alt=""
              /> */}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Joining Date",
      cell: ({ row }) => {
        return <>{formatDateWithUTC(row.getValue("date"))}</>;
      },
    },

    {
      accessorKey: "checkin",
      header: "Check In",
      cell: ({ row }) => {
        let checkintime: any = moment(row.getValue("checkin")).format("HH:mm");
        let data = row?.original?.checkin?.split("T")?.[1];

        return (
          <p>
            {row.getValue("checkin") || (!name && !workingDay)
              ? data?.split("+")?.[0]
              : "- -"}
          </p>
        );
      },
    },
    {
      accessorKey: "checkout",
      header: "Check Out",
      cell: ({ row }) => {
        let data = row?.original?.checkout?.split("T")?.[1];
        return (
          <p>
            {row.getValue("checkout") || (!name && !workingDay)
              ? data?.split("+")?.[0]
              : "- -"}
          </p>
        );
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
        // console.log('child Id', row)
        // console.log(user);
        // console.log("child id original", row.original);
        console.log("row -------", row);
        let permission = row?.original?.permission;
        return (
          <>
            {
              <div className="flex justify-center items-center">
                {/* <Link
                  href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}
                >
                  <Image
                    src={"/svgs/note.svg"}
                    alt="actions"
                    height={20}
                    width={20}
                  />
                </Link> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-10 p-0 outline-none"
                    >
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
                    <DropdownMenuItem
                      className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                      onClick={() => {
                        row.original.openGradModal(row.original);
                        row.original.setEnrollmentId(row.original.id);
                      }}
                    >
                      Graduate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            }
          </>
        );
      },
    },
  ];
  return enrolledTableColumn;
};

// waitlist enroll child column
export const GetWaitlistEnrollChildColumn = () => {
  const { globalHolidayList, globalSettings } = useGlobalContext();

  const name = disableActionIfHoliday(globalHolidayList);
  // const workingDay =globalSettings.workingDays&& disableActionIfNotWorkingDay(globalSettings.workingDays);

  const enrolledTableColumn: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      // header: "Child Name",
      header: () => {
        return (
          <div className="flex justify-start">
            <div className="self-start pl-2">Child Name</div>
          </div>
        );
      },
      cell: ({ row }) => {
        let childObject: any = row?.original?.ChildName;
        return (
          <div
            className="flex gap-2 items-center px-3"
            style={{ cursor: "pointer" }}
          >
            <Link
              href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}
              className="flex gap-2"
            >
              {childObject ? (
                <>
                  <div>
                    <Image
                      className="w-[50px] h-[50px] rounded-full object-cover"
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
                  <div className="text-[0.65rem] px-2">
                    <span className="  capitalize  text-[#323232] text-sm">
                      {childObject.name}
                    </span>
                    <div className="flex gap-2">
                    {childObject.allergy_details &&
                      childObject.allergy_details.allergies !== "" && (
                        <div className="flex justify-between">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p className="text-center font-sans text-[#B42505] text-[12px] font-medium leading-4 bg-[#FFD39F] px-2 rounded-lg">
                                  Any Allergy
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
                       {childObject?.is_child_anaphylactic && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-center font-sans text-[#B42505] text-[12px] font-medium leading-4 bg-[#FFD39F] px-2 rounded-lg">
                                LT
                              </p>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#F8B2B3] p-5 w-[200px]">
                              <p className="font-sans text-black">Yes</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      </div>
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
            <p className="mb-1 font-normal  mx-auto  text-[#323232] text-sm">
              {row.getValue("ParentName")}
            </p>
            <hr className="bg-[#B9B6E2] mx-auto w-3/4 my-1" />
            <div className="flex justify-evenly mt-1 mx-auto w-[80%]">
              <Image
                src={"/svgs/table-fill.svg"}
                width={15}
                height={15}
                alt=""
              />

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
                    <p className="font-sans text-black  text-center text-[#323232] text-sm">
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
              {/* <Image
                src={"/svgs/info-fill.svg"}
                width={20}
                height={20}
                alt="" 
              />*/}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "RegistrationDate",
      header: "Registration Date",
      cell: ({ row }) => {
        return <>{formatDateWithUTC(row.getValue("RegistrationDate"))}</>;
      },
    },
    {
      accessorKey: "date",
      header: "Joining Date",
      cell: ({ row }) => {
        return <>{formatDateWithUTC(row.getValue("date"))}</>;
      },
    },

    // {
    //   accessorKey: "checkin",
    //   header: "Check In",
    //   cell: ({ row }) => {
    //     let checkintime: any = moment(row.getValue("checkin")).format("HH:mm");
    //     let data = row?.original?.checkin?.split("T")?.[1];

    //     return (
    //       <p>
    //         {row.getValue("checkin") || !name ? data?.split("+")?.[0] : "- -"}
    //       </p>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "checkout",
    //   header: "Check Out",
    //   cell: ({ row }) => {
    //     let data = row?.original?.checkout?.split("T")?.[1];
    //     return (
    //       <p>
    //         {row.getValue("checkout") || !name ? data?.split("+")?.[0] : "- -"}
    //       </p>
    //     );
    //   },
    //   // cell: ({ row }) => {
    //   //   return (
    //   //     <div className="flex items-center justify-center py-[3px] py-[4px] bg-[#EC2D30] rounded w-[96px]">
    //   //       <p className="font-sans text-xs font-normal text-white">
    //   //         {" "}
    //   //         {row.getValue("checkout")}{" "}
    //   //       </p>
    //   //     </div>
    //   //   );
    //   // },
    // },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;
        let childId = row?.original?.child_id;
        // console.log('child Id', row)
        // console.log(user);
        // console.log("child id original", row.original);
        console.log("row -------", row);
        let permission = row?.original?.permission;
        console.log("user", user);
        return (
          <>
            {
              <div className="flex justify-center items-center">
                {/* <Link
                  href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}
                >
                  <Image
                    src={"/svgs/note.svg"}
                    alt="actions"
                    height={20}
                    width={20}
                  />
                </Link> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-10 p-0 outline-none"
                    >
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

                    {user?.classroom ? (
                      <DropdownMenuItem
                        className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                        onClick={() =>
                          row.original.handleApproveEnrollment(row?.original)
                        }
                      >
                        Approve enrollment
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                        onClick={() => {
                          row.original.openAssignClassroomModal(row?.original);
                          row.original.setEnrollmentId(String(row.original.id));
                        }}
                      >
                        Assign Classroom and Approve Enrollment
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            }
          </>
        );
      },
    },
  ];
  return enrolledTableColumn;
};
