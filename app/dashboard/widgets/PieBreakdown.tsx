"use client";

import React from "react";
import BasePieChart, { type PieData } from "@/components/BasePieChart";

const mockData: PieData[] = [
  { name: "Organic", value: 420 },
  { name: "CPC", value: 310 },
  { name: "Referral", value: 190 },
  { name: "Email", value: 120 },
  { name: "Partnership", value: 90 },
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
      totalLabel="Average CLV"
      tooltipFormatter={(value) => [`$${Number(value).toLocaleString()}`, 'CLV']}
    />
  );
}