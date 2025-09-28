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
    <DashboardCard title={title}>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }} isAnimationActive={false}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--theme-border-primary)"
                opacity={0.3}
              />
            )}
            <XAxis 
              dataKey="range" 
              tickMargin={6}
              tick={{ fill: 'var(--theme-text-muted)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--theme-border-primary)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--theme-text-muted)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--theme-border-primary)' }}
            />
            <Tooltip 
              formatter={(value, name) => [value, 'Count']}
              contentStyle={{
                backgroundColor: 'var(--theme-bg-card)',
                border: '1px solid var(--theme-border-primary)',
                borderRadius: '8px',
                color: 'var(--theme-text-primary)',
                boxShadow: 'var(--theme-shadow-card)'
              }}
              cursor={false}
            />
            <Bar 
              dataKey="count" 
              fill="var(--theme-accent-primary)"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
              activeBar={false}
              style={{
                cursor: 'pointer'
              }}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill="var(--theme-accent-primary)"
                  style={{
                    transition: 'fill 0.2s ease-in-out',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.fill = '#60A5FA'; // Lighter blue
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.fill = 'var(--theme-accent-primary)'; // Original blue
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