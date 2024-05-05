"use client";

import { ReactNode, useState } from "react";
import { DataTable } from "@/components/common/data-table";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
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
import { checkHasPermission } from "@/utils/permission";
import { CSVLink, CSVDownload } from "react-csv";
import { handleExport } from "@/utils/utilityFunctions";
import { useGlobalContext } from "@/app/context/store";

interface childManagementTable<TData, TValue> {
  columns: any;
  data: any;
  exportData?: any;
  showStatus?: boolean;
}

export function ChildManagementTable<TData, TValue>({
  columns,
  data,
  exportData,
  showStatus
}: childManagementTable<TData, TValue>) {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;
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
          {showStatus && <Select
            defaultValue={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) => {
              console.log("value", value);
              if (value === "status") {
                table.getColumn("status")?.setFilterValue("");
              } else {
                table.getColumn("status")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="status">Select Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>}
        </div>
        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
          {(IsAdmin || userPermission?.child_management?.add_edit) && (
            <Button
              variant="ghost"
              className="outline-none"
              onClick={() => router.push("/childRegistration")}
            >
              <div className="flex items-center">
                {" "}
                <Plus size={18} />{" "}
                <span className="pl-2 flex items-center text-sm">
                  {" "}
                  Add Child
                </span>
              </div>
            </Button>
          )}
          <Button
            onClick={() => router.push("/journal")}
            className="bg-blue-b1 hover:bg-[white] hover:text-blue-b1 hover:border border-blue-b1"
          >
            {<span className="text-sm">Journal</span>}
          </Button>
          <Button
            onClick={() => router.push("/vacancyBoard")}
            className="bg-blue-b1 hover:bg-[white] hover:text-blue-b1 hover:border border-blue-b1"
          >
            {<span className="text-sm">Vacancy Board</span>}
          </Button>
          <div
            className="border-[1px] cursor-pointer flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1"
            onClick={() => handleExport(exportData)}
          >
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
        className="border border-[#00858e] rounded-xl font-[DM Sans]"
        headerClassName="text-[#4b4b4b] bg-[#EEFCFC]  text-base  font-sans text-muted-foreground font-medium"
        cellClassName="h-[80px] text-center"
      />
    </div>
  );
}

export default ChildManagementTable;
