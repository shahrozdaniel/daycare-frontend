"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export type Classroom = {
  id: string;
  name: string;
  ageRange: string;
  educatorRatio: string;
  childEnrolled: string;
  classroomType: string;
  educators: string;
  status: string;
  logo?: any;
  popup?: any;
  showPopup?: any;
};

export const columns: ColumnDef<Classroom>[] = [
  // {
  //   accessorKey: "logo",
  //   header: "Logo",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex">
  //         <>
  //           <Image
  //             className="w-[45px] h-[45px] rounded-full object-cover"
  //             src={
  //               row?.original?.logo ? row?.original?.logo : "/svgs/no-image.svg"
  //             }
  //             alt="user"
  //             width={45}
  //             height={45}
  //           />
  //         </>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      let photo: any = row?.original?.logo;

      return (
        <div className="flex gap-2 items-center">
          {row.getValue("name") ? (
            <>
              <div className="flex justify-center items-center rounded-full w-11 h-11 border-[#4767B8] border bg-[#F3FAFF]">
                <Image
                  className="w-[30px] h-[30px] rounded-full object-cover "
                  src={photo ? photo : "/svgs/no-image.svg"}
                  alt="user"
                  width={30}
                  height={30}
                />
              </div>

              {/* {console.log("row--->", row)} */}
              <div className=" text-base font-[400] font-sans capitalize text-[#000000]">
                <span className="capitalize">{row.getValue("name")}</span>
              </div>
            </>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "ageRange",
    header: "Age Range",
  },
  {
    accessorKey: "educatorRatio",
    header: "Caretaker Ratio",
  },
  {
    accessorKey: "childEnrolled",
    header: "No. of child enrolled",
  },
  {
    accessorKey: "classroomType",
    header: "Classroom Type",
  },
  {
    accessorKey: "educators",
    header: "Educators",
    cell: ({ row }) => {
      const user = row.original;

      // console.log(user);
      let educatorDetail: any = row.getValue("educators");
      const display =
        educatorDetail && educatorDetail.length > 4
          ? educatorDetail.slice(0, 3)
          : educatorDetail;
      return (
        <div className="flex flex-row gap-2  hide-scroll">
          <div className="flex flex-row gap-2 ">
            {display?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <Image
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={
                      item.photo
                        ? item.photo
                        : "/svgs/no-image.svg"
                    } // put item.photo
                    alt="user"
                    width={50}
                    height={50}
                  />

                  <div className="flex flex-col items-center">
                    <span className="text-[0.75rem] text-[#4B4B4B] font-medium font-sans capitalize">
                      {item?.name.split(" ")[0] || null}
                    </span>
                    {item?.certifications?.certifications?.length > 0 && (
                      <span className="text-[0.75rem]">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="capitalize text-center font-sans text-[#B42505] bg-[#FFD39F] text-[11px] font-normal leading-4  px-2 rounded-lg">
                                {item?.certifications?.certifications?.length} C
                              </p>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#FFD39F] px-3 py-2 rounded">
                              {item?.certifications?.certifications?.length ===
                              0 ? null : (
                                <div
                                  className="flex flex-row gap-2 items-center "
                                  key={index}
                                >
                                  {item?.certifications?.certifications?.map(
                                    (item: any, index: any) => {
                                      return (
                                        <div
                                          className="bg-white text-[#4B4B4B] px-2 py-1 border rounded-lg"
                                          key={index}
                                        >
                                          {item?.certificationTypes ||
                                            item?.documentType}
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
                  </div>
                </div>
              );
            })}
          </div>
          {educatorDetail?.length > 4 && (
            <div
              className="flex flex-col text-[#00858E] font-bold "
              onClick={() => {
                user.showPopup(true);
                user.popup(educatorDetail);
              }}
            >
              <div className="w-[50px] h-[50px] rounded-full  bg-[#F5F5F5] flex justify-center items-center text-[14px]">
                +{educatorDetail.length}
              </div>
              <span className=" text-[12px] font-medium font-sans text-center">
                more
              </span>
            </div>
          )}
          <style>{`
      .hide-scroll::-webkit-scrollbar {
        display: none;
      }`}</style>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Image
            src={
              row.getValue("status") === "Active"
                ? "/svgs/active-icon.svg"
                : "/svgs/redring.svg"
            }
            alt="unassigned"
            height={17}
            width={17}
          />
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-center">
          <Link
            href={`/classroomManagement/addClassroom?classroom_id=${row?.original?.id}`}
          >
            <Image
              src={"/svgs/note.svg"}
              alt="actions"
              height={20}
              width={20}
            />
          </Link>
        </div>
      );
    },
  },
];
