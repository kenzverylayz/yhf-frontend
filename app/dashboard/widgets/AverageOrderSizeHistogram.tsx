"use client";

import React, { useState, useMemo } from "react";
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

export type OrderSizePoint = {
  month: string;
  averageOrderSize: number;
};

type AverageOrderSizeProps = {
  title?: string;
  data?: Record<number, OrderSizePoint[]>;
  showGrid?: boolean;
};

// Mock data for different years
const mockData: Record<number, OrderSizePoint[]> = {
  2023: [
    { month: "Jan", averageOrderSize: 2.3 },
    { month: "Feb", averageOrderSize: 2.8 },
    { month: "Mar", averageOrderSize: 2.5 },
    { month: "Apr", averageOrderSize: 3.1 },
    { month: "May", averageOrderSize: 2.7 },
    { month: "Jun", averageOrderSize: 3.4 },
    { month: "Jul", averageOrderSize: 3.0 },
    { month: "Aug", averageOrderSize: 3.6 },
    { month: "Sep", averageOrderSize: 3.2 },
    { month: "Oct", averageOrderSize: 3.8 },
    { month: "Nov", averageOrderSize: 3.5 },
    { month: "Dec", averageOrderSize: 4.1 },
  ],
  2024: [
    { month: "Jan", averageOrderSize: 4.2 },
    { month: "Feb", averageOrderSize: 4.6 },
    { month: "Mar", averageOrderSize: 4.4 },
    { month: "Apr", averageOrderSize: 4.8 },
    { month: "May", averageOrderSize: 4.5 },
    { month: "Jun", averageOrderSize: 5.0 },
    { month: "Jul", averageOrderSize: 4.8 },
    { month: "Aug", averageOrderSize: 5.2 },
    { month: "Sep", averageOrderSize: 5.0 },
    { month: "Oct", averageOrderSize: 5.4 },
    { month: "Nov", averageOrderSize: 5.2 },
    { month: "Dec", averageOrderSize: 5.6 },
  ],
  2025: [
    { month: "Jan", averageOrderSize: 5.8 },
    { month: "Feb", averageOrderSize: 6.2 },
    { month: "Mar", averageOrderSize: 6.0 },
    { month: "Apr", averageOrderSize: 6.4 },
    { month: "May", averageOrderSize: 6.2 },
    { month: "Jun", averageOrderSize: 6.6 },
    { month: "Jul", averageOrderSize: 6.4 },
    { month: "Aug", averageOrderSize: 6.8 },
    { month: "Sep", averageOrderSize: 6.6 },
    { month: "Oct", averageOrderSize: 7.0 },
    { month: "Nov", averageOrderSize: 6.8 },
    { month: "Dec", averageOrderSize: 7.2 },
  ],
};

export default function AverageOrderSize({
  title = "Average Order Size per Month",
  data = mockData,
  showGrid = false,
}: AverageOrderSizeProps) {
  const [selectedYear, setSelectedYear] = useState(2024);

  const currentYearData = useMemo(() => {
    return data[selectedYear] || [];
  }, [data, selectedYear]);

  const availableYears = useMemo(() => {
    return Object.keys(data).map(Number).sort();
  }, [data]);

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
          years={availableYears}
        />
      }
    >
      <div className="flex-1 min-h-0 w-full flex items-center justify-center" style={{ outline: "none" }}>
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