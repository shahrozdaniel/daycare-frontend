import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export const incidentColumn: ColumnDef<any>[] = [
  {
    accessorKey: "incidentName",
    header: "Incident Name",
  },
  {
    accessorKey: "nature",
    header: "Nature",
  },
  {
    accessorKey: "staff_name",
    header: "Staff Present Name",
  },
  {
    accessorKey: "incidentTime",
    header: "Time",
  },

  // {
  //     id: "actions",
  //     header: "Action",
  //     cell: ({ row }) => {
  //         let docs = row?.original?.totalData?.files

  //         return (
  //             <>
  //                 {docs ? <div className="flex items-center">
  //                     <Link href={docs ? docs : ''}  >
  //                         <EyeIcon className="text-grey-g1 cursor-pointer ml-5" />
  //                     </Link>
  //                 </div> : '--'}
  //             </>
  //         );
  //     },
  // },
];
