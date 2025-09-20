"use client";

import React from "react";
import {DashboardCard} from "@/components/DashboardCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export type PieSlice = { name: string; value: number };

type PieBreakdownProps = {
  title?: string;
  data?: PieSlice[];
  donut?: boolean;
  showLegend?: boolean;
  colors?: string[];
};

const mockData: PieSlice[] = [
  { name: "Organic", value: 4200 },
  { name: "CPC", value: 3100 },
  { name: "Referral", value: 1900 },
  { name: "Email", value: 1200 },
  { name: "Partnership", value: 900 },
];

const defaultColors = ["#38bdf8", "#60a5fa", "#a78bfa", "#34d399", "#f59e0b"];

export default function PieBreakdown({
  title = "CLV by Acquisition Channel",
  data = mockData,
  donut = true,
  showLegend = true,
  colors = defaultColors,
}: PieBreakdownProps) {
  const total = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <DashboardCard title={title} bgColor="bg-indigo-900">
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              formatter={(val: number, name: string) => [
                Number(val).toLocaleString(),
                name,
              ]}
            />
            {showLegend && (
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ color: "rgba(255,255,255,0.85)" }}
              />
            )}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={donut ? 60 : 0}
              stroke="none"
              labelLine={false}
              label={({ name, value }) =>
                `${name} ${((Number(value) / total) * 100).toFixed(0)}%`
              }
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-sm text-blue-200">
        Total: ${total.toLocaleString()}
      </div>
    </DashboardCard>
  );
}