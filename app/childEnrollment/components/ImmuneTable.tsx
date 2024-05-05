"use client";

import { DataTable } from "@/components/common/data-table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DocsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ImmuneTable<TData, TValue>({
  columns,
  data,
}: DocsTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <DataTable data={data} columns={columns} table={table} pagination={false}         className="border border-[#00858e] rounded-xl font-[DM Sans]"
        headerClassName="text-[#4b4b4b] bg-[#EEFCFC]  text-base  font-sans text-muted-foreground font-medium"
        cellClassName="h-[80px] text-center" />
    </>
  );
}

export default ImmuneTable;