"use client";

import React from "react";
import { DashboardCard } from "@/components/DashboardCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { ClvSegment } from "@/types/segment";

type CLVPieChartProps = {
  title?: string;
  data: ClvSegment[];
  donut?: boolean;
  showLegend?: boolean;
  colors?: string[];
};

const defaultColors = ["#38bdf8", "#60a5fa", "#a78bfa", "#34d399"];

export default function CLVPieChart({
  title = "CLV Segments",
  data,
  donut = true,
  showLegend = true,
  colors = defaultColors,
}: CLVPieChartProps) {
  const total = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <DashboardCard title={title} bgColor="bg-indigo-900">
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              formatter={(val: number, name: string) => [val + "%", name]}
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
                `${name} ${((value / total) * 100).toFixed(0)}%`
              }
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
