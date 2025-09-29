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
  columns, data, height = 354,
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
    <div className="space-y-4">
      {/* Filter input */}
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter customers..."
        className="w-full rounded-lg border border-[var(--theme-border-primary)] 
                   bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)]
                   px-4 py-2 text-sm placeholder-[var(--theme-text-muted)]
                   transition-colors"
      />

      {/* Table container */}
      <div
        className="rounded-lg border border-[var(--theme-border-primary)] 
                   bg-[var(--theme-bg-secondary)] overflow-hidden"
        style={{ height: height }}
      >
        <div className="overflow-auto" style={{ height: height }}>
          <table className="min-w-full text-sm">
            {/* Sticky header */}
            <thead className="sticky top-0 z-10 bg-[var(--theme-bg-tertiary)]">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-[var(--theme-border-primary)]">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-semibold uppercase tracking-wide 
                                 text-[11px] text-[var(--theme-text-secondary)] cursor-pointer 
                                 select-none hover:bg-[var(--theme-bg-hover)] transition-colors"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className="text-[var(--theme-text-muted)]">
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
                    className={`border-b border-[var(--theme-border-primary)] 
                               hover:bg-[var(--theme-bg-hover)] transition-colors
                               ${i % 2 ? "bg-[var(--theme-bg-secondary)]" : "bg-[var(--theme-bg-card)]"}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 align-middle whitespace-nowrap 
                                   [font-variant-numeric:tabular-nums] text-[var(--theme-text-primary)]"
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
                    className="px-4 py-8 text-center text-[var(--theme-text-muted)]"
                  >
                    No matching data found
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