import CLV from "./widgets/CLV";
import CLVChart from "./widgets/CLVChart";
import PieBreakdown from "./widgets/PieBreakdown";
import { fetchTopCustomers } from "@/services/clv.server";

export default async function DashboardPage() {
    const topCustomers = await fetchTopCustomers(10);
    return (
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CLV initialData = {topCustomers} />
        <CLVChart />
        <PieBreakdown/>
        </main>
    );
}