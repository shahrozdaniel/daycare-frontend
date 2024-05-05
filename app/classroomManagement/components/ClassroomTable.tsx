"use client";

import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/common/data-table";
import { Input } from "@/components/ui/input";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { classroomlist } from "../classroomManagentAPI";
import { useRouter } from "next/navigation";
import { classroomCategory } from "@/app/register/components/api/RegisterApi";
// import { register } from "module";

interface ClassroomTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagestate?: any;
  setPageState?: any;
}

export function ClassroomTable<TData, TValue>({
  columns,
  data,
  pagestate,
  setPageState,
}: ClassroomTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [classroomData, setclassroomData] = useState<any>([]);
  const [pagination, setPgination] = useState<object>({});
  const [classroomcategory, setClassroomCategory] = useState([]);
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

  const getClassroomCategory = async () => {
    let res;
    try {
      res = await classroomCategory();
      console.log("res", res);
      if (res?.data.success) {
        // console.log(res);
        setClassroomCategory(res.data.data);
      } else {
        // console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClassroomCategory();
  }, []);

  return (
    <>
      <div className="flex md:flex-col lg:flex-row justify-between">
        <div className="flex items-center md:py-2 lg:py-4">
          <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max ">
            Filter By:{" "}
          </span>
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
          <div className="relative">
            <Input
              placeholder="Classroom Name"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
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
          <select
            className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1 p-2"
            // defaultValue={
            //   (table.getColumn("status")?.getFilterValue() as string) ?? ""
            // }
            onChange={(e) => {
              table.getColumn("status")?.setFilterValue(e.target.value);
            }}
          >
            {/* <SelectTrigger className="md:w-[160px] lg:w-[180px] ml-2 bg-grey-border1 rounded-none outline-none text-grey-placeholder border-[1px] border-[solid] border-grey-border1">
              <SelectValue placeholder="Status" />
            </SelectTrigger> */}
            {/* <SelectContent className="rounded-none"> */}
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            {/* </SelectContent> */}
          </select>
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
              {classroomcategory?.map((item: any, index) => {
                return (
                  <SelectItem value={item.classroomCategoryName} key={index}>
                    {item.classroomCategoryName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
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
                {date ? format(date, "PPP") : <span>Date</span>}
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
        {/* <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
          <Link href={"classroomManagement/addClassroom"}>
            <Plus className="text-blue-b1 cursor-pointer" />
          </Link>
          <Link
            className="md:text-sm lg:text-xl"
            href="/classroomManagement/addClassroom"
          >
            Add Classroom
          </Link>
          <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
            <Image
              src={"/images/export.png"}
              alt="export"
              width={15}
              height={15}
            />
            <span className="md:text-sm lg:text-xl">Export</span>
          </div>
        </div> */}

        <div className="text-blue-b1 flex items-center justify-center w-fit gap-3">
          <Button
            variant="ghost"
            className="outline-none"
            onClick={() => router.push("/classroomManagement/addClassroom")}
          >
            <Image src={"/images/Plus.png"} alt="plus" width={15} height={15} />
            <span className="md:text-sm lg:text-md pl-2"> Add Classroom</span>
          </Button>
          <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-2 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
            <Image
              src={"/images/export.png"}
              alt="export"
              width={15}
              height={15}
            />
            <span className="md:text-sm lg:text-md ">Export</span>
          </div>
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        table={table}
        pagination
        className="border-2 border-[#00858E] rounded-xl font-[DM Sans]"
        headerClassName="bg-[#EEFCFC] text-[#000000] text-[16px] font-medium font-sans leading-6"
        cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center capitalize py-2 h-[90px] px-2"
      />
    </>
  );
}

export default ClassroomTable;
