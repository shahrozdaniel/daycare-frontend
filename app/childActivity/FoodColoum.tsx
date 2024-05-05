import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export const FoodColoum: ColumnDef<any>[] = [
    {
        accessorKey: "FoodType",
        header: "Food Type",

    },
    {
        accessorKey: "Quantity",
        header: "Quantity",

    },
    {
        accessorKey: "Foodmenu",
        header: "Food Menu",

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