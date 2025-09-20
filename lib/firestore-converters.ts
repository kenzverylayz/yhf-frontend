import type { CustomerDoc } from "@/types/Customer";

export const customerConverter: FirebaseFirestore.FirestoreDataConverter<CustomerDoc> = {
  toFirestore: (data) => data,
  fromFirestore: (snap) => snap.data() as CustomerDoc,
};