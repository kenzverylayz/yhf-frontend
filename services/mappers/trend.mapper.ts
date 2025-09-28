import type { TrendDoc, Trend } from "@/types/trend";

export function mapTrendDoc(
  doc: FirebaseFirestore.QueryDocumentSnapshot<TrendDoc>
): Trend {
  const d = doc.data();

  return {
    date: d.date.toDate().toISOString().split("T")[0],
    averageClvValue: d.average_clv_value,
  };
}