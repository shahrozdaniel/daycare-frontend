"use client";
import { calculateAge } from "@/components/common/Utils/ageCalc";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export type User = {
  id: string;
  childName: string;
  associatedClass: string;
  ageRange: string;
  allergies: string;
  viewProfile: string;
  child_id: string
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "childName",
    header: "Child Name",

  },
  {
    accessorKey: "associatedClass",
    header: "Associated Class",
  },
  {
    accessorKey: "ageRange",
    header: "Age",
    cell: ({ row }) => {
      console.log(row?.original?.ageRange)
      return (
        <div className="cursur-pointer">
            <span>{calculateAge(row?.original?.ageRange)} </span>
          
        </div>
      );
    },
    
  },
  {
    accessorKey: "allergies",
    header: "Allergies",
  },
  {
    accessorKey: "viewProfile",
    header: "View Profile",
    cell: ({ row }) => {
      return (
        <div className="cursur-pointer">
          <Link href={`/childManagement/childProfile?child_id=${row?.original?.id}&enrollment_id=${row?.original?.child_id}`}>
            <span> View Profile</span>
          </Link>
        </div>
      );
    },
  },
];
