"use client";
import { DashboardCard } from "@/components/DashboardCard";
import { useEffect, useState } from "react";
import FilterableTable from "@/components/FilterableTable";
import ApiParamsModal from "@/components/ApiParamsModal";
import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/types/customer";
import { formatDateYMDUTC } from "@/utils/format"; 

const moneyFmt = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const columns: ColumnDef<Customer>[] = [
  { accessorKey: "customerId", header: "ID" },
  { accessorKey: "name", header: "Customer" },
  { accessorKey: "email", header: "Email" },

  {
    accessorKey: "lifetimeCustomerValue",
    header: "CLV ($)",
    cell: ({ getValue }) => {
      const n = Number(getValue() ?? 0);
      return <span className="tabular-nums">{moneyFmt.format(n)}</span>;
    },
  },

  { accessorKey: "orderCount", header: "Orders" },


  {
    accessorKey: "firstOrdered",
    header: "First Ordered",
    cell: ({ getValue }) => {
      const v = getValue() as Date | string | number | null | undefined;
      return v ? formatDateYMDUTC(v) : "-";
    },
  },
  {
    accessorKey: "lastOrdered",
    header: "Last Ordered",
    cell: ({ getValue }) => {
      const v = getValue() as Date | string | number | null | undefined;
      return v ? formatDateYMDUTC(v) : "-";
    },
  },
];

type CLVProps = {
  initialData: Customer[];
  initialPage?: number;
  initialPerPage?: number;
};

export default function CLV({
  initialData,
  initialPage = 1,
  initialPerPage = 10,
}: CLVProps) {
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [rows, setRows] = useState<Customer[]>(initialData ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isParamsOpen, setIsParamsOpen] = useState(false);
  const [draftPage, setDraftPage] = useState(String(initialPage));
  const [draftPerPage, setDraftPerPage] = useState(String(initialPerPage));

  const handleOpenParams = () => {
    setDraftPage(String(page));
    setDraftPerPage(String(perPage));
    setIsParamsOpen(true);
  };

  const handleChangeParam = (key: string, value: string) => {
    if (key === "page") {
      setDraftPage(value);
    } else if (key === "perPage") {
      setDraftPerPage(value);
    }
  };

  const handleApplyParams = () => {
    const nextPage = Math.max(1, Number(draftPage) || 1);
    const nextPerPage = Math.max(1, Number(draftPerPage) || 1);
    setPage(nextPage);
    setPerPage(nextPerPage);
    setIsParamsOpen(false);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(
          `/api/top-customers-clv?page=${page}&per_page=${perPage}`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch customers: ${res.status}`);
        }

        const json: {
          page: number;
          per_page: number;
          customers: Customer[];
        } = await res.json();

        if (!cancelled) {
          setRows(json.customers ?? []);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message ?? "Failed to load customers");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [page, perPage]);

  return (
    <DashboardCard title="Top Customers by CLV" fullHeight>
      <div className="flex-1 min-h-0 flex flex-col">
        {error && (
          <div className="mb-2 text-xs text-red-500">
            {error}
          </div>
        )}
        <FilterableTable<Customer> columns={columns} data={rows ?? []} />
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-700/50 pt-2">
          <div className="flex items-center gap-2">
            <span>Page {page}</span>
            <span>·</span>
            <span>{perPage} per page</span>
            <button
              className="rounded border px-2 py-1 text-[11px] hover:bg-gray-700/30 transition-colors mt-[1px]"
              onClick={handleOpenParams}
              disabled={isLoading}
            >
              Edit params
            </button>
          </div>
          <div className="space-x-2">
            <button
              className="rounded border px-2 py-1 text-[11px] hover:bg-gray-700/30 disabled:opacity-40 transition-colors mt-[1px]"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <button
              className="rounded border px-2 py-1 text-[11px] hover:bg-gray-700/30 disabled:opacity-40 transition-colors mt-[1px]"
              disabled={isLoading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
        <ApiParamsModal
          open={isParamsOpen}
          title="Edit Top Customers API Params"
          params={[
            { key: "page", label: "Page", type: "number", value: draftPage },
            { key: "perPage", label: "Per page", type: "number", value: draftPerPage },
          ]}
          onChange={handleChangeParam}
          onApply={handleApplyParams}
          onClose={() => setIsParamsOpen(false)}
        />
      </div>
    </DashboardCard>
  );
}