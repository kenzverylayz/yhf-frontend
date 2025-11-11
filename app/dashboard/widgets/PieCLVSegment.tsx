// app/dashboard/widgets/PieCLVSegment.tsx
"use client";

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
  const chartData = data.map((seg) => ({
    name: seg.segment,      
    value: seg.count,
  }));

  return (
    <BasePieChart
      title={title}
      data={chartData}
      donut
      showLegend
      showTotal={false}
    />
  );
}