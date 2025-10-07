"use client";

import React from "react";
import { DashboardCard } from "@/components/DashboardCard";

type PlaceholderPieChartProps = {
  title?: string;
};

export default function PlaceholderPieChart({
  title = "Placeholder Chart",
}: PlaceholderPieChartProps) {
  return (
    <DashboardCard title={title}>
      <div className="h-64 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-4xl text-gray-400">📊</span>
          </div>
          <p className="text-gray-400 text-sm">
            Chart placeholder
          </p>
          <p className="text-gray-500 text-xs mt-1">
            To be implemented
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
