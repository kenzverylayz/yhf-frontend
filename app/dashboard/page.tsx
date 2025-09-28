import CLV from "./widgets/CLV";
import CLVChart from "./widgets/CLVChart";
import PieBreakdown from "./widgets/PieBreakdown";
import CLVHistogram from "./widgets/CLVHistogram";
import { fetchTopCustomers } from "@/services/clv.server";
import CLVPieChart from "./widgets/PieCLVSegment";
import { fetchClvSegments } from "@/services/clv.server";

export default async function DashboardPage() {
    const topCustomers = await fetchTopCustomers(10);
    const clvSegments = await fetchClvSegments();

    return (
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CLV initialData = {topCustomers} />
        <CLVChart />
        <PieBreakdown/>
        <CLVHistogram />
        <CLVPieChart data={clvSegments} />
        </main>
    );
}