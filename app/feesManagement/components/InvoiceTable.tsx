"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/data-table";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Image from "next/image";
import Modal from "@/components/common/Modal/Modal";
import { useForm } from "react-hook-form";
import AddDiscount from "../ModalComponent/AddDiscount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FormModal from "@/components/common/FormModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddDiscountValidationSchema } from "../ModalComponent/validationSchema";
import {
  createDiscount,
  getDiscountList,
} from "@/services/discountManagementServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleUnauthorizedError } from "@/utils/utilityFunctions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import moment from "moment";

interface DiscountTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  openModal: any;
  classroomData: any;
}

export function InvoiceTable<TData, TValue>({
  columns,
  data,
  openModal,
  classroomData,
}: DiscountTableProps<TData, TValue>) {
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

  return (
    <>
      <div className="w-full">
        {/* <div className="text-blue-b1 w-full flex items-center justify-between gap-3">
          <div className="flex items-center md:py-2 lg:py-4">
            <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max">
              Filter By:{" "}
            </span>
            <Select
              defaultValue={
                (table.getColumn("discountType")?.getFilterValue() as string) ??
                ""
              }
              onValueChange={(value) =>
                table.getColumn("discountType")?.setFilterValue(value)
              }
            >
              <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
                <SelectValue placeholder="Discount Type" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
            <Button
              variant="ghost"
              className="outline-none"
              onClick={() => openModal()}
            >
              <Image
                src={"/images/Plus.png"}
                alt="plus"
                width={15}
                height={15}
              />
              <span className="md:text-sm lg:text-md pl-2">Add Invoice</span>
            </Button>
            <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
              <Image
                src={"/images/export.png"}
                alt="export"
                width={15}
                height={15}
              />
              <span className="md:text-sm lg:text-md">Export</span>
            </div>
          </div>
        </div> */}
        <div className="text-blue-b1 w-full flex items-center justify-between gap-3">
          <div className="flex items-center md:py-2 lg:py-4">
            <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max ">
              Filter By:{" "}
            </span>
            {/* <Select
              defaultValue={
                (table.getColumn("classroom")?.getFilterValue() as string) ?? ""
              }
              onValueChange={(value) =>
                table.getColumn("classroom")?.setFilterValue(value)
              }
            >
              <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
                <SelectValue placeholder="Classroom" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {classroomData?.map((item: any, index: number) => {
                  return (
                    <SelectItem value={item.id} key={index}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select> */}
            <select
              className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1 p-2"
              // defaultValue={
              //   (table.getColumn("status")?.getFilterValue() as string) ?? ""
              // }
              onChange={(e) => {
                console.log("filter val", e.target.value);
                table.getColumn("classroom")?.setFilterValue(e.target.value);
              }}
            >
              <option value="">Select Classroom</option>
              {classroomData?.map((item: any, index: number) => {
                return (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <div className="relative">
              <Input
                placeholder="Invoice Date"
                // value={
                //   (table
                //     .getColumn("invoiceDate")
                //     ?.getFilterValue() as string) ?? ""
                // }
                onChange={(e) =>
                  table
                    .getColumn("invoiceDate")
                    ?.setFilterValue(
                      moment(e.target.value).format("MM/DD/YYYY")
                    )
                }
                type="date"
                className="w-[300px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
              />
              {/* <Image
              src={"/images/search.png"}
              alt="search"
              width="15"
              height="15"
              className="absolute top-3 right-2"
            /> */}
            </div>
            <select
              className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1 p-2"
              // defaultValue={
              //   (table.getColumn("status")?.getFilterValue() as string) ?? ""
              // }
              onChange={(e) => {
                table.getColumn("status")?.setFilterValue(e.target.value);
              }}
            >
              <option value="">Select Status</option>
              <option value={0}>Due</option>
              <option value={1}>Paid</option>
            </select>
          </div>
          <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
            <Button
              variant="ghost"
              className="outline-none"
              onClick={() => openModal()}
            >
              <Image
                src={"/images/Plus.png"}
                alt="plus"
                width={15}
                height={15}
              />
              <span className="md:text-sm lg:text-md pl-2">Add Invoice</span>
            </Button>
            <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
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
      </div>
      <DataTable
        pagination={true}
        data={data}
        columns={columns}
        table={table}
        className="border-none"
      />

      <ToastContainer />
    </>
  );
}

export default InvoiceTable;
