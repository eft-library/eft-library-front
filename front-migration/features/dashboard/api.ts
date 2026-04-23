import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { DashboardAnalysisResponse } from "@/types/api/dashboard";

export function getDashboardAnalysis() {
  return apiGet<DashboardAnalysisResponse>(apiEndpoints.dashboardAnalysis, {
    revalidate: 60 * 5,
  });
}
