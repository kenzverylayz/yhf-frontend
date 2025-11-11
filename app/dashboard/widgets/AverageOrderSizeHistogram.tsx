"use client";

import React, { useState, useMemo, useEffect } from "react";
import { DashboardCard } from "@/components/DashboardCard";
import YearFilter from "@/components/YearFilter";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { AverageOrderSizeDoc } from "@/types/averageOrderSize";

export type OrderSizePoint = {
  month: string;
  averageOrderSize: number;
};

type AverageOrderSizeProps = {
  title?: string;
  initialYear?: number;
  data?: AverageOrderSizeDoc; // initial data for the initial year (from server)
  showGrid?: boolean;
};

const AVAILABLE_YEARS = [2023, 2024, 2025];

export default function AverageOrderSize({
  title = "Average Order Size per Month",
  initialYear = AVAILABLE_YEARS[AVAILABLE_YEARS.length - 1],
  data = [],
  showGrid = false,
}: AverageOrderSizeProps) {
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [rawData, setRawData] = useState<AverageOrderSizeDoc>(data ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data whenever the selected year changes.
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/average-order-size?year=${selectedYear}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch average order size: ${res.status}`);
        }

        const json: { year: number; data: AverageOrderSizeDoc } = await res.json();
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

  // Transform raw backend data into the shape the chart expects.
  const currentYearData = useMemo<OrderSizePoint[]>(() => {
    return (rawData ?? []).map((entry) => {
      const [yearStr, monthPart] = entry.month.split("-");
      const label = monthPart ?? entry.month;
      return {
        month: label,
        averageOrderSize: entry.average_order_size,
      };
    });
  }, [rawData]);

  const formatter: TooltipProps<number, string>["formatter"] = (value) => [
    `${Number(value).toFixed(1)}`,
    "Average Order Size",
  ];

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
      <div className="flex-1 min-h-0 w-full flex items-center justify-center" style={{ outline: "none" }}>
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
          <BarChart data={currentYearData} margin={{ top: 8, right: 30, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="month"
              tickMargin={6}
              tick={{ fill: "var(--theme-text-muted)", fontSize: 12 }}
              axisLine={{ stroke: "var(--theme-border-primary)" }}
            />
            <YAxis
              tick={{ fill: "var(--theme-text-muted)", fontSize: 12 }}
              axisLine={{ stroke: "var(--theme-border-primary)" }}
            />
            <Tooltip
              formatter={formatter}
              labelFormatter={(label) => `${label} ${selectedYear}`}
              contentStyle={{
                backgroundColor: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border-primary)",
                borderRadius: "8px",
                color: "var(--theme-text-primary)",
                boxShadow: "var(--theme-shadow-card)",
              }}
              labelStyle={{
                color: "white",
                fontWeight: "bold",
              }}
              cursor={false}
            />
            <Bar
              dataKey="averageOrderSize"
              fill="var(--theme-accent-primary)"
              radius={[6, 6, 0, 0]}
              isAnimationActive={false} 
              style={{ cursor: "default", outline: "none" }}
            >
              {currentYearData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="var(--theme-accent-primary)"
                  style={{
                    transition: "fill 0.2s ease-in-out",
                    cursor: "default",
                    outline: "none",
                  }}
                  onMouseEnter={(e: React.MouseEvent<SVGRectElement>) => {
                    e.currentTarget.style.fill = "var(--theme-accent-secondary)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<SVGRectElement>) => {
                    e.currentTarget.style.fill = "var(--theme-accent-primary)";
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}