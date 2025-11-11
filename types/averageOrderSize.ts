// types/averageOrderSize.ts
export type AverageOrderSizeEntry = {
  month: string;                // e.g. "2025-01"
  average_order_size: number;   // e.g. 1.73
};

export type AverageOrderSizeDoc = AverageOrderSizeEntry[];