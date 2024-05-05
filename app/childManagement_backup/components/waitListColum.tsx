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
import { childlistStatus } from "@/services/childrenActionServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/common/Modal/Modal";
import {
  AddButton,
  CancelButton,
} from "@/components/common/Modal/Modal.styled";
import { ModalDetailsContainer } from "@/app/reports/Common.styled";
import { ConfirmationModal } from "@/components/common/Modal/ConfirmationModal";
import moment from "moment";
import { formatDateWithUTC } from "@/utils/utilityFunctions";

// const Childid =
export const pendingColoum: ColumnDef<any>[] = [
  {
    accessorKey: "name",
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
        <div className="flex  items-center gap-2 px-5">
          {childObject ? (
            <>
              <Image
                className="w-[51px] h-[51px] rounded-full object-cover"
                src={
                  childObject.photo ? childObject.photo : "/svgs/no-image.svg"
                }
                alt="user"
                width={50}
                height={50}
              />
              {/* {console.log("row--->", row)} */}
              <div className=" font-sans  capitalize px-2  text-[#323232] text-sm">
                {childObject.name}
                {childObject.allergy_details &&
                  childObject.allergy_details.allergies !== "" && (
                    <div className="flex justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-center font-sans pl-1 text-[#B42505] text-[12px] font-normal leading-4 bg-[#FFD39F] px-2 rounded-lg">
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
      console.log(parent);

      return (
        <div className="flex flex-col">
          <p className="mb-1 text-[16px] font-normal capitalize text-center mx-auto  text-[#323232] text-sm">
            {parent}
          </p>
          <hr className="bg-[#B9B6E2] w-3/4  mx-auto my-1" />
          <div className="flex justify-evenly mx-auto mt-1 w-[80%]">
            <Image src={"/svgs/table-fill.svg"} width={20} height={20} alt="" />
            <Image src={"/svgs/phone-fill.svg"} width={20} height={20} alt="" />
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
  // {
  //   accessorKey: "earliestavl",
  //   header: "Earliest Availability",
  //   cell: ({ row }) => {
  //     const data = row.original.earliestaval;

  //     const formattedDate = data ? checkAvailableDate(data) : "-";
  //     return (
  //       <>
  //         <div>{(data && data[0]?.classroomDetail?.name) || "-"}</div>

  //         {data && (
  //           <Link
  //             href={`/vacancyBoard?class_id=${data[0]?.classroomDetail?.classroom_id}`}
  //           >
  //             {" "}
  //             <div className="cursor-pointer text-blue-600">
  //               {formattedDate}
  //             </div>
  //           </Link>
  //         )}
  //       </>
  //     );
  //   },
  // },
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
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      // console.log(user);
      let child_id = user?.id;
      let setisOpen = user?.setisOpen;
      let setAction = user?.setApiAction;

      // const HandleStatus = async (id: any, status: any) => {
      //   let body = {
      //     status: status, // can be 0/1/2
      //   };
      //   // console.log(id, status)
      //   let res;
      //   try {
      //     res = await childlistStatus(id, body);
      //     if (res?.success) {
      //       toast.success(res?.message);
      //       user?.reloadTable();
      //     } else {
      //       toast.error(res?.message);
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
      const HandleStatus = (id: any, status: any) => {
        setisOpen(true);
        setAction({ id: id, status: status });
      };
      let permission = row?.original?.permission;
      return (
        <>
          {
            <div className="flex  justify-center ">
              {/* <div className="flex flex-row items-center gap-4">
                <Link
                  href={`/childRegistration?child_id=${child_id}&view=${true}`}
                >
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
              </div> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                    {/* <span className="sr-only">Open menu</span> */}
                    <MoreHorizontal className="h-6 w-4 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="center">
                  <Link
                    href={`/childRegistration?child_id=${child_id}&view=${true}`}
                  >
                    <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1 cursor-pointer">
                      View
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/childRegistration?child_id=${child_id}`}>
                    <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1 cursor-pointer">
                      Edit
                    </DropdownMenuItem>
                  </Link>
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
                </DropdownMenuContent>
              </DropdownMenu>
              <ToastContainer />
            </div>
          }
        </>
      );
    },
  },
];
