"use client";
import * as React from "react";
import {
  ColumnDef, flexRender, getCoreRowModel,
  getFilteredRowModel, getSortedRowModel,
  SortingState, useReactTable,
} from "@tanstack/react-table";

type FilterableTableProps<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  height?: number; // px
};

export default function FilterableTable<TData>({
  columns, data, height = 360,
}: FilterableTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filter, setFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter: filter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="space-y-3">
      {/* Filter input (high contrast) */}
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter…"
        className="w-full rounded-md border border-white/40 bg-white/90
                   px-3 py-2 text-sm text-gray-800 placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-sky-400"
      />

      {/* Light surface inside dark card */}
      <div
        className="rounded-lg bg-white text-gray-800 shadow-sm ring-1 ring-gray-200 overflow-hidden"
        style={{ maxHeight: height }}
      >
        <div className="overflow-auto" style={{ maxHeight: height }}>
          <table className="min-w-full text-sm">
            {/* Sticky header */}
            <thead className="sticky top-0 z-10 bg-gray-50 text-gray-700">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-gray-200">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 py-2 text-left font-semibold uppercase tracking-wide text-[11px] cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className="text-gray-400">
                          {{ asc: "▲", desc: "▼" }[header.column.getIsSorted() as string] ?? ""}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={i % 2 ? "bg-gray-50" : "bg-white"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 py-2 align-middle whitespace-nowrap [font-variant-numeric:tabular-nums]"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-3 py-6 text-center text-gray-500"
                  >
                    No matching data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}