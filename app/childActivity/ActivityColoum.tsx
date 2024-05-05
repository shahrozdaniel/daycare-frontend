import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export const ActivityColoum: ColumnDef<any>[] = [
    {
        accessorKey: "activityname",
        header: "Activity Name",

    },
    {
        accessorKey: "Classroom",
        header: "Classroom Type",

    },
    {
        accessorKey: "Domain",
        header: "Domain",

    },
    {
        accessorKey: "material",
        header: "Material",

    },
    {
        accessorKey: "instruction",
        header: "Instruction",

    },
    {
        accessorKey: "Description",
        header: "Description",

    },
    // {
    //     id: "actions",
    //     header: "Action",
    //     cell: ({ row }) => {
    //         let docs = row?.original?.totalData?.files

    //         return (
    //             <>
    //                 {docs ? <div className="flex items-center">
    //                     <Link href={docs? docs : ''}  >
    //                         <EyeIcon className="text-grey-g1 cursor-pointer ml-5" />
    //                     </Link>
    //                 </div> : '--'}
    //                 <ToastContainer />

    //             </>
    //         );
    //     },
    // },
];