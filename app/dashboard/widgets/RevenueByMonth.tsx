"use client";

import React, { useState, useMemo } from "react";
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

export type RevenuePoint = {
  month: string;
  revenue: number;
};

type RevenueByMonthProps = {
  title?: string;
  data?: Record<number, RevenuePoint[]>;
  showGrid?: boolean;
};

// Mock data for different years
const mockData: Record<number, RevenuePoint[]> = {
  2023: [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 13200 },
    { month: "Mar", revenue: 12800 },
    { month: "Apr", revenue: 14500 },
    { month: "May", revenue: 13800 },
    { month: "Jun", revenue: 15200 },
    { month: "Jul", revenue: 14800 },
    { month: "Aug", revenue: 16200 },
    { month: "Sep", revenue: 15800 },
    { month: "Oct", revenue: 17500 },
    { month: "Nov", revenue: 16800 },
    { month: "Dec", revenue: 18200 },
  ],
  2024: [
    { month: "Jan", revenue: 18900 },
    { month: "Feb", revenue: 19500 },
    { month: "Mar", revenue: 19200 },
    { month: "Apr", revenue: 20800 },
    { month: "May", revenue: 20100 },
    { month: "Jun", revenue: 21500 },
    { month: "Jul", revenue: 21200 },
    { month: "Aug", revenue: 22800 },
    { month: "Sep", revenue: 22400 },
    { month: "Oct", revenue: 23500 },
    { month: "Nov", revenue: 23100 },
    { month: "Dec", revenue: 24500 },
  ],
  2025: [
    { month: "Jan", revenue: 25200 },
    { month: "Feb", revenue: 25800 },
    { month: "Mar", revenue: 25500 },
    { month: "Apr", revenue: 26800 },
    { month: "May", revenue: 26200 },
    { month: "Jun", revenue: 27500 },
    { month: "Jul", revenue: 27200 },
    { month: "Aug", revenue: 28500 },
    { month: "Sep", revenue: 28100 },
    { month: "Oct", revenue: 29200 },
    { month: "Nov", revenue: 28800 },
    { month: "Dec", revenue: 30000 },
  ],
};

export default function RevenueByMonth({
  title = "Revenue by Month",
  data = mockData,
  showGrid = false,
}: RevenueByMonthProps) {
  const [selectedYear, setSelectedYear] = useState(2024);

  const currentYearData = useMemo(() => {
    return data[selectedYear] || [];
  }, [data, selectedYear]);

  const availableYears = useMemo(() => {
    return Object.keys(data).map(Number).sort();
  }, [data]);

  return (
    <DashboardCard 
      title={title}
      headerActions={
        <YearFilter
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          years={availableYears}
        />
      }
    >
      
      <div className="h-64 w-full flex items-center justify-center" style={{ outline: "none" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentYearData} margin={{ top: 8, right: 30, bottom: 0, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border-primary)" />}
            
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
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
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
              dot={false}
              strokeWidth={3}
              activeDot={{
                r: 6,
                fill: "#60A5FA",
                stroke: "var(--theme-bg-primary)",
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
