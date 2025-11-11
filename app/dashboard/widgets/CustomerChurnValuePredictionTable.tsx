"use client";

import { DashboardCard } from "@/components/DashboardCard";
import FilterableTable from "@/components/FilterableTable";
import EmailButton from "@/components/EmailButton";
import { useEmail } from "@/lib/hooks/useEmail";
import { imageToBase64 } from "@/lib/email-service";
import type { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import type { Customer } from "@/types/customer";
import ApiParamsModal from "@/components/ApiParamsModal";

type CustomerChurnValuePredictionTableProps = {
  data?: Customer[];
};

export default function CustomerChurnValuePredictionTable({
  data = [],
}: CustomerChurnValuePredictionTableProps) {
  const [posterBase64, setPosterBase64] = useState<string | undefined>(undefined);
  const { isEmailSending, notification, sendEmail, clearNotification } = useEmail();

  const [rows, setRows] = useState<Customer[]>(data ?? []);
  const [perPage, setPerPage] = useState(10);
  const [customer, setCustomer] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [clvSegment, setClvSegment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isParamsOpen, setIsParamsOpen] = useState(false);
  const [draftPerPage, setDraftPerPage] = useState("10");
  const [draftCustomer, setDraftCustomer] = useState("");
  const [draftRiskLevel, setDraftRiskLevel] = useState("");
  const [draftClvSegment, setDraftClvSegment] = useState("");

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

  const handleOpenParams = () => {
    setDraftPerPage(String(perPage));
    setDraftCustomer(customer);
    setDraftRiskLevel(riskLevel);
    setDraftClvSegment(clvSegment);
    setIsParamsOpen(true);
  };

  const handleChangeParam = (key: string, value: string) => {
    if (key === "perPage") setDraftPerPage(value);
    else if (key === "customer") setDraftCustomer(value);
    else if (key === "risk_level") setDraftRiskLevel(value);
    else if (key === "clv_segment") setDraftClvSegment(value);
  };

  const handleApplyParams = () => {
    const nextPerPage = Math.max(1, Number(draftPerPage) || 1);
    setPerPage(nextPerPage);
    setCustomer(draftCustomer.trim());
    setRiskLevel(draftRiskLevel.trim());
    setClvSegment(draftClvSegment.trim());
    setIsParamsOpen(false);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => clearNotification(), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.set("per_page", String(perPage));
        if (customer.trim()) params.set("customer", customer.trim());
        if (riskLevel.trim()) params.set("risk_level", riskLevel.trim());
        if (clvSegment.trim()) params.set("clv_segment", clvSegment.trim());

        const res = await fetch(`/api/customer-predictions?${params.toString()}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch customer predictions: ${res.status}`);
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
          setError(err.message ?? "Failed to load customer predictions");
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
  }, [perPage, customer, riskLevel, clvSegment]);

  const handleSendEmail = (customer: Customer) => {
    sendEmail({
      customerEmail: customer.email,
      customerName: customer.name,
      posterBase64,
      posterFilename: "special-offer-poster.png",
    });
  };

  const columns: ColumnDef<Customer>[] = [
    { accessorKey: "customer", header: "Customer" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "risk_level",
      header: "Risk Level",
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value ?? "-"}</span>;
      },
    },
    {
      accessorKey: "churn_probability",
      header: "Churn Probability (%)",
      cell: ({ getValue }) => {
        const n = Number(getValue() ?? 0);
        return (
          <span className="tabular-nums font-medium">
            {(n * 100).toFixed(1)}%
          </span>
        );
      },
    },
    {
      accessorKey: "predicted_clv",
      header: "Predicted CLV ($)",
      cell: ({ getValue }) => {
        const n = Number(getValue() ?? 0);
        return (
          <span className="tabular-nums">
            ${n.toLocaleString()}
          </span>
        );
      },
    },
    {
      accessorKey: "clv_segment",
      header: "CLV Segment",
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value ?? "-"}</span>;
      },
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
          className={`fixed top-4 right-4 p-4 rounded-md z-50 border shadow-lg ${
            notification.type === "success"
              ? "bg-green-600/90 border-green-400 text-white"
              : "bg-red-600/90 border-red-400 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}
      <DashboardCard title="Customer Churn & Value Prediction">
        <div className="flex-1 min-h-0 flex flex-col">
          {error && (
            <div className="mb-2 text-xs text-red-500">{error}</div>
          )}
          <FilterableTable<Customer>
            columns={columns}
            data={rows ?? []}
            height={280}
          />
          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
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
            </div>
          </div>
          <ApiParamsModal
            open={isParamsOpen}
            title="Edit Customer Prediction API Params"
            params={[
              { key: "perPage", label: "Per page", type: "number", value: draftPerPage },
              { key: "customer", label: "Customer contains", type: "text", value: draftCustomer },
              { key: "risk_level", label: "Risk level (Low/Medium/High)", type: "text", value: draftRiskLevel },
              { key: "clv_segment", label: "CLV segment (Low/Mid/High)", type: "text", value: draftClvSegment },
            ]}
            onChange={handleChangeParam}
            onApply={handleApplyParams}
            onClose={() => setIsParamsOpen(false)}
          />
        </div>
      </DashboardCard>
    </>
  );
}