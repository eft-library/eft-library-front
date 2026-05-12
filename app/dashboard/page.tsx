import { DashboardRoute } from "@/features/dashboard/route";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "페이지 통계",
  description: "EFT Library 페이지 방문과 API 사용 통계를 확인할 수 있는 대시보드입니다.",
  path: "/dashboard",
  noIndex: true,
});

export default function Page() {
  return <DashboardRoute />;
}
