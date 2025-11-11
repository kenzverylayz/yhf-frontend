export type Customer = {
  // Common identifiers
  id: number;
  customerId?: number;

  // Basic customer info
  name: string;
  email: string;
  membership?: string;

  // Order metrics
  orderCount?: number;
  averageOrderValue?: number;
  lifetimeCustomerValue?: number;
  orderIntervalDays?: number | null;
  firstOrdered?: string | null;
  lastOrdered?: string | null;

  // Prediction-related fields (from /customer-predictions)
  churn_probability?: number;
  risk_level?: "Low" | "Medium" | "High";
  predicted_clv?: number;
  clv_segment?: "Low" | "Medium" | "High";
};