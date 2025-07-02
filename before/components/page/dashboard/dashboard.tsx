import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import DashboardClent from "./data/dashboardClient";

export default function Dashboard() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">사이트 통계</h1>
      <DashboardClent />
    </ContentsWrapper>
  );
}
