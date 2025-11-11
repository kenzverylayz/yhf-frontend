export type ClVSegment = {
  segment: "High" | "Mid" | "Low";
  count: number;
  percentage: number;
};

export type SegmentsDoc = {
  total_customers: number;
  segments: ClVSegment[];
};