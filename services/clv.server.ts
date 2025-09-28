import "server-only";
import { adminDb } from "@/lib/firebase.admin";
import { customerConverter } from "@/lib/firestore-converters";
import { mapCustomerDoc } from "@/services/mappers/customer.mapper";
import type { Customer, CustomerDoc } from "@/types/Customer";
import { mapSegmentsDoc } from "@/services/mappers/segment.mapper";
import type { ClVSegment, SegmentsDoc } from "@/types/segment";
import { mapTrendDoc } from "@/services/mappers/trend.mapper";
import type { Trend } from "@/types/trend";

export async function fetchTopCustomers(limitCount = 10): Promise<Customer[]> {
  const col = adminDb.collection("Customers").withConverter(customerConverter);

  const snap = await col
    .orderBy("CLV", "desc")
    .limit(limitCount)
    .get();

  return snap.docs.map(mapCustomerDoc);
}

export async function fetchCustomersPage(opts: {
  pageSize: number;
  orderBy?: "CLV" | "AOV" | "OrderCount";
  startAfterVal?: number;
}) {
  const { pageSize, orderBy = "CLV", startAfterVal } = opts;

  const col = adminDb.collection("Customers").withConverter(customerConverter);

  let q = col.orderBy(orderBy as keyof CustomerDoc, "desc").limit(pageSize);
  if (startAfterVal != null) q = q.startAfter(startAfterVal);

  const snap = await q.get();

  return {
    rows: snap.docs.map(mapCustomerDoc),
    nextCursor: snap.docs.at(-1)?.get(orderBy) as number | undefined,
  };
}

export async function fetchClvSegments(): Promise<ClVSegment[]> {
  const snap = await adminDb.collection("Segment").doc("CLV").get();
  const data = snap.data() as SegmentsDoc | undefined;

  return data ? mapSegmentsDoc(data) : [];
}

export async function fetchClvTrends(limitCount = 30): Promise<Trend[]> {
  const col = adminDb.collection("CLVTrends");

  const snap = await col
    .orderBy("date", "asc")
    .limit(limitCount)
    .get();

  return snap.docs.map(mapTrendDoc);
}