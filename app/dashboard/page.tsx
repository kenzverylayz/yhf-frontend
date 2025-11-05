import { fetchTopCustomers } from "@/services/clv.server";
import { fetchClvSegments } from "@/services/clv.server";
import DashboardGrid from "./DashboardGrid";

export default async function DashboardPage() {
    const topCustomers = await fetchTopCustomers(12);
    console.log('Dashboard fetched customers:', topCustomers.length, 'customers');
    const clvSegments = await fetchClvSegments();

    return <DashboardGrid topCustomers={topCustomers} clvSegments={clvSegments} />;
}