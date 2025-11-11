import { NextResponse } from "next/server";
import { fetchRevenueByMonth } from "@/services/backend.server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const yearParam = searchParams.get("year");
  const year = yearParam ? Number(yearParam) : undefined;

  try {
    const data = await fetchRevenueByMonth({ year });
    return NextResponse.json({ year, data });
  } catch (err: any) {
    console.error("Error fetching revenue by month:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to fetch revenue by month" },
      { status: 500 }
    );
  }
}