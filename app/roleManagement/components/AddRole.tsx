"use client";
import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/common/Button";
import RadioInput from "@/components/common/RadioInput";
import CustomInput from "@/components/common/CustomInput";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createRoles,
  roleByid,
  roleList,
  updateRoles,
} from "@/services/authpermission";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DocsTable from "@/app/settings/components/DocsTable";

interface AddRoleProps {
  roleId?: string;
  setSelectedOption?: any;
  setEditId?: any;
  setAdd?: any;
  getRole?: any;
  roleName?: any;
  setRoleName?: any;
}

const AddRole: React.FC<AddRoleProps> = ({
  roleId,
  setSelectedOption,
  setEditId,
  setAdd,
  getRole,
  roleName,
  setRoleName
}) => {

  const [roleData, setRoleData] = useState<any>([]);

  let router = useRouter();
  function adjustString(inputString: any) {
    // Trim leading and trailing spaces
    inputString = inputString.trim();

    // Split the input string by spaces or special characters
    let words = inputString.split(/\s+|[^a-zA-Z0-9]+/);

    // Check if the input contains exactly two words
    if (words.length === 2) {
      // If it contains two words, return the original string
      return inputString?.toLowerCase();
    } else {
      // If it contains only one word, remove any extra spaces and return
      return words.join(" ")?.toLowerCase();
    }
  }
  const getRoleById = async (roleId: string) => {
    let res;
    res = await roleByid(roleId);
    try {
      if (res?.success) {
        const arr: any = [];
        const obj = Object.entries(res.data.permissions).map((item, index) => {
          const [key, value]: any = item;
          arr.push({
            module: key,
            view: value.view,
            option: value.add_edit,
            id: index + 1,
          });
        });
        setRoleData(arr);
        setRoleName(res?.data?.roleName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async () => {
    let permission_data: any = {};
    roleData.map((item: any) => {
      permission_data[item.key || item.module] = {
        view: item.view,
        add_edit: item.option,
      };
    });

    let body = {
      name: adjustString(roleName),
      permissions: permission_data,
    };
    let res;
    try {
      if (roleId) {
        if (roleName) {
          res = await updateRoles(roleId, body);
          if (res?.success) {
            setSelectedOption({ id: roleId });
            setEditId("");
            setRoleName("");
            toast.success(res?.message);
          }
        } else {
          toast.error('Role name is required')
        }
      } else {
        if (roleName) {
          res = await createRoles(body);
        } else {
          toast.error('Please add a role name')
        }
        if (res?.success) {
          setRoleName("");
          setAdd(false);
          setSelectedOption({ id: res.data.roleId });
          toast.success(res?.message);
          await getRole();
        } else {
          toast.error(res);
          console.log(res)
        }
      }
    } catch (error: any) {
      // console.log(error);
      // toast.error(error?.response?.data?.error)
    }
  };

  const addRole = [
    {
      id: 1,
      module: "Dashboard",
      view: false,
      option: false,
      key: "dashboard",
    },
    {
      id: 2,
      module: "Classroom Management",
      view: false,
      option: false,
      key: "classroom_management",
    },
    {
      id: 3,
      module: "Classroom Actions",
      view: false,
      option: false,
      key: "classroom_action",
    },
    {
      id: 4,
      module: "Child Management",
      view: false,
      option: false,
      key: "child_management",
    },
    {
      id: 5,
      module: "Daycare Settings",
      view: false,
      option: false,
      key: "setting",
    },
    {
      id: 6,
      module: "Fees Management",
      view: false,
      option: false,
      key: "fee",
    },
    {
      id: 7,
      module: "User Management",
      view: false,
      option: false,
      key: "user",
    },
    {
      id: 8,
      module: "Planning and Forecasting",
      view: false,
      option: false,
      key: "planing_forecasting",
    },
    {
      id: 9,
      module: "Reports Management",
      view: false,
      option: false,
      key: "report_management",
    },
    {
      id: 10,
      module: "Subscription Management",
      view: false,
      option: false,
      key: "subscription",
    },
    {
      id: 11,
      module: "Compliance Management",
      view: false,
      option: false,
      key: "compliance",
    },
    {
      id: 12,
      module: "Notification Management",
      view: false,
      option: false,
      key: "notification_management",
    },
  ];
  useEffect(() => {
    if (roleId) {
      getRoleById(roleId);
    } else {
      setRoleData(addRole);
    }
  }, [roleId]);

  const handleView = (event: any, id: string) => {
    console.log(event.target.checked);

    const data = roleData.map((obj: any) => {
      if (obj.id === id) {
        return { ...obj, view: event.target.checked };
      }
      return obj;
    });
    setRoleData(data);
  };

  const handleEditClick = (event: any, id: string) => {
    const data = roleData.map((obj: any) => {
      if (obj.id === id) {
        return { ...obj, option: event.target.checked, view: event.target.checked };
      }
      return obj;
    });
    setRoleData(data);
  };

  const column = [
    {
      accessorKey: "module",
      // header: "Module",
      header: () => {
        return (
          <div className="text-left pl-6">Module</div>
        )
      },
      cell: ({ row }: { row: any }) => {
        const doc = row.original;
        return (
          <>
            <p className="text-left pl-8">{doc.module}</p>
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
              name={row.original.module}
              className="w-4 h-4"
              defaultChecked={doc.view}
              onChange={(event) => handleView(event, row.original.id)}
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
        const uniquekey = `${doc.module}${doc.id}`;
        return (
          <>
            <input
              type="checkbox"
              name={uniquekey}
              className="w-4 h-4"
              defaultChecked={doc.option}
              onChange={(event) => handleEditClick(event, row.original.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="w-11/12 mx-auto py-10">
        <div className=" flex items-center gap-5 mx-10 mt-6">
          <p className="text-[16px] text-[#4b4b4b] font-medium">Role :</p>
          <div className="w-5/12">
            {" "}
            <CustomInput
              type="text"
              name=""
              placeholder="Role Name"
              onChange={(e: any) => setRoleName(e?.target?.value)}
              value={roleName}
              required
            />
          </div>
        </div>
        <div className="flex flex-col mx-10 my-5">
          <div className="my-5 text-[16px] text-[#4b4b4b] font-medium">
            Permissions
          </div>
          <div className="">
            <DocsTable
              columns={column}
              data={roleData}
              headerClassName="bg-[#F7F7F7] border-[#F7F7F7] text-[#606060] font-normal text-[16px]"
            />
          </div>

          <div className="flex gap-4 justify-end w-full mt-14">
            <Button
              type="button"
              form="white"
              className="w-28"
              onClick={() => {
                setEditId("");
                setAdd(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              form="blue"
              className="w-28"
              onClick={submitForm}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddRole;