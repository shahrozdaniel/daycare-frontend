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
  className?: string;
  headerClassName?: string;
  cellClassName?:string;
}

export function DocsTable<TData, TValue>({
  columns,
  data,
  className,
  headerClassName,
  cellClassName
}: DocsTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        table={table}
        pagination={false}
        className="border border-[#00858E] rounded-xl font-[DM Sans]"
        headerClassName={headerClassName}
        cellClassName="bg-white  font-sans text-base font-[400] text-[#000000] text-center py-2 h-[60px] px-2"
      />
    </>
  );
}

export default DocsTable;
