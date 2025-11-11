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
  height?: number;
  onFilterChange?: (filters: Record<string, string | undefined>) => void;
};

export default function FilterableTable<TData>({
  columns,
  data,
  height = 354,
  onFilterChange,
}: FilterableTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [openFilter, setOpenFilter] = React.useState<string | null>(null);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  // Handle click outside for dropdowns
  React.useEffect(() => {
    const closeOnClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filter-menu") && !target.closest(".filter-button")) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("click", closeOnClickOutside);
    return () => document.removeEventListener("click", closeOnClickOutside);
  }, []);

  // Helper to emit filters upward
  const emitFilterChange = React.useCallback(() => {
    if (!onFilterChange) return;
    const allFilters = table.getAllColumns().reduce((acc, col) => {
      acc[col.id] = col.getFilterValue() as string | undefined;
      return acc;
    }, {} as Record<string, string | undefined>);
    onFilterChange(allFilters);
  }, [onFilterChange, table]);

  return (
    <div className="space-y-4 flex flex-col h-full">
      {/* Global search */}
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Filter customers..."
        className="w-2/3 rounded-lg border border-[var(--theme-border-primary)] 
                   bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)]
                   px-4 py-2 text-sm placeholder-[var(--theme-text-muted)]
                   transition-colors"
      />

      {/* Table */}
      <div
        className="rounded-lg border border-[var(--theme-border-primary)] 
                   bg-[var(--theme-bg-secondary)] overflow-hidden flex-1 min-h-0"
        style={height ? { height } : {}}
      >
        <div className="overflow-auto h-full relative">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-[var(--theme-bg-tertiary)]">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-[var(--theme-border-primary)]">
                  {hg.headers.map((header) => {
                    const colId = header.column.id;
                    const filterOptions = (header.column.columnDef.meta as { filterOptions?: string[] })?.filterOptions;
                    const currentFilter = header.column.getFilterValue() || "";

                    return (
                      <th
                        key={colId}
                        className="px-4 py-3 text-left font-semibold uppercase tracking-wide 
                                   text-[11px] text-[var(--theme-text-secondary)] select-none relative"
                      >
                        <div className="flex items-center justify-between">
                          {/* Header + sorting */}
                          <div
                            className="flex items-center gap-1 cursor-pointer hover:text-[var(--theme-text-primary)]"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <span className="text-[var(--theme-text-muted)] text-[10px]">
                              {{
                                asc: "▲",
                                desc: "▼",
                              }[header.column.getIsSorted() as string] ?? ""}
                            </span>
                          </div>

                          {/* Filter Dropdown */}
                          {filterOptions && (
                            <button
                              className={`filter-button relative -left-[2px] text-[10px] p-[2px] rounded-sm hover:bg-[var(--theme-bg-hover)] ${
                                openFilter === colId ? "bg-[var(--theme-bg-hover)]" : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenFilter(openFilter === colId ? null : colId);
                              }}
                            >
                              ▼
                            </button>
                          )}
                        </div>

                        {/* Filter Menu */}
                        {openFilter === colId && filterOptions && (
                          <div
                            className="filter-menu absolute right-2 mt-1 w-20 bg-[var(--theme-bg-card)] 
                                      border border-[var(--theme-border-primary)] rounded-md shadow-lg z-50"
                          >
                            <div
                              className={`px-3 py-1 text-xs cursor-pointer hover:bg-[var(--theme-bg-hover)] ${
                                currentFilter === "" ? "font-semibold" : ""
                              }`}
                              onClick={() => {
                                header.column.setFilterValue(undefined);
                                emitFilterChange();
                                setOpenFilter(null);
                              }}
                            >
                              All
                            </div>
                            {filterOptions.map((option: string) => (
                              <div
                                key={option}
                                className={`px-3 py-1 text-xs cursor-pointer hover:bg-[var(--theme-bg-hover)] ${
                                  currentFilter === option ? "font-semibold" : ""
                                }`}
                                onClick={() => {
                                  header.column.setFilterValue(option);
                                  emitFilterChange();
                                  setOpenFilter(null);
                                }}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            {/* Body */}
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-[var(--theme-border-primary)] 
                               hover:bg-[var(--theme-bg-hover)] transition-colors ${
                                 i % 2
                                   ? "bg-[var(--theme-bg-secondary)]"
                                   : "bg-[var(--theme-bg-card)]"
                               }`}
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