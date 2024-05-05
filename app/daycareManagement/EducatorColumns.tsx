"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate, format24HourTime } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { educatorTableType } from "./educatorManagement/page";
import { educatorTerminate } from "./components/educatorManagementApi";
import { toast } from "react-toastify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
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

export const EducatorColumn: ColumnDef<educatorTableType>[] = [
  {
    accessorKey: "educatorName",
    header: "Educator Name",
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
                  <p className=" text-base font-[400] font-sans  text-[#000000] capitalize">
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
          <div className=" text-[16px] font-[400] text-[#000000] text-center">
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
      // const formattedDate: string = formatDate(
      //   row.getValue("RegistrationDate")
      // );
      return <div>{row?.original?.start_date?.split("T")?.[0]}</div>;
    },
  },
  {
    accessorKey: "Date",
    header: "Date",
    cell: ({ row }) => {
      // const formattedDate: string = formatDate(
      //   row.getValue("RegistrationDate")
      // );
      return <div>{row.getValue("Date") || "--"}</div>;
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
          {row?.original?.isActive == 0 ? (
            ""
          ) : (
            <>
              {checkInTime != null ? (
                <div>
                  {row.getValue("CheckIn") ? row.getValue("CheckIn") : "--"}
                </div>
              ) : unixTime > todayUnixDate ? (
                <div
                  className="flex items-center justify-center  py-[4px] bg-[#50c878] rounded p-2"
                  style={{ cursor: "pointer" }}
                >
                  <p className="font-sans text-base font-normal text-white">
                    {" "}
                    <span
                      onClick={() => {
                        row.original.openCheckInModal();
                        row?.original.setStaffId(row.original.id);
                      }}
                    >
                      Check In
                    </span>
                  </p>
                </div>
              ) : null}
            </>
          )}
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
      // const formattedTime: string = format24HourTime(
      //   row.getValue("joiningdate")
      // );
      let checkInTime = row?.original?.attendence;
      // const handleCheckInCheckOut = async (id: any, action: string) => {
      //   try {
      //     let body = {
      //       staffId: id,
      //       actionType: action,
      //     };
      //     let res = await educatorCheckinCheckout(body);
      //     if (res.success) {
      //       reloadTable();
      //       // console.log("res succes", res);
      //       toast.success(res.message);
      //     } else {
      //     }
      //   } catch (error: any) {
      //     toast.error(error.response.data.message);
      //     console.log("error", error);
      //   }
      // };
      return (
        <div>
          {row?.original?.isActive == 0 ? (
            ""
          ) : (
            <div>
              {checkoutDate === "Invalid date" ||
              checkoutDate === null ||
              checkoutDate?.includes("Invalid date") ? (
                <>
                  {checkInTime !== null ? (
                    <div
                      className="flex items-center justify-center py-[4px] bg-[#EC2D30] rounded p-2"
                      style={{ cursor: "pointer" }}
                    >
                      <p className="font-sans text-base font-normal text-white">
                        {" "}
                        <span
                          // onClick={() =>
                          //   handleCheckInCheckOut(row?.original?.id, "checkout")
                          // }

                          onClick={() => {
                            row.original.openCheckoutModal();
                            row?.original.setStaffId(row.original.id);
                          }}
                        >
                          Check Out
                        </span>
                      </p>
                    </div>
                  ) : (
                    "--"
                  )}
                </>
              ) : (
                row.getValue("CheckOut")
              )}
              <ToastContainer />
            </div>
          )}
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
    header: "Incident",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      let reloadTable = row?.original?.reloadtable;
      // console.log(user);

      const HandleDeactivate = async (id: any, status: number) => {
        let body = {
          is_active: status,
        };
        let res;
        try {
          res = await educatorTerminate(id, body);
          if (res?.success) {
            toast.success(res?.message);
            reloadTable();
          } else {
            toast.error("some thing went wrong");
          }
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <div className="flex">
          <Link href={`/userManagement/educatorProfile/${row?.original?.id}`}>
            {" "}
            <Image
              src={"/svgs/eye-icon.svg"}
              alt="actions"
              height={20}
              width={20}
              className="mt-1"
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

              <Link
                href={`/userManagement/educatorProfile/${row?.original?.id}`}
              >
                <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                  View
                </DropdownMenuItem>
              </Link>
              {/* <DropdownMenuSeparator /> */}
              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Delete
              </DropdownMenuItem> */}

              {row?.original?.isActive == 1 && (
                <DropdownMenuItem
                  className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                  onClick={() => HandleDeactivate(row?.original?.id, 0)}
                >
                  Deactivate
                </DropdownMenuItem>
              )}

              {row?.original?.isActive == 0 && (
                <DropdownMenuItem
                  className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                  onClick={() => HandleDeactivate(row?.original?.id, 1)}
                >
                  Activate
                </DropdownMenuItem>
              )}

              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Reports
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Move
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Check-in
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Check-out
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <ToastContainer />
        </div>
      );
    },
  },
];
