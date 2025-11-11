// types/revenueByMonth.ts
export type RevenueByMonthEntry = {
  month: string;              // e.g. "2025-01"
  total_revenue: number;      // e.g. 415981.7
};

export type RevenueByMonthDoc = RevenueByMonthEntry[];