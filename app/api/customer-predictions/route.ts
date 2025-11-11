import { NextResponse } from "next/server";
import { fetchCustomerPredictions } from "@/services/backend.server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "1");
  const per_page = Number(searchParams.get("per_page") ?? "10");
  const name = searchParams.get("name") ?? undefined;
  const risk_level = searchParams.get("risk_level") ?? undefined;
  const clv_segment = searchParams.get("clv_segment") ?? undefined;

  try {
    const customers = await fetchCustomerPredictions({
      page,
      per_page,
      name,
      risk_level,
      clv_segment,
    });

    return NextResponse.json({ page, per_page, customers });
  } catch (err: any) {
    console.error("Error fetching customer predictions:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to fetch customer predictions" },
      { status: 500 }
    );
  }
}