"use client";

import React from "react";
import { DashboardCard } from "@/components/DashboardCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export type ClvBin = {
  range: string;
  count: number;
  };
  
type CLVHistogramProps = {
  title?: string;
  data?: ClvBin[];
  showGrid?: boolean;
};
  
const mockData: ClvBin[] = [
  { range: "0–100", count: 12 },
  { range: "100-200", count: 18 },
  { range: "200–300", count: 25 },
  { range: "300–400", count: 10 },
  { range: "400+", count: 6 },
];
  
export default function CLVHistogram({
  title = "CLV Distribution",
  data = mockData,
  showGrid = true,
}: CLVHistogramProps) {
  return (
    <DashboardCard title={title} bgColor="bg-indigo-900">
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="range" tickMargin={6} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}