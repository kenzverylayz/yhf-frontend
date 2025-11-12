// app/dashboard/widgets/PieCLVSegment.tsx
"use client";

import BasePieChart from "@/components/BasePieChart";
import type { ClVSegment } from "@/types/segment";

type CLVPieChartProps = {
  title?: string;
  data: ClVSegment[];
};

// Color mapping by segment name
const SEGMENT_COLOR_MAP: Record<string, string> = {
  "High": "#FF6DC7",  // Primary theme pink (for High segment)
  "Mid": "#FF9DD5",   // Medium pink - between low and high (for Mid segment)
  "Low": "#FBCFE8",   // Light pink (for Low segment)
};

const SEGMENT_HOVER_COLOR_MAP: Record<string, string> = {
  "High": "#FFA6DD",  // Lighter primary pink on hover
  "Mid": "#FFB3E0",   // Lighter medium pink on hover
  "Low": "#FCE7F3",   // Even lighter pink on hover
};

// Order for legend display: High, Mid, Low
const SEGMENT_ORDER = ["High", "Mid", "Low"];

export default function CLVPieChart({
  title = "CLV Segments",
  data,
}: CLVPieChartProps) {
  // Sort data by segment order: High, Mid, Low
  const sortedData = [...data].sort((a, b) => {
    const aIndex = SEGMENT_ORDER.indexOf(a.segment);
    const bIndex = SEGMENT_ORDER.indexOf(b.segment);
    // If segment not found in order, put it at the end
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const chartData = sortedData.map((seg) => ({
    name: seg.segment,      
    value: seg.count,
  }));

  // Create color arrays based on sorted order
  const colors = chartData.map(seg => SEGMENT_COLOR_MAP[seg.name] || "#FF6DC7");
  const hoverColors = chartData.reduce((acc, seg) => {
    const color = SEGMENT_COLOR_MAP[seg.name];
    if (color) {
      acc[color] = SEGMENT_HOVER_COLOR_MAP[seg.name] || color;
    }
    return acc;
  }, {} as Record<string, string>);

  return (
    <BasePieChart
      title={title}
      data={chartData}
      donut
      showLegend
      showTotal={false}
      colors={colors}
      hoverColors={hoverColors}
    />
  );
}