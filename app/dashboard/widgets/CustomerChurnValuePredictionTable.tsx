"use client";

import { DashboardCard } from "@/components/DashboardCard";
import FilterableTable from "@/components/FilterableTable";
import EmailButton from "@/components/EmailButton";
import { useEmail } from "@/lib/hooks/useEmail";
import { imageToBase64 } from "@/lib/email-service";
import type { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";

type ChurnPredictionCustomer = {
  id: string;
  name: string;
  email: string;
  churnProbability: number;
  predictedClv: number;
  predictedOrderSize: number;
  predictedOrderValue: number;
};

const mockChurnData: ChurnPredictionCustomer[] = [
  {
    id: "12345",
    name: "jy",
    email: "jiayi747@gmail.com",
    churnProbability: 85.2,
    predictedClv: 1250.50,
    predictedOrderSize: 2.3,
    predictedOrderValue: 543.70
  },
  {
    id: "12346",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    churnProbability: 72.8,
    predictedClv: 890.25,
    predictedOrderSize: 1.8,
    predictedOrderValue: 494.58
  },
  {
    id: "12347",
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    churnProbability: 45.3,
    predictedClv: 2100.75,
    predictedOrderSize: 3.2,
    predictedOrderValue: 656.48
  },
  {
    id: "12348",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    churnProbability: 91.5,
    predictedClv: 675.00,
    predictedOrderSize: 1.5,
    predictedOrderValue: 450.00
  },
  {
    id: "12349",
    name: "David Brown",
    email: "david.brown@email.com",
    churnProbability: 38.7,
    predictedClv: 1850.30,
    predictedOrderSize: 2.8,
    predictedOrderValue: 660.82
  },
  {
    id: "12350",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    churnProbability: 94.1,
    predictedClv: 450.80,
    predictedOrderSize: 1.2,
    predictedOrderValue: 375.67
  },
  {
    id: "12351",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    churnProbability: 28.4,
    predictedClv: 3200.45,
    predictedOrderSize: 4.1,
    predictedOrderValue: 780.60
  },
  {
    id: "12352",
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    churnProbability: 67.9,
    predictedClv: 1420.60,
    predictedOrderSize: 2.6,
    predictedOrderValue: 546.38
  },
  {
    id: "12353",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    churnProbability: 52.3,
    predictedClv: 1680.90,
    predictedOrderSize: 3.0,
    predictedOrderValue: 560.30
  },
  {
    id: "12354",
    name: "Amanda Rodriguez",
    email: "amanda.rodriguez@email.com",
    churnProbability: 79.6,
    predictedClv: 980.15,
    predictedOrderSize: 2.1,
    predictedOrderValue: 466.74
  }
];

export default function CustomerChurnValuePredictionTable() {
  const [posterBase64, setPosterBase64] = useState<string | undefined>(undefined);
  const { isEmailSending, notification, sendEmail, clearNotification } = useEmail();

  // Load poster image and convert to base64
  useEffect(() => {
    const loadPoster = async () => {
      try {
        const base64 = await imageToBase64('/images/poster.png');
        setPosterBase64(base64);
      } catch (error) {
        console.error('Failed to load poster image:', error);
      }
    };
    
    loadPoster();
  }, []);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => clearNotification(), 3000);
      return () => clearTimeout(timer);
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
      accessorKey: "churnProbability", 
      header: "Churn Probability (%)", 
      cell: ({ getValue }) => (
        <span className="tabular-nums font-medium">
          {Number(getValue()).toFixed(1)}%
        </span>
      )
    },
    { 
      accessorKey: "predictedClv", 
      header: "Predicted CLV ($)", 
      cell: ({ getValue }) => (
        <span className="tabular-nums">
          ${Number(getValue()).toLocaleString()}
        </span>
      )
    },
    { 
      accessorKey: "predictedOrderSize", 
      header: "Predicted Order Size", 
      cell: ({ getValue }) => (
        <span className="tabular-nums">
          {Number(getValue()).toFixed(1)}
        </span>
      )
    },
    { 
      accessorKey: "predictedOrderValue", 
      header: "Predicted Order Value ($)", 
      cell: ({ getValue }) => (
        <span className="tabular-nums">
          ${Number(getValue()).toFixed(2)}
        </span>
      )
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
        <div className={`fixed top-4 right-4 p-4 rounded-md z-50 ${
          notification.type === 'success' 
            ? 'bg-green-600 text-white' 
            : 'bg-red-600 text-white'
        }`}>
          {notification.message}
        </div>
      )}
      <DashboardCard title="Customer Churn & Value Prediction">
        <FilterableTable<ChurnPredictionCustomer> 
          columns={columns} 
          data={mockChurnData} 
          height={280} 
        />
      </DashboardCard>
    </>
  );
}