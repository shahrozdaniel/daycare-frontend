"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  openModal: any;
}

export function SubsidyProgramTable<TData, TValue>({
  columns,
  data,
  openModal,
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
      <div className="w-full">
        <div className="text-blue-b1 w-full flex items-center justify-between gap-3">
          <div className="flex items-center md:py-2 lg:py-4">
            <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max">
              Filter By:{" "}
            </span>
            <div className="relative">
              <Input
                placeholder="Subsidy Name"
                value={
                  (table
                    .getColumn("subsidyName")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event: any) =>
                  table
                    .getColumn("parentname")
                    ?.setFilterValue(event.target.value)
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
              <span className="md:text-sm lg:text-md pl-2">
                Add Subsidy Program
              </span>
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
        data={data}
        columns={columns}
        table={table}
        className="border-none"
      />
    </>
  );
}

export default SubsidyProgramTable;
