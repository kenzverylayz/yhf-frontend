"use client";

import React from "react";
import BasePieChart, { type PieData } from "@/components/BasePieChart";

const mockData: PieData[] = [
  { name: "Organic", value: 4200 },
  { name: "CPC", value: 3100 },
  { name: "Referral", value: 1900 },
  { name: "Email", value: 1200 },
  { name: "Partnership", value: 900 },
];

type PieBreakdownProps = {
  title?: string;
  data?: PieData[];
};

export default function PieBreakdown({
  title = "CLV by Acquisition Channel",
  data = mockData,
}: PieBreakdownProps) {
  return (
    <BasePieChart
      title={title}
      data={data}
      donut={true}
      showLegend={true}
      showTotal={true}
      totalLabel="Total CLV"
      tooltipFormatter={(value) => [`$${Number(value).toLocaleString()}`, 'CLV']}
    />
  );
}