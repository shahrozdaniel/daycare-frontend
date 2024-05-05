"use client";

import { useState } from "react";
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

interface ImmunisationTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedOption?: any;
  selectedReport?: any;
}

export function ImmunisationTable<TData, TValue>({
  columns,
  data,
  selectedOption,
  selectedReport
}: ImmunisationTableProps<TData, TValue>) {
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

  console.log('selectedOption', selectedOption, 'selectedReport', selectedReport)
  return (
    <>
      {/* Filtering------------------------------------------------------------------------ */}
      <div className="flex md:flex-col lg:flex-row justify-between">
        <div className="flex items-center md:py-2 lg:py-4">
        <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max ">
            Filter By:{" "}
          </span>
          {selectedOption === 'Child Reports' && selectedReport === 'Immunization Reports' && <>
            <div className="relative">
              <Input
                placeholder="Child Name"
                value={
                  (table.getColumn("childName")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("childName")?.setFilterValue(event.target.value)
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
                placeholder="Associated Class"
                value={
                  (table.getColumn("associatedClass")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("associatedClass")?.setFilterValue(event.target.value)
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
                placeholder="Age Range"
                value={
                  (table.getColumn("ageRange")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("ageRange")?.setFilterValue(event.target.value)
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
                type="Date"
                placeholder=""
                value={
                  (table.getColumn("lastImmunisation")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("lastImmunisation")?.setFilterValue(event.target.value)
                }
                className="md:w-[160px] lg:w-[180px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
              />
            </div>
          </>}
 
        </div>
        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
        <div
            className="border-[1px] cursor-pointer flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1"
            // onClick={() => handleExport(exportData)}
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
      <DataTable data={data} columns={columns} table={table} className="border-2 border-[#00858E] rounded-xl font-[DM Sans]"
        headerClassName="bg-[#EEFCFC] text-[#000000] text-[16px] font-medium font-sans leading-6"
        cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center capitalize py-2 h-[60px] px-2" />
    </>
  );
}

export default ImmunisationTable;
