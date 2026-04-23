import { DashboardPage } from "@/features/dashboard/components/dashboard-page";
import { getDashboardAnalysis } from "@/features/dashboard/api";

export async function DashboardRoute() {
  const dashboard = await getDashboardAnalysis();

  return <DashboardPage dashboard={dashboard} />;
}
