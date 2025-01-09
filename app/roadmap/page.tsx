import Roadmap from "@/components/page/roadmap/roadmap";

export const metadata = {
  title: "타르코프 퀘스트 로드맵 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 전체 퀘스트를 플로우 차트 형식으로 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 퀘스트 로드맵 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 전체 퀘스트를 플로우 차트 형식으로 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/roadmap",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 퀘스트 로드맵 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 전체 퀘스트를 플로우 차트 형식으로 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/roadmap",
  },
};

export default function RoadmapPage() {
  return <Roadmap />;
}
