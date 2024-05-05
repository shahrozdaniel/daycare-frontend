import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export const HealthStatus: ColumnDef<any>[] = [
    {
        accessorKey: "HealthStatus",
        header: "Health Status",

    },
    {
        accessorKey: "Observation",
        header: "Observation",

    },
 
    {
        accessorKey: "Note",
        header: "Note",

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