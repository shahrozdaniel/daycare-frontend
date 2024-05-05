"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
export type User = {
  id: string;
  classroom: string;
  educator: string;
  children: string;
  educatorName: string;
  childrenName: string;
};
interface RandomDataItem {
  name: string;
  imageUrl: string;
  allergy: boolean;
}
// Function to generate random data
const generateRandomData = (count: number): RandomDataItem[] => {
  const data: RandomDataItem[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      name: `User ${i + 1}`,
      imageUrl: "/images/pic.svg",
      allergy: i % 2 === 0 ? true : false,
    });
  }
  return data;
};
const randomData = generateRandomData(10);
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "classroom",
    header: "Classroom",
    cell: ({ row }: any) => {
      return (
        <div className="flex-col justify-center align-items-center gap-2">
          <p className="text-[#000000] font-[DM_Sans] text-[16px] font-medium">
            {row.getValue("classroom").name || null}
          </p>
          <p className="text-[#747474] font-[DM_Sans] text-[8px] font-medium ">
            Required Ratio vs Current Ratio
          </p>
          <div className="flex gap-2">
            <div className="bg-[#EEFCFC] font-[DM_Sans] text-[10px] font-medium p-1">
              1:{row.getValue("classroom").required_ratio || null}
            </div>
            <div className="bg-[#FFEBEE] font-[DM_Sans] text-[10px] font-medium p-1 ">
              1:{row.getValue("classroom").current_ratio || null}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "educatorCount",
    header: "Educator",
  },
  {
    accessorKey: "childrenCount",
    header: "Children",
  },
  {
    accessorKey: "educators",
    header: "Educator",
    cell: ({ row }: any) => {
      let educatorDetail = row.getValue("educators");
      return (
        <div className="flex flex-row gap-2 overflow-x-auto w-full max-w-[240px] pb-5">
          {educatorDetail?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <Image
                  src={"/images/pic.svg"} // put item.photo
                  alt="user"
                  width={35}
                  height={35}
                />
                <div className="text-[0.65rem]">
                  <p>{item?.name || null}</p>
                  <div className="flex flex-row gap-2 " key={index}>
                    {item?.certifications?.certifications?.map(
                      (item: any, index: any) => {
                        return (
                          <div
                            className="bg-red-r2 w-fit h-fit text-red-r1 px-[5px] py-[2px] text-[8px]"
                            key={index}
                          >
                            {item.certificationTypes}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "childrens",
    header: "Children",
    cell: ({ row }: any) => {
      let childrenDetail = row.getValue("childrens");
      return (
        <div className="flex gap-2 overflow-x-auto w-full max-w-[350px] pb-5">
          {childrenDetail?.map((item: any, index: number) => {
            return (
              <div key={index} className="flex-col gap-2">
                <Image
                  src={"/images/pic.svg"} // put item.photo
                  alt="user"
                  width={35}
                  height={35}
                />
                <div className="text-[0.65rem]">{item.name || null}</div>
                <div className="flex flex-row gap-2">
                  {item.allergy_details?.allergies ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-center bg-[#F8B2B3] pt-0 pb-0 pl-2 pr-2 ">
                            <p className="text-center font-sans text-black text-10 font-normal  leading-12 underline">
                              A
                            </p>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#F8B2B3] p-5 w-[200px]">
                          <p className="font-sans text-black">
                            {item.allergy_details?.allergies}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  },
];
