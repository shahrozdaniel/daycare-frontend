"use client";
import { DataTable } from "@/components/common/data-table";
import Button from "@/components/common/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EyeIcon, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
import {
  Date_time_conversion,
  formatDateWithUTC,
  handleExport,
} from "@/utils/utilityFunctions";
import {
  DeleteHoliday,
  UpdateHolidayList,
  dayCareSettingHolidayList,
} from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@/components/common/Modal/Modal";
import AddHoliday from "./components/AddHoliday";
import { addHolidayList } from "@/services/dayCareSetting";
import moment from "moment";
import { ConfirmationModal } from "@/components/common/Modal/ConfirmationModal";

const HolidaySetting = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;
  const [data, setData] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [exportData, setExportData] = useState<any>([]);
  const [editData, setEditData] = useState<any>({});
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any>();
  const holidayDetails = async () => {
    let res;
    try {
      res = await dayCareSettingHolidayList();
      if (res?.success) {
        let tableData: any = [];
        res.data.map((item: any, index: any) => {
          console?.log(item?.dates?.dates?.toString());
          data.push({
            ID: item.id,
            DaycareId: item.daycare_id,
            Name: item?.name,
            Type: item?.type,
            // Date:
            //   item?.dates &&
            //   item.dates.dates?.length > 0 &&
            //   (item?.dates?.dates?.length === 1
            //     ? Date_time_conversion(item.dates?.dates[0])
            //     : `${Date_time_conversion(
            //       item.dates?.dates[0]
            //     )} to ${Date_time_conversion(item.dates?.dates[1])}`),
            Date: item?.dates?.dates?.toString(),
          });
          tableData.push({
            ...item,
            setModalOpen: setModalOpen,
            setEditData: setEditData,
          });
        });
        setData(tableData);
        setExportData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    holidayDetails();
  }, []);

  const hadnleClick = async () => {
    const response = await DeleteHoliday(deleteData);
    if (response?.success) {
      toast.success(response?.message);
      await holidayDetails();
      setIsDelete(false);
    }
  };
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "Name",
      header: () => {
        return <div className="text-left pl-3">Name</div>;
      },
      cell: ({ row }) => {
        return <div className="text-left pl-5">{row?.original?.name}</div>;
      },
    },
    {
      accessorKey: "Date",
      header: () => {
        return <div className="text-left pl-3">Date(s)</div>;
      },
      cell: ({ row }) => {
        return row.original.dates?.dates?.length > 0 ? (
          <div className="text-left pl-5">
            {row.original.dates?.dates?.length === 1
              ? formatDateWithUTC(row.original.dates?.dates[0])
              : `${formatDateWithUTC(
                  row.original.dates?.dates[0]
                )} to ${formatDateWithUTC(row.original.dates?.dates[1])}`}
          </div>
        ) : null;
      },
    },

    {
      accessorKey: "Type",
      header: () => {
        return <div className="text-left pl-3">Type</div>;
      },
      cell: ({ row }) => {
        return <div className="text-left pl-5">{row?.original?.type}</div>;
      },
    },
    {
      id: "actions",
      header: () => {
        return (IsAdmin || userPermission?.setting?.add_edit)&&<div className="text-left pl-3 mx-4">Action</div>;
      },
      cell: ({ row }) => {
        const data = row.original;
        const handleEdit = () => {
          data.setEditData(data);
          data.setModalOpen(true);
        };

        const handleDelete = async () => {
          setIsDelete(true);
          setDeleteData(data.id);
        };

        return (
          <>
            {(IsAdmin || userPermission?.setting?.add_edit)?<div className="flex items-center gap-3 justify-start pl-5 mx-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    src={"/svgs/note.svg"}
                    alt="actions"
                    height={20}
                    width={20}
                    onClick={handleEdit}
                    className="cursor-pointer"
                  />
                </DropdownMenuTrigger>
              </DropdownMenu>
              <Trash2
                className="text-grey-g1 cursor-pointer"
                onClick={handleDelete}
              />
            </div>:null}
            <ToastContainer />
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const openModal = (modalValue: string) => {
    setModalOpen(true);
  };

  const closeModal = (modalValue: string) => {
    setModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
    let response;
    if (Object.keys(editData).length > 0) {
      //edit API
      response = await UpdateHolidayList(data, editData.id);
      setEditData({});
    } else {
      //add API
      response = await addHolidayList(data);
    }
    if (response?.success) {
      toast.success(response?.message);
      await holidayDetails();
    }
  };
  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">Holiday List</h1>
      <hr /> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Holiday List
          </h1>
        </div>
      </div>

      <div className="w-4/5 mx-auto mt-6">
        <div className="flex justify-between">
          <p>Holidays List:</p>

          <div className="flex text-blue-b1 cursor-pointer gap-4 items-center">
            {(IsAdmin || userPermission?.setting?.add_edit)&&<div
              className="flex justify-end items-center hover:border p-2 rounded-md hover:border-blue-b1"
              onClick={() => openModal("Open")}
            >
              <Plus className="text-blue-b1" size={17} />
              <span className="text-sm">Add Holiday</span>
            </div>}

            <div
              className="border-[1px] cursor-pointer flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1"
              onClick={() => handleExport(exportData)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={"/images/export.png"}
                alt="export"
                width={15}
                height={15}
              />
              <span className="md:text-sm lg:text-md">Export</span>
            </div>
          </div>
        </div>
        <DataTable
          data={data}
          columns={columns}
          table={table}
          pagination={false}
          className="border border-[#00858E] rounded-xl font-[DM Sans]"
          headerClassName="bg-[#EEFCFC] text-[#000000] text-[16px] font-medium font-sans leading-6"
          cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center  py-2 h-[60px] px-2"
        />
      </div>

      {modalOpen && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"AddDocument"}
          >
            <AddHoliday
              closeModal={closeModal}
              submitFormDocs={handleSubmit}
              setEdit={editData}
            />
          </Modal>
        </div>
      )}
      <ToastContainer />
      {isDelete && (
        <ConfirmationModal
          title={"Holiday"}
          content={"Are you sure you want to delete?"}
          modalOpen={isDelete}
          handleConfirm={hadnleClick}
          closeModal={() => setIsDelete(false)}
        />
      )}
    </>
  );
};

export default HolidaySetting;
