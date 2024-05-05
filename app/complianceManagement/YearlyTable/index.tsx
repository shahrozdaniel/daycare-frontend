"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/data-table";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
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

interface YearlyTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function YearlyTable<TData, TValue>({
  columns,
  data,
}: YearlyTableProps<TData, TValue>) {
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
      {/* Filtering------------------------------------------------------------------------ */}
      <div className="flex md:flex-col lg:flex-row justify-between">
        <div className="flex items-center md:py-2 lg:py-4">
            <span className="text-grey-placeholder md:text-sm lg:text-xl md:w-20 lg:w-max">Filter By: </span>
            <Select
            defaultValue={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
                table.getColumn("name")?.setFilterValue(value)
            }
            >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
                <SelectValue placeholder="Compliance" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
                <SelectItem value="Toddler">Toddler</SelectItem>
                <SelectItem value="Infant">Infant</SelectItem>
                <SelectItem value="K.G.">K.G.</SelectItem>
                <SelectItem value="Pre-school">Pre-school</SelectItem>
            </SelectContent>
            </Select>
            <Select
            defaultValue={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
                table.getColumn("name")?.setFilterValue(value)
            }
            >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
                <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
                <SelectItem value="Toddler">Toddler</SelectItem>
                <SelectItem value="Infant">Infant</SelectItem>
                <SelectItem value="K.G.">K.G.</SelectItem>
                <SelectItem value="Pre-school">Pre-school</SelectItem>
            </SelectContent>
            </Select>
            
        </div>
        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
            <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-1 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
            <Image src={"/images/export.png"} alt="export" width={15} height={15}/>
            <span className="md:text-sm lg:text-xl">Export</span>
            </div>
        </div>
      </div>
      <DataTable data={data} columns={columns} table={table}/>
    </>
  );
}

export default YearlyTable;
