import type { SegmentsDoc, ClVSegment } from "@/types/segment";

export function mapSegmentsDoc(doc: SegmentsDoc): ClVSegment[] {
  return [
    { name: "High Spender", value: doc.highspender },
    { name: "Mid Spender", value: doc.midspender },
    { name: "Low Spender", value: doc.lowspender },
    { name: "One-time Spender", value: doc.onetimespender },
  ];
}