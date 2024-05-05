"use client";

import { ReactNode, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerComponent } from "@/components/ui/datePicker";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface childManagementTable<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ChildManagementTable<TData, TValue>({
  columns,
  data,
}: childManagementTable<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [date, setDate] = useState<Date>();
  let router = useRouter();
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
    <div className="px-10">
      {/* Filtering------------------------------------------------------------------------ */}
      <div className="flex md:flex-col lg:flex-row justify-between text-base font-normal font-sans">
        <div className="flex items-center md:py-2 lg:py-4">
          <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max ">
            Filter By:{" "}
          </span>
          <Select
            defaultValue={
              (table.getColumn("Classroom")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table.getColumn("Classroom")?.setFilterValue(value)
            }
          >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
              <SelectValue placeholder="Classroom" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="Toddler">Toddler</SelectItem>
              <SelectItem value="Infant">Infant</SelectItem>
              <SelectItem value="K.G.">K.G.</SelectItem>
              <SelectItem value="Pre-school">Pre-school</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Input
              placeholder="Parent Name"
              value={
                (table.getColumn("ParentName")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("ParentName")
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

          <div className="relative">
            <Input
              placeholder="Child Name"
              value={
                (table.getColumn("ChildName")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("ChildName")?.setFilterValue(event.target.value)
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
          <Select
            defaultValue={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table.getColumn("status")?.setFilterValue(value)
            }
          >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          {/* DatePicker---------------------------------------------------------------------- */}
          {/* <Popover>
            <PopoverTrigger
              asChild
              className="rounded-none ml-2 text-grey-placeholder bg-grey-border1 border-grey-border1"
            >
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !date && "text-muted-foreground rounded-none ml-2"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-none">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover> */}
        </div>
        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
          <Button
            variant="ghost"
            className="outline-none"
            onClick={() => router.push("/childRegistration")}
          >
            <span className="md:text-sm lg:text-md pl-2">+ Add Child</span>
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
      <DataTable
        data={data}
        columns={columns}
        table={table}
        className="border-2 border-[#4767B8] rounded-xl font-[DM Sans]"
      />
    </div>
  );
}

export default ChildManagementTable;