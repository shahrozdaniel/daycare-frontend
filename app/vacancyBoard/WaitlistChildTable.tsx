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

export function WaitlistChildTable<TData, TValue>({
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
      <p className="pb-2">Waitlist</p>{" "}
      <DataTable
        data={data}
        columns={columns}
        table={table}
        pagination={false}
        className="rounded-xl"
      />
    </>
  );
}

export default WaitlistChildTable;
