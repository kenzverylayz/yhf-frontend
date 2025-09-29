"use client";

import React from "react";
import BasePieChart from "@/components/BasePieChart";
import type { ClVSegment } from "@/types/segment";

type CLVPieChartProps = {
  title?: string;
  data: ClVSegment[];
};

export default function CLVPieChart({
  title = "CLV Segments",
  data,
}: CLVPieChartProps) {
  return (
    <BasePieChart
      title={title}
      data={data}
      donut={true}
      showLegend={true}
      showTotal={false}
    />
  );
}
