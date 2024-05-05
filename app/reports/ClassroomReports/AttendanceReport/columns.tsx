"use client";
import { formatDateWithUTC } from "@/utils/utilityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export type User = {
  id: string;
  childName: string;
  associatedClass: string;
  age: string;
  attendance: string;
  checkInTime: string;
  checkOutTime: string;
  duration: string;
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

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "childName",
    // header: "Child Name",
    header: ()=>{
      return (
        <div className="text-left pl-4">Child Name</div>
      )
    },
    // cell: ({ row }) => {
    //   return (
    //     <div className="flex items-center gap-2">
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
    cell: ({ row }) => {
      return (
        <div className="text-left pl-6">
          {row.getValue('childName')}
        </div>
      );
    },
  },
  {
    accessorKey: "associatedClass",
    header: "Associated Class",
  },
  {
    accessorKey: "attendance",
    header: " Attendance",
    cell: ({ row }) => {
      let checkintime: any = moment(row.getValue("checkin")).format("HH:mm");
      let data = row?.original?.checkin?.split("T")?.[1];

      return <p>{row.getValue("checkin") ? 'Present' : "Absent"}</p>;
    }
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

      return <p>{row.getValue("checkin") ? data?.split("+")?.[0] : "- -"}</p>;
    },
  },
  {
    accessorKey: "checkout",
    header: "Check Out",
    cell: ({ row }) => {
      let data = row?.original?.checkout?.split("T")?.[1];
      return <p>{row.getValue("checkout") ? data?.split("+")?.[0] : "- -"}</p>;
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
    id: "View Profile",
    header: "View Profile",
    cell: ({ row }) => {
      return (
        <div className="cursur-pointer">
          <Link href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}>
            <span> View Profile</span>
          </Link>
        </div>
      );
    },

  },

];
