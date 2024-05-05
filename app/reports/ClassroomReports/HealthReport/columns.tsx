"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type User = {
  id: string;
  childName: string;
  associatedClass: string;
  healthStatus: string;
  observation: string;
  viewProfile: string;
};

interface RandomDataItem {
  name: string;
  imageUrl: string;
}

// Function to generate random data
const generateRandomData = (count: number): RandomDataItem[] => {
  const data: RandomDataItem[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      name: `User ${i + 1}`,
      imageUrl: "/images/pic.svg",
    });
  }
  return data;
};
const randomData = generateRandomData(10);

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "childName",
    // header: "Child Name",
    header: () => {
      return <div className="text-left pl-4">Child Name</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center gap-2 pl-6">
          <div>
            {" "}
            <Image src={"/images/pic.svg"} alt="user" width={35} height={35} />
          </div>
          <div className="font-[DM_Sans]   text-[#323232] text-sm">Toddler</div>
        </div>
      );
    },
  },
  {
    accessorKey: "associatedClass",
    header: "Associated Class",
  },
  {
    accessorKey: "healthStatus",
    header: "Health Status",
  },
  {
    accessorKey: "observation",
    header: "Observation",
  },

  {
    accessorKey: "viewProfile",
    header: "View Profile",
  },
];
