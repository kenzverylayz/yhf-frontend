export type CustomerDoc = {
  AOV: number;
  CLV: number;
  "Customer ID": string;
  Email: string;
  Membership: string;
  Name: string;

  "Order Count": number;
  "Order Interval (Days)": number;

  "FM Segment": string;
  "RF Segment": string;
  "RFM Segment": string;
  "RM Segment": string;
  RFM: number;

  "First Ordered"?: FirebaseFirestore.Timestamp | null;
  "Last Ordered"?: FirebaseFirestore.Timestamp | null;
};

export type Customer = {
  id: string;
  aov: number;
  clv: number;
  customerId: string;
  email: string;
  name: string;
  membership: string;

  orderCount: number;
  orderIntervalDays: number;

  fmSegment: string;
  rfSegment: string;
  rfmSegment: string;
  rmSegment: string;
  rfm: number;

  firstOrdered: string | null; 
  lastOrdered: string | null; 
};