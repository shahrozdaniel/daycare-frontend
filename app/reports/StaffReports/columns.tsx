"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type User = {
  id: string;
  childName: string;
  role: string;
  associatedClass: string;
  age: string;
  attendance: string;
  checkInTime: string;
  checkOutTime: string;
  duration: string;
  break: string;
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
    header: "Child Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div>
            {" "}
            <Image src={"/images/pic.svg"} alt="user" width={35} height={35} />
          </div>
          <div className=" font-[DM_Sans]  text-[#323232] text-sm">
          Toddler 
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "associatedClass",
    header: "Associated Class",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "attendance",
    header: " Attendance",
  },
  {
    accessorKey: "checkInTime",
    header: "Check in Time",
  },
  {
    accessorKey: "checkOutTime",
    header: "Check Out Time",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "break",
    header: "Break",
  },
];
