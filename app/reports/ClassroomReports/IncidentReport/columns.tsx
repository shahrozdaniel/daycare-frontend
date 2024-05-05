"use client";
import { formatDateWithUTC } from "@/utils/utilityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type User = {
  id: string;
  childName: string;
  associatedClass: string;
  age: string;
  notifiedName: string;
  incidentType: string;
  dateIncident: string;
  timeNotified: string;
  staffPresent: string;
  openViewModal: any;
  openEditModal: any;
  action: string;
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
      let childObject: any = row.getValue("childName");
      return (
        <div className="flex justify-center items-center gap-2">
          <div>
            {" "}
            <Image
              className="w-[35px] h-[35px] rounded-full object-cover"
              src={
                childObject.child_photo
                  ? childObject.child_photo
                  : "/svgs/no-image.svg"
              }
              alt="user"
              width={35}
              height={35}
            />
          </div>
          <div className=" font-[DM_Sans]  text-[#323232] text-sm">
            {childObject.child_name}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "associatedClass",
    header: "Associated Class",
  },
  {
    accessorKey: "notifiedName",
    header: "Notified P. Name",
  },
  {
    accessorKey: "incidentType",
    header: "Incident Type",
  },
  {
    accessorKey: "dateIncident",
    header: "Date of Incident",
    cell: ({ row }) => {
      return <>{formatDateWithUTC(row.getValue("dateIncident"))}</>;
    },
  },
  {
    accessorKey: "timeNotified",
    header: "Time Notified",
  },
  {
    accessorKey: "staffPresent",
    header: "Staff Present",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center align-items-center gap-2">
          <button
            onClick={() => row.original.openViewModal(row.original.id)}
            type="button"
          >
            <Image
              src={"/svgs/eye-icon-gray.svg"}
              alt="user"
              width={24}
              height={24}
            />
          </button>

          <button
            onClick={() => row.original.openEditModal(row.original.id)}
            type="button"
          >
            <Image
              src={"/svgs/note.svg"}
              alt="actions"
              height={20}
              width={20}
            />
          </button>

          {/* <div>
            <Image
              src={"/svgs/download-icon.svg"}
              alt="user"
              width={24}
              height={24}
            />
          </div> */}
        </div>
      );
    },
  },
];
