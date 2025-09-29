import type { TrendDoc, Trend } from "@/types/trend";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

export function mapTrendDoc(
  doc: QueryDocumentSnapshot<TrendDoc>
): Trend {
  const d = doc.data();

  return {
    date: d.date.toDate().toISOString().split("T")[0],
    averageClvValue: d.average_clv_value,
  };
}