import type { SegmentsDoc, ClvSegment } from "@/types/segment";

export function mapSegmentsDoc(doc: SegmentsDoc): ClvSegment[] {
  return [
    { name: "High Spender", value: doc.highspender },
    { name: "Mid Spender", value: doc.midspender },
    { name: "Low Spender", value: doc.lowspender },
    { name: "One-time Spender", value: doc.onetimespender },
  ];
}