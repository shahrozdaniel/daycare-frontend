import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export const MoodColoum: ColumnDef<any>[] = [
    {
        accessorKey: "Mood",
        header: "Mood",

    },
    {
        accessorKey: "Level",
        header: "Level",

    },
    {
        accessorKey: "Note",
        header: "Note",

    },
    // {
    //     accessorKey: "Domain",
    //     header: "Domain",

    // },
    // {
    //     accessorKey: "Skill",
    //     header: "Skill",

    // },
    // {
    //     accessorKey: "Indicator",
    //     header: "Indicator",

    // },
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