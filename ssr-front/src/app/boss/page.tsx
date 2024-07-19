import BossMain from "./contents/bossMain";

export const metadata = {
  title: "보스 | EFT Library",
  description: "EFT Library",
  keywords: [
    "tarkov",
    "타르코프 퀘스트 공략",
    "타르코프 지도",
    "타르코프",
    "타르코프 정보",
    "타르코프 퀘스트",
    "타르코프 공략",
    "타르코프 하이드아웃 정보",
  ],
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library",
    description: "EFT Library 보스",
    images: "/og.png",
    url: "https://eftlibrary.com/boss",
  },
};

export default function Boss() {
  return <BossMain />;
}
