import DocsTable from "@/app/settings/components/DocsTable";
import { ConfirmationModal } from "@/components/common/Modal/ConfirmationModal";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { deleteRole, roleByid } from "@/services/authpermission";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ViewComponent: React.FC<{
  id: string;
  setEditId: any;
  reloadTable: any;
  setAdd: any;
}> = ({ id, setEditId, reloadTable, setAdd }) => {
  const [data, setData] = useState<any>([]);
  const [role, setRole] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>();
  const [deleteId, setDeleteId] = useState<string>("");

  const getRoleById = async (id: any) => {
    let res;
    res = await roleByid(id);
    try {
      if (res?.success) {
        const arr: any = [];
        const obj = Object.entries(res.data.permissions).map((item) => {
          const [key, value]: any = item;
          arr.push({ module: key, view: value.view, option: value.add_edit });
        });
        setRole(res.data.roleName);
        setData(arr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoleById(id);
  }, [id]);

  const column = [
    {
      accessorKey: "module",
      // header: "Modules",
      header: () => {
        return <div className="text-left pl-6">Module</div>;
      },
      cell: ({ row }: { row: any }) => {
        const doc = row.original;
        return (
          <>
            <p className="capitalize text-left pl-8">{doc?.module?.split('_')?.join(' ')}</p>
          </>
        );
      },
    },
    {
      accessorKey: "view",
      header: "View",
      cell: ({ row }: { row: any }) => {
        const doc = row.original;
        return (
          <>
            <input
              type="checkbox"
              className="w-4 h-4"
              disabled
              checked={doc.view}
            />
          </>
        );
      },
    },
    {
      accessorKey: "option",
      header: "Add/Edit/Delete",
      cell: ({ row }: { row: any }) => {
        const doc = row.original;
        return (
          <>
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={doc.option}
              disabled
            />
          </>
        );
      },
    },
  ];

  const deleterole = (id: string) => {
    setIsOpen(true);
    setDeleteId(id);
  };
  const hadnleClick = async () => {
    let res: any;
    try {
      res = await deleteRole(deleteId);
      if (res?.success) {
        toast.success(res?.message);
        reloadTable();
        setIsOpen(false);
        setAdd(true);
      } else {
        toast?.error(res);
      }
    } catch (error: any) {
      // toast.error(error?.response?.data?.error)
    }
  };
  console.log(role, role !== "admin");
  return (
    <div className="w-3/4 mx-auto py-10 mt-6">
      <div className="flex flex-row items-center gap-2 text-[16px]">
        <p>Role : </p>
        <p className="capitalize text-[#4b4b4b] font-medium">{role}</p>
      </div>
      <div>
        <div className="flex justify-between items-center my-5">
          <p className="capitalize text-[#4b4b4b] text-[16px] font-medium">
            Permissions
          </p>
          {role !== 'admin' && <div>
            <Button
              type="button"
              form="blue"
              onClick={() => setEditId(id)}
              className="px-10 py-2 border border-blue-b1 text-blue-b1"
              variant={"outline"}
              disabled={role === ("educator" || 'admin') ? true : false}
            >
              Edit
            </Button>
            <Button
              type="button"
              form="blue"
              onClick={() => deleterole(id)}
              className="px-10 py-2 border border-blue-b1 text-blue-b1 mx-2"
              variant={"outline"}
            >
              Delete
            </Button>
          </div>}
        </div>
        <DocsTable
          columns={column}
          data={data}
          headerClassName="bg-[#F7F7F7] border-[#F7F7F7] text-[#606060] font-normal text-[16px]"
        />
        {isOpen && (
          <ConfirmationModal
            title={"Delete Role"}
            content={"Are you sure you want to delete the role?"}
            modalOpen={isOpen}
            handleConfirm={hadnleClick}
            closeModal={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
export default ViewComponent;
