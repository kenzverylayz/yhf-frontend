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

// Standardized color palette for all pie charts
const STANDARD_COLORS = [
  "var(--theme-accent-primary)",    // Blue
  "var(--theme-accent-secondary)",  // Violet
  "var(--theme-accent-tertiary)",   // Cyan
  "var(--theme-accent-success)",    // Emerald
  "var(--theme-accent-warning)",    // Amber
];

// Color mapping for hover effects
const HOVER_COLORS: Record<string, string> = {
  "var(--theme-accent-primary)": "#60A5FA",
  "var(--theme-accent-secondary)": "#A78BFA", 
  "var(--theme-accent-tertiary)": "#22D3EE",
  "var(--theme-accent-success)": "#34D399",
  "var(--theme-accent-warning)": "#FCD34D",
};

export type PieData = {
  name: string;
  value: number;
};

type BasePieChartProps = {
  title: string;
  data: PieData[];
  donut?: boolean;
  showLegend?: boolean;
  showTotal?: boolean;
  totalLabel?: string;
  tooltipFormatter?: (value: number, name: string) => [string, string];
  height?: string;
};

export default function BasePieChart({
  title,
  data,
  donut = true,
  showLegend = true,
  showTotal = false,
  totalLabel = "Total",
  tooltipFormatter,
  height = "h-96",
}: BasePieChartProps) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const colors = STANDARD_COLORS.slice(0, data.length);

  // Default tooltip formatter
  const defaultTooltipFormatter = (value: number, name: string) => {
    const percentage = ((value / total) * 100).toFixed(0);
    return [`${percentage}%`, name];
  };

  const tooltipContent = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const formatter = tooltipFormatter || defaultTooltipFormatter;
      const [formattedValue, formattedName] = formatter(data.value, data.name);
      
      return (
        <div style={{
          backgroundColor: 'var(--theme-bg-card)',
          border: '1px solid var(--theme-border-primary)',
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: 'var(--theme-shadow-card)'
        }}>
          <p style={{ color: 'var(--theme-text-primary)', margin: 0 }}>
            {data.name}: <span style={{ color: 'var(--theme-accent-primary)' }}>{formattedValue}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardCard title={title} fullHeight>
      <div className={`flex-1 min-h-0 w-full flex flex-col`} style={{ outline: 'none' }}>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={tooltipContent} />
            
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
              label={({ value }) => {
                const percentage = ((value as number/ total) * 100).toFixed(0);
                return `${percentage}%`;
              }}
            >
              {data.map((_, i) => {
                const originalColor = colors[i % colors.length];
                const lighterColor = HOVER_COLORS[originalColor] || originalColor;
                
                return (
                  <Cell 
                    key={i} 
                    fill={originalColor}
                    style={{
                      transition: 'fill 0.2s ease-in-out',
                      cursor: 'default',
                      outline: 'none'
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

        {showTotal && (
          <div className="mt-4 text-center flex-shrink-0">
            <div className="text-2xl font-bold text-[var(--theme-text-primary)]">
              ${total.toLocaleString()}
            </div>
            <div className="text-sm text-[var(--theme-text-muted)]">
              {totalLabel}
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
