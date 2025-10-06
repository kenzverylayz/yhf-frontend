"use client";

import React from "react";
import { DashboardCard } from "@/components/DashboardCard";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { TooltipProps } from "recharts";

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
  { range: "100–200", count: 18 },
  { range: "200–300", count: 25 },
  { range: "300–400", count: 10 },
  { range: "400+", count: 6 },
];

export default function CLVHistogram({
  title = "CLV Distribution",
  data = mockData,
  showGrid = false,
}: CLVHistogramProps) {
  const formatter: TooltipProps<number, string>["formatter"] = (value) => [
    String(value),
    "Count",
  ];

  return (
    <DashboardCard title={title}>
      <div className="h-64 w-full" style={{ outline: "none" }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis
              dataKey="range"
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
              contentStyle={{
                backgroundColor: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border-primary)",
                borderRadius: "8px",
                color: "var(--theme-text-primary)",
                boxShadow: "var(--theme-shadow-card)",
              }}
              cursor={false}
            />
            <Bar
              dataKey="count"
              fill="var(--theme-accent-primary)"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false} 
              style={{ cursor: "default", outline: "none" }}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="var(--theme-accent-primary)"
                  style={{
                    transition: "fill 0.2s ease-in-out",
                    cursor: "default",
                    outline: "none",
                  }}
                  onMouseEnter={(e: React.MouseEvent<SVGRectElement>) => {
                    e.currentTarget.style.fill = "#60A5FA";
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