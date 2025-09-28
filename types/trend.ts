export type TrendDoc = {
  date: FirebaseFirestore.Timestamp;
  average_clv_value: number;
};
  
export type Trend = {
  date: string;
  averageClvValue: number;
};