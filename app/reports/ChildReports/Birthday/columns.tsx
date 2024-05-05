"use client";
import { formatDateWithUTC } from "@/utils/utilityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export type User = {
  id: string;
  childName: string;
  associatedClass: string;
  dateBirth: string;
  age: string;
  viewProfile: string;
  child_id: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "childName",
    // header: "Child Name",
    header: () => {
      return <div className="text-left pl-3">Child Name</div>;
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
    cell: ({ row }) => {
      return <div className="text-left pl-5">{row.getValue("childName")}</div>;
    },
  },
  {
    accessorKey: "associatedClass",
    header: "Associated Class",
  },

  {
    accessorKey: "dateBirth",
    header: "Date of Birth",
    cell: ({ row }) => {
      return <>{formatDateWithUTC(row.getValue("dateBirth"))}</>;
    },
  },
  // {
  //   accessorKey: "age",
  //   header: "Age",
  // },
  {
    accessorKey: "View Profile",
    cell: ({ row }) => {
      return (
        <div className="cursur-pointer">
          <Link
            href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}
          >
            <span> View Profile</span>
          </Link>
        </div>
      );
    },
  },
];
