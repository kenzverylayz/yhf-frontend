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

const defaultColors = [
  "var(--theme-accent-primary)",    // Blue
  "var(--theme-accent-secondary)",  // Violet
  "var(--theme-accent-tertiary)",   // Cyan
  "var(--theme-accent-success)",    // Emerald
  "var(--theme-accent-warning)",    // Amber
];

export default function PieBreakdown({
  title = "CLV by Acquisition Channel",
  data = mockData,
  donut = true,
  showLegend = true,
  colors = defaultColors,
}: PieBreakdownProps) {
  const total = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <DashboardCard title={title}>
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  return (
                    <div style={{
                      backgroundColor: 'var(--theme-bg-card)',
                      border: '1px solid var(--theme-border-primary)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      boxShadow: 'var(--theme-shadow-card)'
                    }}>
                      <p style={{ color: 'var(--theme-text-primary)', margin: 0 }}>
                        {data.name}: <span style={{ color: 'var(--theme-accent-primary)' }}>${Number(data.value).toLocaleString()}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            {showLegend && (
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ 
                  color: "var(--theme-text-secondary)",
                  fontSize: '12px',
                  paddingTop: '8px'
                }}
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
              label={({ name, value }) => {
                const percentage = ((Number(value) / total) * 100).toFixed(0);
                return `${percentage}%`;
              }}
            >
              {data.map((_, i) => {
                const originalColor = colors[i % colors.length];
                const lighterColor = originalColor === 'var(--theme-accent-primary)' ? '#60A5FA' :
                                   originalColor === 'var(--theme-accent-secondary)' ? '#A78BFA' :
                                   originalColor === 'var(--theme-accent-tertiary)' ? '#22D3EE' :
                                   originalColor === 'var(--theme-accent-success)' ? '#34D399' :
                                   originalColor === 'var(--theme-accent-warning)' ? '#FCD34D' : originalColor;
                
                return (
                  <Cell 
                    key={i} 
                    fill={originalColor}
                    style={{
                      transition: 'fill 0.2s ease-in-out',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.fill = lighterColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.fill = originalColor;
                    }}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-7 text-center">
        <div className="text-2xl font-bold text-[var(--theme-text-primary)]">
          ${total.toLocaleString()}
        </div>
        <div className="text-sm text-[var(--theme-text-muted)]">
          Total CLV
        </div>
      </div>
    </DashboardCard>
  );
}