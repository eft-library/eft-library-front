import { RoadmapNewRoute } from "@/features/roadmap-new/route";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 퀘스트 로드맵",
  description: "Escape from Tarkov 트레이더별 퀘스트 흐름과 진행 상태를 로드맵으로 확인할 수 있습니다.",
  path: "/roadmap-new",
});

export default function Page() {
  return <RoadmapNewRoute />;
}
