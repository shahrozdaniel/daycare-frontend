"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export const usercolumns: ColumnDef<any>[] = [
    {
        accessorKey: "fristname",
        header: "First Name",
    },
    {
        accessorKey: "lastname",
        header: "Last Name",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone Number",
    },
    {
        accessorKey: "rolename",
        header: "Role Name",
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            console.log(row?.original)
            const user = row.original;
            let setEdit = user?.setEdit
            let totalData = user?.totalData
            let setEditData = user?.setEditData
            const assignRole = async () => {
                setEditData(totalData)
                setEdit(true)

            }
            return (
                <>
                    {row?.original?.rolename != 'admin' && <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-10 p-0 outline-none" onClick={assignRole}>
                                <Image src={"/svgs/note.svg"} alt="actions" height={20} width={20} />
                            </Button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>}

                </>
            );
        },
    },
];
