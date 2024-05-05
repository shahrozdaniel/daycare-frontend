"use client";

import { ReactNode, useState } from "react";
import { DataTable } from "@/components/common/data-table";
import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Plus } from "lucide-react";
import Modal from "@/components/common/Modal/Modal";
import SendNotification from "./SendNotification";
import { useForm } from "react-hook-form";
import EditEmailTemplate from "./EditEmailTemplate";
import { Input } from "@/components/ui/input";

interface EmailTemplateTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isEdit?: any;
  editData?: any;
  setisEdit?: any;
  emailtemplateList?: any
}

export function EmailTemplateTable<TData, TValue>({
  columns,
  data,
  isEdit,
  editData,
  setisEdit,
  emailtemplateList
}: EmailTemplateTableProps<TData, TValue>) {
  const { control, handleSubmit } = useForm<FormData>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [date, setDate] = useState<Date>();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState(false);

  const openModal = (modalValue: string) => {
    if (modalValue === "NotificationModal") {
      setNotification(true);
    }
    setModalOpen(true);
  };

  const closeModal = (modalValue: string) => {
    if (modalValue === "NotificationModal") {
      setNotification(false);
    }
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex md:flex-col lg:flex-row justify-between">
        <div className="flex items-center md:py-2 lg:py-4">
             <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max ">
            Filter By:{" "}
          </span>
          <div className="relative">
            <Input
              placeholder="Email Template Name"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="md:w-[160px] lg:w-[180px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
            />
            <Image
              src={"/images/search.png"}
              alt="search"
              width="15"
              height="15"
              className="absolute top-3 right-2"
            />
          </div>
        </div>
        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3" >
          {<span className="md:text-sm lg:text-md pl-2 cursor-pointer" onClick={() => openModal("Open")}>
          <div className="flex items-center gap-2"> <Plus size={16}/> <span className="text-sm font-sans flex items-center">Email Template</span></div>

          </span>}

          {/* <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
            <Image
              src={"/images/export.png"}
              alt="export"
              width={15}
              height={15}
            />
            <span className="md:text-sm lg:text-xl">Export</span>
          </div> */}
        </div>
      </div>
       <DataTable data={data} columns={columns} table={table}  className="border border-[#00858E] rounded-xl font-[DM Sans]"
        headerClassName="bg-[#EEFCFC] text-[#000000] text-[16px] font-medium font-sans leading-6"
        cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center capitalize py-2 h-[60px] px-2" />
      {modalOpen && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"NotificationModal"}
          >
            <EditEmailTemplate closeModal={closeModal} emailtemplateList={emailtemplateList} />
          </Modal>
        </div>
      )}
      {isEdit && (
        <div>
          <Modal
            modalOpen={isEdit}
          >
            <EditEmailTemplate closeModal={() => setisEdit(false)} editData={editData} isEdit={isEdit} emailtemplateList={emailtemplateList} />
          </Modal>
        </div>
      )}
    </>
  );
}

export default EmailTemplateTable;
