"use client";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
interface educatorManagementTable<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reloadTable?: any;
}

export function EducatorManagementTable<TData, TValue>({
  columns,
  data,
  reloadTable,
}: educatorManagementTable<TData, TValue>) {
  let router = useRouter();
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
  console.log("filterr", table.getColumn("educatorName")?.getFilterValue());
  return (
    <>
      {/* Filtering------------------------------------------------------------------------ */}
      <div className="flex md:flex-col lg:flex-row justify-between">
        {/* <div className="flex items-center md:py-2 lg:py-4">
          <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max">
            Filter By:{" "}
          </span>
          <Select
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
                (table.getColumn("parentname")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
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

          <div className="relative">
            <Input
              placeholder="Child Name"
              value={
                (table.getColumn("childname")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("childname")?.setFilterValue(event.target.value)
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
              (table.getColumn("name")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table.getColumn("name")?.setFilterValue(value)
            }
          >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="status1">Status1</SelectItem>
              <SelectItem value="status2">Status2</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        <div className="flex items-center md:py-2 lg:py-4">
          {/* <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max ">
            Filter By:{" "}
          </span> */}
          {/* <Select
            defaultValue={
              (table.getColumn("name")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table.getColumn("name")?.setFilterValue(value)
            }
          >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
              <SelectValue placeholder="Sent to" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="All">All</SelectItem>
            </SelectContent>
          </Select> */}
          {/* Date Picker */}
          {/* <div className="relative">
            <Input
              placeholder="Educator Name"
              value={
                (table.getColumn("educatorName")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) => {
                console.log("educator table", table.getColumn("educatorName"));
                table.getColumn("educatorName") &&
                  table
                    .getColumn("educatorName")
                    ?.setFilterValue(event.target.value);
              }}
              className="w-[180px] rounded-none ml-2 border-grey-border1 bg-grey-border1 text-grey-placeholder placeholder:text-grey-placeholder"
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
              (table.getColumn("classroomType")?.getFilterValue() as string) ??
              ""
            }
            onValueChange={(value) =>
              table.getColumn("classroomType")?.setFilterValue(value)
            }
          >
            <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
              <SelectValue placeholder="Classroom Type" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
             
            </SelectContent>
          </Select> */}
        </div>
        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
          <Button
            variant="ghost"
            className="outline-none"
            onClick={() => router.push("/daycareManagement/educatorProfile")}
          >
            <Image src={"/images/Plus.png"} alt="plus" width={15} height={15} />
            <span className="md:text-sm lg:text-md pl-2">Add Educator</span>
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
        reloadTable={reloadTable}
        className="border-2 border-[#00858E] rounded-xl font-[DM Sans]"
        headerClassName="bg-[#EEFCFC] text-[#000000] text-[16px] font-medium font-sans leading-6"
        cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center capitalize py-2 h-[80px] px-2"
      />
    </>
  );
}

export default EducatorManagementTable;
