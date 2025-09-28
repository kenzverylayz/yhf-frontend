"use client";

import React from "react";
import {DashboardCard} from "@/components/DashboardCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export type ClvPoint = {
  date: string; 
  clv: number;  
};

type CLVChartProps = {
  title?: string;
  data?: ClvPoint[];
  showGrid?: boolean;
};

const mockData: ClvPoint[] = [
  { date: "Sep 01", clv: 1200 },
  { date: "Sep 02", clv: 1320 },
  { date: "Sep 03", clv: 1280 },
  { date: "Sep 04", clv: 1400 },
  { date: "Sep 05", clv: 1350 },
  { date: "Sep 06", clv: 1425 },
  { date: "Sep 07", clv: 1500 },
  { date: "Sep 08", clv: 1470 },
  { date: "Sep 09", clv: 1600 },
  { date: "Sep 10", clv: 1550 },
  { date: "Sep 11", clv: 1620 },
  { date: "Sep 12", clv: 1700 },
  { date: "Sep 13", clv: 1650 },
  { date: "Sep 14", clv: 1725 },
];

export default function CLVChart({
  title = "CLV Trend (Last 14 Days)",
  data = mockData,
  showGrid = true,
}: CLVChartProps) {
  return (
    <DashboardCard title={title}>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--theme-border-primary)"
                opacity={0.3}
              />
            )}
            <XAxis 
              dataKey="date" 
              tickMargin={6}
              tick={{ fill: 'var(--theme-text-muted)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--theme-border-primary)' }}
              interval={1}
            />
            <YAxis 
              tick={{ fill: 'var(--theme-text-muted)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--theme-border-primary)' }}
            />
            <Tooltip 
              formatter={(value, name) => [value, 'CLV']}
              contentStyle={{
                backgroundColor: 'var(--theme-bg-card)',
                border: '1px solid var(--theme-border-primary)',
                borderRadius: '8px',
                color: 'var(--theme-text-primary)',
                boxShadow: 'var(--theme-shadow-card)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="clv" 
              stroke="var(--theme-accent-primary)" 
              dot={false} 
              strokeWidth={3}
              activeDot={{ 
                r: 6, 
                fill: 'var(--theme-accent-primary)',
                stroke: 'var(--theme-bg-primary)',
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}