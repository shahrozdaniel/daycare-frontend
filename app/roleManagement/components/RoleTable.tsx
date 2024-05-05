"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
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

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UserTable<TData, TValue>({
  columns,
  data,
}: UserTableProps<TData, TValue>) {
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
      <div className="flex md:flex-col lg:flex-row justify-between">
        <div className="flex items-center md:py-2 lg:py-4">
          {/* <span className="text-grey-placeholder md:text-sm lg:text-xl md:w-20 lg:w-max">Filter By: </span> */}
          {/* <Select
            defaultValue={
              (table.getColumn("roleName")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table.getColumn("roleName")?.setFilterValue(value)
            }
          >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="Role 1">Role 1</SelectItem>
              <SelectItem value="Role 2">Role 2</SelectItem>
              <SelectItem value="Role 3">Role 3</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
          <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
            <Link href={"/roleManagement/manageRole"}>
              <span className="text-sm ">Assign Role</span>
            </Link>
          </div>
          <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
            <Image src={"/images/Plus.png"} alt="plus" width={15} height={15} />
            <Link href={"/roleManagement/addRole"}>
              <span className="text-sm rounded-sm border-blue-b1">
                Add Role
              </span>
            </Link>
          </div>

          <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
            <Image
              src={"/images/export.png"}
              alt="export"
              width={15}
              height={15}
            />
            <span className="text-sm">Export</span>
          </div>
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        table={table}
        className="border-2 border-[#00858E] rounded-xl font-[DM Sans]"
        headerClassName="bg-[#EEFCFC] text-[#000000] text-[16px] font-medium font-sans leading-6"
        cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center capitalize py-2 h-[60px] px-2"
      />
    </>
  );
}

export default UserTable;
