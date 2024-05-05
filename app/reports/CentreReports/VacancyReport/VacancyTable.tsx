"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/common/data-table";
import Modal from "@/components/common/Modal/Modal";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { handleExport } from "@/utils/utilityFunctions";

interface VacancyTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  exportData: TData[];
}

export function VacancyTable<TData, TValue>({
  columns,
  data,
  exportData,
}: VacancyTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());
  const [childName, setChildName] = useState<string>("");
  const [classRoom, setClassRoom] = useState<string>("");

  const isDateInCurrentMonth = (dateString: string) => {
    if (dateString !== "-") {
      const parts = dateString.split("/");
      const month = parseInt(parts[0], 10);
      if (month && +selectedMonth === month) {
        return true;
      }
    }
    return false;
  };

  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      return (
        isDateInCurrentMonth(item?.date) &&
        item?.childname?.toLowerCase().includes(childName.toLowerCase()) &&
        item?.classroom?.toLowerCase().includes(classRoom.toLowerCase())
      );
    });
  }, [data, childName, classRoom, selectedMonth]);

  const table = useReactTable({
    data: filteredData,
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
          <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max ">
            Filter By:{" "}
          </span>
          <div className="relative">
            <Input
              placeholder="Child Name"
              value={childName}
              onChange={(event) => setChildName(event.target.value)}
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
              placeholder="Classroom"
              value={classRoom}
              onChange={(event) => {
                setClassRoom(event.target.value);
                table
                  .getColumn("classroom")
                  ?.setFilterValue(event.target.value);
              }}
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
            defaultValue={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
              <SelectValue placeholder="Classroom" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex items-center">
            <Input
              type="date"
              placeholder="Graduation Date : "
              value={
                (table
                  .getColumn("date")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("date")
                  ?.setFilterValue(event.target.value)
              }
              className="md:w-[160px] lg:w-[300px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
            />
          </div>
        </div>
        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
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
        data={filteredData}
        columns={columns}
        table={table}
        className="border-2 border-[#00858E] rounded-xl font-[DM Sans]"
        headerClassName="bg-[#EEFCFC] text-[#000000] text-[16px] font-medium font-sans leading-6"
        cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center capitalize py-2 h-[60px] px-2"
      />
    </>
  );
}

export default VacancyTable;