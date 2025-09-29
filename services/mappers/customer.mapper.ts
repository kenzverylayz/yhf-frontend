import type { CustomerDoc, Customer } from "@/types/customer";

export function mapCustomerDoc(
  doc: FirebaseFirestore.QueryDocumentSnapshot<CustomerDoc>
): Customer {
  const d = doc.data();

  const firstTs = d["First Ordered"] ?? null;
  const lastTs  = d["Last Ordered"] ?? null;

  return {
    id: doc.id,
    aov: d.AOV,
    clv: d.CLV,
    customerId: d["Customer ID"],
    email: d.Email,
    name: d.Name,
    membership: d.Membership,

    orderCount: d["Order Count"],
    orderIntervalDays: d["Order Interval (Days)"],

    fmSegment: d["FM Segment"],
    rfSegment: d["RF Segment"],
    rfmSegment: d["RFM Segment"],
    rmSegment: d["RM Segment"],
    rfm: d.RFM,

    firstOrdered: firstTs ? firstTs.toDate().toISOString() : null,
    lastOrdered:  lastTs  ? lastTs.toDate().toISOString()  : null,
  };
}