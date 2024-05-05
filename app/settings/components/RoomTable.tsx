"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { classroomCategory } from "@/app/register/components/api/RegisterApi";
import { useGlobalContext } from "@/app/context/store";
// import { register } from "module";

interface RoomTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagestate?: any;
    setPageState?: any;
    activeTab?: any
}

export function RoomTable<TData, TValue>({
    columns,
    data,
    activeTab
}: RoomTableProps<TData, TValue>) {
    const { permission, IsAdmin } = useGlobalContext();
    let userPermission = permission?.role_detail?.permissions
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [classroomcategory, setClassroomCategory] = useState([]);
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
        <>
            <div className="flex md:flex-col lg:flex-row justify-between">
                <div className="flex items-center md:py-2 lg:py-4">
                    <span className="text-grey-placeholder md:text-sm lg:text-md md:w-20 lg:w-max ">
                        Filter By:{" "}
                    </span>
                    <div className="relative ">
                        <Input
                            placeholder="Name"
                            value={
                                (table.getColumn(activeTab === 1 ? "name" : 'staff_name')?.getFilterValue() as string) ?? ""
                            }
                            onChange={(event) =>
                                table.getColumn(activeTab === 1 ? "name" : 'staff_name')?.setFilterValue(event.target.value)
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
                    <div className="relative">
                        {activeTab == 2 && <Select
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
                                <SelectItem value="1">Active</SelectItem>
                                <SelectItem value="0">Inactive</SelectItem>
                            </SelectContent>
                        </Select>}
                        {/* <Image
                            src={"/images/search.png"}
                            alt="search"
                            width="15"
                            height="15"
                            className="absolute top-3 right-2"
                        /> */}
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
                cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center capitalize py-2 h-[60px] px-2"
            />
        </>
    );
}

export default RoomTable;
