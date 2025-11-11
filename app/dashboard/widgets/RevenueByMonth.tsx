"use client";

import React, { useState, useMemo, useEffect } from "react";
import { DashboardCard } from "@/components/DashboardCard";
import YearFilter from "@/components/YearFilter";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { RevenueByMonthDoc } from "@/types/revenueByMonth";

export type RevenuePoint = {
  month: string;
  revenue: number;
};

type RevenueByMonthProps = {
  title?: string;
  initialYear?: number;
  data?: RevenueByMonthDoc; // initial data for the initial year
  showGrid?: boolean;
};

const AVAILABLE_YEARS = [2023, 2024, 2025];

export default function RevenueByMonth({
  title = "Revenue by Month",
  initialYear = AVAILABLE_YEARS[AVAILABLE_YEARS.length - 1],
  data = [],
  showGrid = false,
}: RevenueByMonthProps) {
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [rawData, setRawData] = useState<RevenueByMonthDoc>(data ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data whenever the selected year changes.
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/revenue-by-month?year=${selectedYear}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch revenue by month: ${res.status}`);
        }

        const json: { year: number; data: RevenueByMonthDoc } = await res.json();
        if (!cancelled) {
          setRawData(json.data ?? []);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message ?? "Failed to load data");
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
  }, [selectedYear]);

  // Transform backend data into chart shape
  const currentYearData = useMemo<RevenuePoint[]>(() => {
    return (rawData ?? []).map((entry) => {
      const [yearStr, monthPart] = entry.month.split("-");
      const label = monthPart ?? entry.month;
      return {
        month: label,
        revenue: entry.total_revenue,
      };
    });
  }, [rawData]);

  return (
    <DashboardCard
      title={title}
      fullHeight
      headerActions={
        <YearFilter
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          years={AVAILABLE_YEARS}
        />
      }
    >
      <div
        className="flex-1 min-h-0 w-full flex items-center justify-center"
        style={{ outline: "none" }}
      >
          {isLoading && (
          <div className="absolute top-2 right-4 text-xs text-gray-400">
            Loading…
          </div>
        )}
        {error && (
          <div className="absolute top-2 right-4 text-xs text-red-400">
            {error}
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={currentYearData}
            margin={{ top: 8, right: 30, bottom: 0, left: 0 }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--theme-border-primary)"
              />
            )}

            <XAxis
              dataKey="month"
              tickMargin={6}
              tick={{ fill: "var(--theme-text-muted)", fontSize: 12 }}
              axisLine={{ stroke: "var(--theme-border-primary)" }}
            />

            <YAxis
              tick={{ fill: "var(--theme-text-muted)", fontSize: 12 }}
              axisLine={{ stroke: "var(--theme-border-primary)" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />

            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              labelFormatter={(label) => `${label} ${selectedYear}`}
              contentStyle={{
                backgroundColor: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border-primary)",
                borderRadius: "8px",
                color: "var(--theme-text-primary)",
                boxShadow: "var(--theme-shadow-card)",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--theme-accent-primary)"
              dot={{
                r: 5,
                stroke: "var(--theme-border-accent)",
                strokeWidth: 2,
                fill: "var(--theme-accent-secondary)",
              }}
              strokeWidth={3}
              activeDot={{
                r: 6,
                fill: "var(--theme-accent-primary)",
                stroke: "var(--theme-bg-primary)",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
