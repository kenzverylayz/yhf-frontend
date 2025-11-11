"use client";

import { DashboardCard } from "@/components/DashboardCard";
import FilterableTable from "@/components/FilterableTable";
import DownloadSegmentButton from "@/components/DownloadSegmentButton";
import EmailButton from "@/components/EmailButton";
import { useEmail } from "@/lib/hooks/useEmail";
import { imageToBase64 } from "@/lib/email-service";
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
    predictedClv: 1250.5,
    churnSegment: "Low",
    clvSegment: "High",
  },
  {
    id: "12346",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    historicalClv: 100.5,
    churnProbability: 72.8,
    predictedClv: 890.25,
    churnSegment: "Low",
    clvSegment: "High",
  },
  {
    id: "12347",
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    historicalClv: 100.5,
    churnProbability: 45.3,
    predictedClv: 2100.75,
    churnSegment: "Mid",
    clvSegment: "Mid",
  },
  {
    id: "12348",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    historicalClv: 240.6,
    churnProbability: 91.5,
    predictedClv: 675.0,
    churnSegment: "High",
    clvSegment: "Mid",
  },
  {
    id: "12349",
    name: "David Brown",
    email: "david.brown@email.com",
    historicalClv: 240.6,
    churnProbability: 38.7,
    predictedClv: 1850.3,
    churnSegment: "High",
    clvSegment: "Low",
  },
  {
    id: "12350",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    historicalClv: 240.6,
    churnProbability: 94.1,
    predictedClv: 450.8,
    churnSegment: "Mid",
    clvSegment: "Low",
  },
  {
    id: "12351",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    historicalClv: 280.1,
    churnProbability: 28.4,
    predictedClv: 3200.45,
    churnSegment: "High",
    clvSegment: "Mid",
  },
  {
    id: "12352",
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    historicalClv: 280.1,
    churnProbability: 67.9,
    predictedClv: 1420.6,
    churnSegment: "Low",
    clvSegment: "Low",
  },
  {
    id: "12353",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    historicalClv: 280.1,
    churnProbability: 52.3,
    predictedClv: 1680.9,
    churnSegment: "Low",
    clvSegment: "High",
  },
  {
    id: "12354",
    name: "Amanda Rodriguez",
    email: "amanda.rodriguez@email.com",
    historicalClv: 280.1,
    churnProbability: 79.6,
    predictedClv: 980.15,
    churnSegment: "Low",
    clvSegment: "Mid",
  },
];

export default function CustomerChurnValuePredictionTable() {
  const [posterBase64, setPosterBase64] = useState<string | undefined>();
  const [activeFilters, setActiveFilters] = useState<Record<string, string | undefined>>({});
  const { isEmailSending, notification, sendEmail, clearNotification } = useEmail();

  // Load image
  useEffect(() => {
    const loadPoster = async () => {
      try {
        const base64 = await imageToBase64("/images/poster.png");
        setPosterBase64(base64);
      } catch (err) {
        console.error("Failed to load poster image:", err);
      }
    };
    loadPoster();
  }, []);

  // Auto-hide email notification
  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => clearNotification(), 3000);
      return () => clearTimeout(t);
    }
  }, [notification, clearNotification]);

  const handleSendEmail = (customer: ChurnPredictionCustomer) => {
    sendEmail({
      customerEmail: customer.email,
      customerName: customer.name,
      posterBase64,
      posterFilename: "special-offer-poster.png",
    });
  };

  const columns: ColumnDef<ChurnPredictionCustomer>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Customer" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "historicalClv",
      header: "Historical CLV ($)",
      cell: ({ getValue }) => (
        <span className="tabular-nums">${Number(getValue()).toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "churnProbability",
      header: "Churn Probability (%)",
      cell: ({ getValue }) => (
        <span className="tabular-nums font-medium">{Number(getValue()).toFixed(1)}%</span>
      ),
    },
    {
      accessorKey: "churnSegment",
      header: "Churn Segment",
      meta: { filterOptions: ["Low", "Mid", "High"] },
    },
    {
      accessorKey: "predictedClv",
      header: "Predicted CLV ($)",
      cell: ({ getValue }) => (
        <span className="tabular-nums">${Number(getValue()).toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "clvSegment",
      header: "CLV Segment",
      meta: { filterOptions: ["Low", "Mid", "High"] },
    },
    {
      id: "contact",
      header: "Contact",
      cell: ({ row }) => (
        <EmailButton
          customerEmail={row.original.email}
          customerName={row.original.name}
          onClick={() => handleSendEmail(row.original)}
          isLoading={isEmailSending(row.original.email)}
        />
      ),
    },
  ];

  return (
    <>
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md z-50 ${
            notification.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      <DashboardCard title="Customer Churn & Value Prediction">
        <div className="flex justify-end mb-3">
          <DownloadSegmentButton filters={activeFilters} />
        </div>

        <FilterableTable<ChurnPredictionCustomer>
          columns={columns}
          data={mockChurnData}
          height={280}
          onFilterChange={setActiveFilters}
        />
      </DashboardCard>
    </>
  );
}