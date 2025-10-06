"use client";

import { DashboardCard } from "@/components/DashboardCard";
import FilterableTable from "@/components/FilterableTable";
import EmailButton from "@/components/EmailButton";
import { useEmail } from "@/lib/hooks/useEmail";
import { imageToBase64 } from "@/lib/email-service";
import type { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";

type ChurnCustomer = {
  id: string;
  name: string;
  email: string;
  clv: number;
  orders: number;
  firstOrdered: string;
  lastOrdered: string;
};

const mockChurnData: ChurnCustomer[] = [
  {
    id: "12345",
    name: "jy",
    email: "jiayi747@gmail.com",
    clv: 1250.50,
    orders: 3,
    firstOrdered: "2023-01-15",
    lastOrdered: "2023-02-10"
  },
  {
    id: "12346",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    clv: 890.25,
    orders: 2,
    firstOrdered: "2023-03-20",
    lastOrdered: "2023-04-05"
  },
  {
    id: "12347",
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    clv: 2100.75,
    orders: 5,
    firstOrdered: "2022-11-10",
    lastOrdered: "2023-01-20"
  },
  {
    id: "12348",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    clv: 675.00,
    orders: 1,
    firstOrdered: "2023-05-12",
    lastOrdered: "2023-05-12"
  },
  {
    id: "12349",
    name: "David Brown",
    email: "david.brown@email.com",
    clv: 1850.30,
    orders: 4,
    firstOrdered: "2022-09-08",
    lastOrdered: "2023-02-28"
  },
  {
    id: "12350",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    clv: 450.80,
    orders: 1,
    firstOrdered: "2023-06-01",
    lastOrdered: "2023-06-01"
  },
  {
    id: "12351",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    clv: 3200.45,
    orders: 7,
    firstOrdered: "2022-07-15",
    lastOrdered: "2023-03-10"
  }
];

export default function ChurnRiskTable() {
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

  const handleSendEmail = (customer: ChurnCustomer) => {
    sendEmail({
      customerEmail: customer.email,
      customerName: customer.name,
      posterBase64,
      posterFilename: "special-offer-poster.png",
    });
  };

  const columns: ColumnDef<ChurnCustomer>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Customer" },
    { accessorKey: "email", header: "Email" },
    { 
      accessorKey: "clv", 
      header: "CLV ($)", 
      cell: ({ getValue }) => (
        <span className="tabular-nums">
          {Number(getValue()).toLocaleString()}
        </span>
      )
    },
    { accessorKey: "orders", header: "Orders" },
    { 
      accessorKey: "firstOrdered", 
      header: "First Ordered", 
      cell: ({ getValue }) => new Date(String(getValue())).toLocaleDateString() 
    },
    { 
      accessorKey: "lastOrdered", 
      header: "Last Ordered", 
      cell: ({ getValue }) => new Date(String(getValue())).toLocaleDateString() 
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
      <DashboardCard title="Customers at Highest Churn Risk">
        <FilterableTable<ChurnCustomer> 
          columns={columns} 
          data={mockChurnData} 
          height={280} 
        />
      </DashboardCard>
    </>
  );
}