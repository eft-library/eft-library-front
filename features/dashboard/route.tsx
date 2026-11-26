import { DashboardPage } from "@/features/dashboard/components/dashboard-page";
import { getDashboardAnalysis } from "@/features/dashboard/api";
import { Temporal } from "@js-temporal/polyfill";
import { connection } from "next/server";

export async function DashboardRoute() {
  await connection();

  const today = Temporal.Now.plainDateISO("Asia/Seoul");
  const startDate = today.subtract({ days: 6 }).toString();
  const endDate = today.toString();
  const dashboard = await getDashboardAnalysis({ startDate, endDate });

  return (
    <DashboardPage
      initialDashboard={dashboard}
      initialStartDate={startDate}
      initialEndDate={endDate}
    />
  );
}
