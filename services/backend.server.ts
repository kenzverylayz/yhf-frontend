import "server-only";
import { Customer } from "@/types/customer";
import { ClVSegment, SegmentsDoc } from "@/types/segment";
import { AverageOrderSizeDoc } from "@/types/averageOrderSize";
import { RevenueByMonthDoc } from "@/types/revenueByMonth";

const API_BASE = process.env.YHF_BACKEND_URL

type ApiError = {
  status: number;
  message: string;
};

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = (await res.json()) as { detail?: string };
      if (data?.detail) message = data.detail;
    } catch {
    }

    const err: ApiError = { status: res.status, message };
    throw err;
  }

  return res.json() as Promise<T>;
}

export async function fetchClvSegmentsSummary(): Promise<SegmentsDoc> {
  return apiFetch<SegmentsDoc>("/clv-segments-summary");
}

type TopCustomersApiResponse = {
  customers: Customer[];
  page: number;
  per_page: number;
  total_customers: number;
  total_pages: number;
};

export async function fetchTopCustomersCLV(params?: {
  page?: number;
  per_page?: number;
}): Promise<Customer[]> {
  const searchParams = new URLSearchParams();
  if (params?.page !== undefined) searchParams.set("page", String(params.page));
  if (params?.per_page !== undefined) searchParams.set("per_page", String(params.per_page));

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const res = await apiFetch<TopCustomersApiResponse>(`/top-customers-clv${queryString}`);
  return res.customers;
}


type AverageOrderSizeApiResponse = {
  year: number;
  data: AverageOrderSizeDoc;
};

export async function fetchAverageOrderSize(
  params?: { year?: number }
): Promise<AverageOrderSizeDoc> {
  const searchParams = new URLSearchParams();
  if (params?.year !== undefined) searchParams.set("year", String(params.year));

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const res = await apiFetch<AverageOrderSizeApiResponse>(
    `/average-order-size${queryString}`
  );

  return res.data;
}


type CustomerPredictionsApiResponse = {
  page: number;
  per_page: number;
  total_customers: number;
  total_pages: number;
  customers: Customer[];
};

export async function fetchCustomerPredictions(params?: {
  page?: number;
  per_page?: number;
  name?: string;
  risk_level?: string;
  clv_segment?: string;
}): Promise<Customer[]> {
  const searchParams = new URLSearchParams();
  if (params?.page !== undefined) searchParams.set("page", String(params.page));
  if (params?.per_page !== undefined) searchParams.set("per_page", String(params.per_page));
  if (params?.name) searchParams.set("name", params.name);
  if (params?.risk_level) searchParams.set("risk_level", params.risk_level);
  if (params?.clv_segment) searchParams.set("clv_segment", params.clv_segment);

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const res = await apiFetch<CustomerPredictionsApiResponse>(
    `/customer-predictions${queryString}`
  );
  return res.customers;
}

type RevenueByMonthApiResponse = {
  year: number;
  data: RevenueByMonthDoc;
};

export async function fetchRevenueByMonth(
  params?: { year?: number }
): Promise<RevenueByMonthDoc> {
  const searchParams = new URLSearchParams();
  if (params?.year !== undefined) {
    searchParams.set("year", String(params.year));
  }
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const res = await apiFetch<RevenueByMonthApiResponse>(
    `/revenue-by-month${queryString}`
  );

  return res.data; // ✅ just the array of { month, total_revenue }
}

export { apiFetch };