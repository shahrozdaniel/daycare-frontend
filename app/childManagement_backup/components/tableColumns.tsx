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

import Link from "next/link";
import { useRouter } from "next/router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  checkAvailableDate,
  formatDateWithUTC,
} from "@/utils/utilityFunctions";
import moment from "moment";
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
        <div className="flex gap-2 px-3">
          {childObject ? (
            <>
              <Image
                className="w-[50px] h-[50px] rounded-full object-cover"
                src={
                  childObject.photo ? childObject.photo : "/svgs/no-image.svg"
                }
                alt="user"
                width={50}
                height={50}
              />
              {/* {console.log("row--->", row)} */}
              <div className=" text-base font-medium capitalize px-2">
                <span className="capitalize  text-[#323232] text-sm font-normal">
                  {childObject.name}
                </span>
                {childObject.allergy_details &&
                  childObject.allergy_details.allergies !== "" && (
                    <div className="flex justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="capitalize text-center font-sans text-[#B42505] text-[11px] font-normal leading-4 bg-[#FFD39F] px-2 rounded-lg">
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
      let parent: any = row.getValue("ParentName");

      return (
        <div className="flex flex-col">
          <p className="mb-1 font-normal  mx-auto capitalize  text-[#323232] text-sm">
            {row.getValue("ParentName")}
          </p>
          <hr className="bg-[#B9B6E2] w-3/4  mx-auto my-1" />
          <div className="flex justify-evenly mt-1 mx-auto w-[80%]">
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
            {/* <Image src={"/svgs/info-fill.svg"} width={20} height={20} alt="" /> */}
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
    accessorKey: "joiningdate",
    header: "Joining Date",
    cell: ({ row }) => {
      return <>{formatDateWithUTC(row.getValue("joiningdate"))}</>;
    },
  },
  {
    accessorKey: "earliestavl",
    header: "Earliest Availability",
    cell: ({ row }) => {
      const data = row.original.earliestaval;
      const joiningDate = row.original.joiningdate;
      // const formattedDate = data ? checkAvailableDate(data, joiningDate) : "-";
      // const isCapacityFull = row?.original?.earliestaval?.filter((ele: any) => {
      //   return (
      //     ele?.isCapacityFull === false && ele?.classroomDetail?.status == 1
      //   );
      // });

      // const filteredData = data?.find((item: any) => {
      //   return item.classroomDetail.status === 1;
      // });

      function findNearestDate(classrooms: any, joiningDate: string) {
        const joiningDateMoment = moment(joiningDate);
        let closestDate = null;
        let minDiff = Infinity;
        let classroomId;

        classrooms.forEach((classroom: any) => {
          const availabilityDateMoment = moment(classroom.earlisetavailability);
          const diff = availabilityDateMoment.diff(joiningDateMoment, "days");

          if (diff >= 0 && diff < minDiff) {
            closestDate = classroom.earlisetavailability;
            classroomId = classroom.classroomDetail;
            minDiff = diff;
          }
        });

        return { closestDate, classroomId };
      }

      let availibilitydate: any = findNearestDate(data, joiningDate);

      return (
        <>
          {/* <div>{(data && data[0]?.classroomDetail?.name) || "-"}</div> */}

          {availibilitydate && (
            <Link
              href={`/vacancyBoard?class_id=${availibilitydate?.classroomId?.classroom_id}`}
            >
              {" "}
              <div className="cursor-pointer text-blue-600">
                {formatDateWithUTC(availibilitydate.closestDate)}
              </div>
            </Link>
          )}
        </>
      );
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
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;
      // console.log(user);
      let childid = user?.child_id;
      // console.log('registration Id ',user)
      let permission = row?.original?.permission;
      console.log(permission);
      const data = row.original.earliestaval;
      const joiningDate = row.original.joiningdate;
      // let checkcapacity: boolean =
      //   row.original.earliestaval?.every(
      //     (obj: any) => obj.isCapacityFull === true
      //   ) ?? false;

      // const isCapacityFull = row?.original?.earliestaval?.filter((ele: any) => {
      //   return (
      //     ele?.isCapacityFull === false && ele?.classroomDetail?.status == 1
      //   );
      // });

      // const filteredData = row.original.earliestaval?.find((item: any) => {
      //   return item.classroomDetail.status === 1;
      // });

      // let joiningdate = moment(row.getValue("joiningdate")).format(
      //   "YYYY-MM-DD"
      // );

      // let vacancyavailable;
      // for (const key in filteredData?.vacancyPlanning) {
      //   const vacancyDate = moment(key, "YYYY-MM-DD");

      //   if (
      //     vacancyDate.isSameOrAfter(joiningdate, "day") &&
      //     filteredData.vacancyPlanning[key].vacancy > 0
      //   ) {
      //     vacancyavailable = filteredData.vacancyPlanning[key];
      //     break;
      //   }
      // }
      function findNearestDate(classrooms: any, joiningDate: string) {
        const joiningDateMoment = moment(joiningDate);
        let closestDate = null;
        let minDiff = Infinity;
        let classroomId;

        classrooms.forEach((classroom: any) => {
          const availabilityDateMoment = moment(classroom.earlisetavailability);
          const diff = availabilityDateMoment.diff(joiningDateMoment, "days");

          if (diff >= 0 && diff < minDiff) {
            closestDate = classroom.earlisetavailability;
            classroomId = classroom.classroomDetail;
            minDiff = diff;
          }
        });

        return { closestDate, classroomId };
      }

      let availibilitydate: any = findNearestDate(data, joiningDate);
      return (
        <>
          {
            <div className="flex items-center justify-center">
              {/* <Link
                href={`/childRegistration?child_id=${row.original.id}?child_id=${childid}`}
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
                  <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                    {/* <span className="sr-only">Open menu</span> */}
                    <MoreHorizontal className="h-6 w-4 ml-2 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                  <Link
                    href={`/childRegistration?child_id=${
                      row.original.id
                    }?child_id=${childid}&view=${true}`}
                  >
                    <DropdownMenuItem
                      className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1 cursor-pointer"
                      //   onClick={() => navigator.clipboard.writeText(user.id)}
                    >
                      View
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/childRegistration?child_id=${row.original.id}?child_id=${childid}`}
                  >
                    <DropdownMenuItem
                      className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1 cursor-pointer"
                      //   onClick={() => navigator.clipboard.writeText(user.id)}
                    >
                      Edit
                    </DropdownMenuItem>
                  </Link>

                  {/* <DropdownMenuSeparator /> */}
                  {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Notify Parent
              </DropdownMenuItem> */}
                  {user?.invoice_payments?.length > 0 && availibilitydate ? (
                    <>
                      <Link
                        href={`/childEnrollment/${row.original.id}?child_id=${childid}`}
                      >
                        <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                          Complete Form
                        </DropdownMenuItem>
                      </Link>
                    </>
                  ) : null}

                  {/* <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                Reject
              </DropdownMenuItem> */}

                  {user?.invoice ? null : (
                    <DropdownMenuItem
                      className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                      onClick={() =>
                        row.original.openAllocateSeatModal(user?.id)
                      }
                    >
                      Allocate Seat
                    </DropdownMenuItem>
                  )}
                  {user?.invoice_payments?.length > 0 ||
                  !user?.invoice ? null : (
                    <DropdownMenuItem
                      className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1"
                      onClick={() => {
                        row.original.openAddPaymentModal(user?.invoice);
                        row.original.setRegistrationId(user?.id);
                      }}
                    >
                      Approve Payment
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
