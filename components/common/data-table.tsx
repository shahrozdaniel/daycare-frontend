"use client";

import {
  ColumnDef,
  flexRender,
  Table as OriginalTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  table: OriginalTable<TData>;
  pagination?: boolean;
  reloadTable?: any;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
  pagestate?: any;
  setPageState?: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  table,
  pagination = true,
  reloadTable,
  className,
  headerClassName,
  cellClassName,
  pagestate,
  setPageState,
}: DataTableProps<TData, TValue>) {
  return (
    <>
      <div
        className={` border rounded-xl md:mt-2  border-[#00858e] font-[DM Sans]`}
      >
        <Table>
          <TableHeader
            className={`${
              headerClassName ? headerClassName : ""
            } text-[#4b4b4b] bg-[#EEFCFC]  text-base  font-sans text-muted-foreground font-medium`}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center ">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${
                        cellClassName
                          ? cellClassName
                          : "border-b-[#D2CFFF] text-center p-4"
                      } font-normal text-[#323232] text-sm`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}

      {pagination && table.getPageCount() > 0 && (
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            className="bg-[#EEFCFC]"
            variant="outline"
            size="xm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft color="#00858E" />
          </Button>
          <span className=" rounded px-2 bg-[#EEFCFC] text-[#000000]">
            {table.getState().pagination.pageIndex + 1}
          </span>
          <span className="text-[#8E8E8E]">/</span>
          <span className="  text-[#8E8E8E]">{table.getPageCount()}</span>
          <Button
            className="bg-[#EEFCFC]"
            variant="outline"
            size="xm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight color="#00858E" />
          </Button>
        </div>
      )}
    </>
  );
}