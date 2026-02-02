import StoryDetailData from "./_components/story-detail-data";

export const metadata = {
  title: "타르코프 스토리 - EFT Library",
  description:
    "Escape from Tarkov(타르코프)의 플레이 스토리를 흐름 중심으로 정리한 가이드입니다. 선행 조건, 목표, 진행 가이드를 통해 스토리 분기와 전체 루트를 한눈에 파악할 수 있습니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 스토리 - EFT Library",
    description:
      "Escape from Tarkov(타르코프)의 스토리를 단계별 흐름으로 정리하여, 선행 조건부터 목표와 진행 가이드까지 자연스럽게 이어지는 플레이 루트를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/story",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 스토리 - EFT Library",
    description:
      "타르코프의 스토리를 중심으로 구성된 진행 가이드. 분기 구조와 플레이 흐름을 따라 스토리를 이해하고 완주할 수 있도록 돕습니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/story",
  },
  alternates: {
    canonical: "https://eftlibrary.com/story",
  },
};

export default function Story() {
  return <StoryDetailData />;
}
