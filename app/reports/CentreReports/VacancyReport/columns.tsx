"use client";
import { formatDateWithUTC } from "@/utils/utilityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export type User = {
  id: string;
  childName: string;
  associatedClass: string;
  ageRange: string;
  graduationDate: string;
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

// export const columns: ColumnDef<User>[] = [
//   {
//     accessorKey: "childName",
//     header: "Child Name",
//     cell: ({ row }) => {
//       return (
//         <div className="flex items-center gap-2">
//           <div>
//             {" "}
//             <Image src={"/images/pic.svg"} alt="user" width={35} height={35} />
//           </div>
//           <div className="text-[#000000] font-[DM_Sans] text-[16px] font-medium">
//             Toodler
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "associatedClass",
//     header: "Associated Class",
//   },
//   {
//     accessorKey: "ageRange",
//     header: "Age Range",
//   },
//   {
//     accessorKey: "graduationDate",
//     header: "Estimated Graduation Date",
//   },
//   {
//     accessorKey: "viewProfile",
//     header: "View Profile",
//   },
// ];





export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "childname",
    // header: "Child Name",
    header: () => {
      return <div className="text-left pl-4">Child Name</div>;
    },
    cell: ({ row }) => {
      let child: any = row.getValue("childname");
      return (
         <div className="flex gap-2  justify-center items-center pl-6">
         
         {child ? (
           <>
             <div>
               {/* <Image
                 className="w-[35px] h-[35px] rounded-full object-cover"
                 src={
                   childObject.photo
                     ? childObject.photo
                     : "/svgs/no-image.svg"
                 }
                 alt="user"
                 width={35}
                 height={35}
               /> */}
             </div>
             <div className="text-[0.65rem]">
             <span className="font-medium font-sans capitalize text-[#323232] text-sm">
                 {child}
               </span>
             
             </div>
           </>
         ) : null}
     </div>
      );
    },
  },
  {
    accessorKey: "classroom",
    header: "Classroom",
  },
  {
    accessorKey: "ParentName",
    header: "Parent Name",
   
  },
  {
    accessorKey: "date",
    header: "Graduation Date",
    cell: ({ row }) => {
      return <>{row.getValue("date")?formatDateWithUTC(row.getValue("date")):""}</>;
    },
  },
  {
    id: "actions",
    header: "View Profile",
    cell: ({ row }) => {
      return (
        <>
          {  <div className="flex justify-center items-center">
            <Link
              href={`/childManagement/childProfile?child_id=${row?.original?.child_id}&enrollment_id=${row?.original?.id}`}
            >
              <Image
                src={"/svgs/eye-icon.svg"}
                alt="actions"
                height={20}
                width={20}
              />
            </Link>
           
          </div>}
        </>
      );
    },
  },


];
