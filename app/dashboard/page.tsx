import {
  fetchClvSegmentsSummary,
  fetchTopCustomersCLV,
  fetchAverageOrderSize,
  fetchRevenueByMonth,
  fetchCustomerPredictions,
} from "@/services/backend.server";
import DashboardGrid from "./DashboardGrid";

export default async function DashboardPage() {
  const [
    clvSegments,
    topCustomers,
    averageOrderSize,
    revenueByMonth,
    customerPredictions,
  ] = await Promise.all([
    fetchClvSegmentsSummary(),
    fetchTopCustomersCLV({ page: 1, per_page: 10 }),
    fetchAverageOrderSize({ year: 2025 }),
    fetchRevenueByMonth({ year: 2025 }),
    fetchCustomerPredictions({ page: 1, per_page: 10 }),
  ]);

  return (
    <DashboardGrid
      clvSegments={clvSegments}
      topCustomers={topCustomers}
      averageOrderSize={averageOrderSize}
      revenueByMonth={revenueByMonth}
      customerPredictions={customerPredictions}
    />
  );
}