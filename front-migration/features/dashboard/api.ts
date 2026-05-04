import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { DashboardAnalysisResponse } from "@/types/api/dashboard";

export interface DashboardAnalysisParams {
  startDate?: string;
  endDate?: string;
}

export function getDashboardAnalysis(params: DashboardAnalysisParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.startDate) {
    searchParams.set("start_date", `${params.startDate} 00:00:00`);
  }

  if (params.endDate) {
    searchParams.set("end_date", `${params.endDate} 23:59:59`);
  }

  const query = searchParams.toString();
  const endpoint = query
    ? `${apiEndpoints.dashboardAnalysis}?${query}`
    : apiEndpoints.dashboardAnalysis;

  return apiGet<DashboardAnalysisResponse>(endpoint, {
    revalidate: 60 * 5,
  });
}
