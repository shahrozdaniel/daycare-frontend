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

export function Activitytable<TData, TValue>({
  columns,
  data,
}: DocsTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <DataTable data={data} columns={columns} table={table} pagination={false}
        className="border border-[#00858E] rounded-xl font-[DM Sans]"
        headerClassName="bg-[#EEFCFC] text-[#000000] text-[16px] font-medium font-sans leading-6"
        cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center capitalize py-2 h-[80px] px-2" />
    </div>
  );
}

export default Activitytable;
