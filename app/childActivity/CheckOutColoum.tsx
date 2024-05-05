import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export const CheckoutColoum: ColumnDef<any>[] = [
    {
        accessorKey: "CheckOutTime",
        header: "Check Out time",

    },


    {
        accessorKey: "CheckoutNote",
        header: " Check Out Note",

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