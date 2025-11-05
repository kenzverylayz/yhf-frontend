"use client";
import { DashboardCard } from "@/components/DashboardCard";
import FilterableTable from "@/components/FilterableTable";
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
    accessorKey: "clv",
    header: "CLV ($)",
    cell: ({ getValue }) => {
      const n = Number(getValue() ?? 0);
      return <span className="tabular-nums">{moneyFmt.format(n)}</span>;
    },
  },

  { accessorKey: "orderCount", header: "Orders" },
  { accessorKey: "rfmSegment", header: "RFM Segment" },

  {
    accessorKey: "firstOrdered",
    header: "First Ordered",
    cell: ({ getValue }) => formatDateYMDUTC(getValue() as Date | string | number),
  },
  {
    accessorKey: "lastOrdered",
    header: "Last Ordered",
    cell: ({ getValue }) => formatDateYMDUTC(getValue() as Date | string | number),
  },
];

export default function CLV({ initialData }: { initialData: Customer[] }) {
  console.log('CLV component received customers:', initialData?.length, 'customers');
  return (
    <DashboardCard title="Top Customers by CLV" fullHeight>
      <div className="flex-1 min-h-0 flex flex-col">
        <FilterableTable<Customer> columns={columns} data={initialData ?? []} />
      </div>
    </DashboardCard>
  );
}