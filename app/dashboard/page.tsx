import CLV from "./widgets/CLV";
import RevenueByMonth from "./widgets/RevenueByMonth";
import PieBreakdown from "./widgets/PieBreakdown";
import AverageOrderSize from "./widgets/CLVHistogram";
import CustomerChurnValuePredictionTable from "./widgets/CustomerChurnValuePredictionTable";
import { fetchTopCustomers } from "@/services/clv.server";
import CLVPieChart from "./widgets/PieCLVSegment";
import { fetchClvSegments } from "@/services/clv.server";

export default async function DashboardPage() {
    const topCustomers = await fetchTopCustomers(10);
    const clvSegments = await fetchClvSegments();

    return (
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Top row: Top Customers by CLV (spans 2 columns) */}
            <div className="md:col-span-2">
                <CLV initialData={topCustomers} />
            </div>
            
            {/* Second row: CLV Acquisition Channel, Average Order Size per Month, Revenue by Month */}
            <PieBreakdown />
            <AverageOrderSize />
            <RevenueByMonth />
            
            {/* Third row: CLV Segments */}
            <CLVPieChart data={clvSegments} />
            
            {/* Fourth row: Customer Churn & Value Prediction Table (full width) */}
            <div className="col-span-full">
                <CustomerChurnValuePredictionTable />
            </div>
        </main>
    );
}