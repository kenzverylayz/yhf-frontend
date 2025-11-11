import { NextResponse } from "next/server";
import { fetchAverageOrderSize } from "@/services/backend.server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const yearParam = searchParams.get("year");
  const year = yearParam ? Number(yearParam) : undefined;

  try {
    const data = await fetchAverageOrderSize({ year });
    return NextResponse.json({ year, data });
  } catch (err: any) {
    console.error("Error fetching average order size:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to fetch average order size" },
      { status: 500 }
    );
  }
}