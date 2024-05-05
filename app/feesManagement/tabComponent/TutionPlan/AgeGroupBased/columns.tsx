import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UpdateFeePlan } from "@/services/feeManagement";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

export type User = {
  id: string;
  planName: string;
  ageRange: string;
  amountDetails: string;
  status: string;
  action: string;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "planName",
    header: "Plan Name",
  },
  {
    accessorKey: "ageRange",
    header: "Age Range",
    cell: ({ row }) => {
      return (
        <div className="flex  items-center gap-2">
          <p className="">{row?.original?.minAge} - {row?.original?.maxAge}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "amountDetails",
    header: "Amount Details",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex  items-center gap-2">
          <Image
            src={row?.original?.status == 1 ? "/svgs/active-icon.svg" : "/svgs/due-icon.svg"}
            alt="user"
            width={16}
            height={16}
          />
          <p className="">{row?.original?.status == 1 ? "Active" : "Inactive"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const reloadTable = row?.original?.reloadtable
      const totalData = row?.original?.totalData
      const setEditData = row?.original?.setEditDta
      const modalOpen = row?.original?.modalOpen
      const helperModalOpen = row?.original?.helperModalOpen

      const handleStaus = async (status: number) => {
        let body = {
          status: status,
          planType: 4
        }
        let res;
        try {
          res = await UpdateFeePlan(totalData?.id, body)
          if (res?.success) {
            toast.success(res?.data)
            reloadTable()
          } else {
            toast?.error(res?.error)
          }
        } catch (err) {
          console.log(err)
        }
      }
      const hadnleEdit = () => {
        modalOpen(true)
        helperModalOpen(true)
        setEditData(totalData)

      }
      return (
        <div className="flex align-items-center gap-2">
          <div className="flex">
            <Image src={"/svgs/note.svg"} alt="actions" height={20} width={20} onClick={hadnleEdit} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-10 p-0 outline-none">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-6 w-4 ml-2 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {row?.original?.status == 2 && <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1" onClick={() => handleStaus(1)}>
                  Active
                </DropdownMenuItem>}
                {row?.original?.status == 1 && <DropdownMenuItem className="hover:bg-blue-b2 text-blue-b1 hover:text-blue-b1" onClick={() => handleStaus(2)}>
                  Inactive
                </DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
            <ToastContainer />
          </div>
        </div>
      );
    },
  },
];
