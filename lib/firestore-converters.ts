import type { CustomerDoc } from "@/types/customer";
import type { TrendDoc } from "@/types/trend"
import type { FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
export const customerConverter: FirebaseFirestore.FirestoreDataConverter<CustomerDoc> = {
  toFirestore: (data) => data,
  fromFirestore: (snap) => snap.data() as CustomerDoc,
};
export const trendConverter: FirestoreDataConverter<TrendDoc> = {
  toFirestore: (v: TrendDoc) => v as any,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as TrendDoc,
};