import { NextResponse } from "next/server";
import { fetchTopCustomersCLV } from "@/services/backend.server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? "1");
  const per_page = Number(searchParams.get("per_page") ?? "10");

  try {
    const customers = await fetchTopCustomersCLV({ page, per_page });
    return NextResponse.json({ page, per_page, customers });
  } catch (err: any) {
    console.error("Error fetching top customers by CLV:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to fetch top customers by CLV" },
      { status: 500 }
    );
  }
}