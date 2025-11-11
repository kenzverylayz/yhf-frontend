"use client";

import { DashboardCard } from "@/components/DashboardCard";
import FilterableTable from "@/components/FilterableTable";
import DownloadSegmentButton from "@/components/DownloadSegmentButton";
// import EmailButton from "@/components/EmailButton";
// import { useEmail } from "@/lib/hooks/useEmail";
// import { imageToBase64 } from "@/lib/email-service";
import type { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";

type ChurnPredictionCustomer = {
  id: string;
  name: string;
  email: string;
  historicalClv: number;
  churnProbability: number;
  predictedClv: number;
  churnSegment: string;
  clvSegment: string;
};

const mockChurnData: ChurnPredictionCustomer[] = [
  {
    id: "12345",
    name: "jy",
    email: "jiayi747@gmail.com",
    historicalClv: 100.5,
    churnProbability: 85.2,
    predictedClv: 1250.50,
    churnSegment: "Low",
    clvSegment: "High"
  },
  {
    id: "12346",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    historicalClv: 100.5,
    churnProbability: 72.8,
    predictedClv: 890.25,
    churnSegment: "Low",
    clvSegment: "High"
  },
  {
    id: "12347",
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    historicalClv: 100.5,
    churnProbability: 45.3,
    predictedClv: 2100.75,
    churnSegment: "Mid",
    clvSegment: "Mid"
  },
  {
    id: "12348",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    historicalClv: 240.6,
    churnProbability: 91.5,
    predictedClv: 675.00,
    churnSegment: "High",
    clvSegment: "Mid"
  },
  {
    id: "12349",
    name: "David Brown",
    email: "david.brown@email.com",
    historicalClv: 240.6,
    churnProbability: 38.7,
    predictedClv: 1850.30,
    churnSegment: "High",
    clvSegment: "Low"
  },
  {
    id: "12350",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    historicalClv: 240.6,
    churnProbability: 94.1,
    predictedClv: 450.80,
    churnSegment: "Mid",
    clvSegment: "Low"
  },
  {
    id: "12351",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    historicalClv: 280.1,
    churnProbability: 28.4,
    predictedClv: 3200.45,
    churnSegment: "High",
    clvSegment: "Mid"
  },
  {
    id: "12352",
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    historicalClv: 280.1,
    churnProbability: 67.9,
    predictedClv: 1420.60,
    churnSegment: "Low",
    clvSegment: "Low"
  },
  {
    id: "12353",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    historicalClv: 280.1,
    churnProbability: 52.3,
    predictedClv: 1680.90,
    churnSegment: "Low",
    clvSegment: "High"
  },
  {
    id: "12354",
    name: "Amanda Rodriguez",
    email: "amanda.rodriguez@email.com",
    historicalClv: 280.1,
    churnProbability: 79.6,
    predictedClv: 980.15,
    churnSegment: "Low",
    clvSegment: "Mid"
  }
];

export default function CustomerChurnValuePredictionTable() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string | undefined>>({});

  const columns: ColumnDef<ChurnPredictionCustomer>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Customer" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "historicalClv", header: "Historical CLV ($)" },
    { accessorKey: "churnProbability", header: "Churn Probability (%)" },
    {
      accessorKey: "churnSegment",
      header: "Churn Segment",
      meta: { filterOptions: ["Low", "Mid", "High"] },
    },
    { accessorKey: "predictedClv", header: "Predicted CLV ($)" },
    {
      accessorKey: "clvSegment",
      header: "CLV Segment",
      meta: { filterOptions: ["Low", "Mid", "High"] },
    },
  ];

  return (
    <DashboardCard>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[var(--theme-text-primary)]">
          Customer Churn & Value Prediction
        </h2>

        {/* Move button here */}
        <button
          onClick={() => console.log("Download triggered")}
          className="bg-[var(--theme-accent-primary)] hover:bg-[var(--theme-accent-secondary)] text-white 
                    font-medium text-sm px-4 py-2 rounded-md shadow-[0_4px_12px_rgba(255,109,199,0.35)] 
                    transition-colors duration-200"
        >
          Download CSV
        </button>
      </div>

      <FilterableTable<ChurnPredictionCustomer>
        columns={columns.filter((col) => col.id !== "contact")}
        data={mockChurnData}
        height={280}
      />
    </DashboardCard>
  );
}