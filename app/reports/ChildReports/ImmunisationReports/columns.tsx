"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export type User = {
  id: string;
  childName: string;
  associatedClass: string;
  ageRange: string;
  status: string;
  lastImmunisation: string;
  upcomingImmunisation: string;
  viewProfile: string;
  enrollmentId:string;
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
      return (
        <div className="flex justify-start">
          <div className="self-start pl-4">Child Name</div>
        </div>
      );
    },
    // cell: ({ row }) => {
    //   return (
    //     <div className="flex  items-center gap-2">
    //       <div>
    //         {" "}
    //         <Image src={"/images/pic.svg"} alt="user" width={35} height={35} />
    //       </div>
    //       <div className="text-[#000000] font-[DM_Sans] text-[16px] font-medium">
    //         Toodler
    //       </div>
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: "associatedClass",
    header: "Associated Class",
  },
  {
    accessorKey: "ageRange",
    header: "Age",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "lastImmunisation",
    header: "Last Immunization",
  },
  // {
  //   accessorKey: "upcomingImmunisation",
  //   header: "Upcoming Immunization",
  // },

  {
    accessorKey: "viewProfile",
    header: "View Profile",
    cell: ({ row }) => {
      return (
        <div className="flex  items-center gap-2 cursur-pointer" >
          <Link href={`/childManagement/childProfile?child_id=${row?.original?.id}&enrollment_id=${row?.original?.enrollmentId}`}>
            <span>View Profile</span>
          </Link>
        </div>
      );
    },
  },
];
