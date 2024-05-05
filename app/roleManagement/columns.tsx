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
import Link from "next/link";
import { deleteRole } from "@/services/authpermission";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Rolecolumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Role Name",
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {

      const roleId = row.original?.id;
      const deleteRolebyId = async () => {
        let res;
        try {
          res = await deleteRole(roleId)
          if (res?.success) {
            row?.original?.reloadTable()
            toast.success('Role delete successfully')
          } else {
            toast.error("Role already assigned  can't be deleted")
          }
        } catch (error: any) {
          console.log(error)
        }
      }
      return (
        <>
          <DropdownMenu>
            {/* <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                <Image src={"/svgs/note.svg"} alt="actions" height={20} width={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1">
                <Link href={`/roleManagement/addRole?role_id=${roleId}`}>
                  Edit Role
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent> */}
          </DropdownMenu>
          <>
            {row?.original?.name != 'admin' && <Link href={`/roleManagement/addRole?role_id=${roleId}`}>
              <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                <Image src={"/svgs/note.svg"} alt="actions" height={20} width={20} />
              </Button>
            </Link>}

            {row?.original?.name != 'admin' && <Button variant="ghost" className="h-8 w-10 p-0 outline-none" onClick={deleteRolebyId}>
              <Image src={"/svgs/delete-icon.svg"} alt="actions" height={25} width={25} />
            </Button>}

          </>
          <ToastContainer />
        </>
      );
    },
  },
];
