"use client";
import {DashboardCard} from "@/components/DashboardCard";
import FilterableTable from "@/components/FilterableTable";
import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/types/Customer";

const columns: ColumnDef<Customer>[] = [
  { accessorKey: "customerId", header: "ID" },
  { accessorKey: "name", header: "Customer" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "clv", header: "CLV ($)", 
    cell: ({ getValue }) => (
      <span className="tabular-nums">
        {Number(getValue()).toLocaleString()}
      </span>
    )
  },
  { accessorKey: "orderCount", header: "Orders" },
  { accessorKey: "rfmSegment", header: "RFM Segment" },
  { accessorKey: "firstOrdered", header: "First Ordered", 
    cell: ({ getValue }) => new Date(String(getValue())).toLocaleDateString() },
  { accessorKey: "lastOrdered", header: "Last Ordered", 
    cell: ({ getValue }) => new Date(String(getValue())).toLocaleDateString() },
];

export default function CLV({ initialData }: { initialData: Customer[] }) {
  return (
    <DashboardCard title="Top Customers by CLV">
      <FilterableTable<Customer> columns={columns} data={initialData} />
    </DashboardCard>
  );
}