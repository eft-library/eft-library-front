import MainData from "./_components/main-data";

export const metadata = {
  title: "타르코프 공략 사이트 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 한글 공략 사이트 EFT Library. 한글 지도, 2D & 3D 지도, 퀘스트 가이드, 퀘스트 플래너 & 로드맵, 아이템, 보스, 이벤트, 모딩, 시세 등 게임 플레이 필요한 다양한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 공략 사이트 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 한글 공략 사이트 EFT Library. 한글 지도, 2D & 3D 지도, 퀘스트 가이드, 퀘스트 플래너 & 로드맵, 아이템, 보스, 이벤트, 모딩, 시세 등 게임 플레이 필요한 다양한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com",
  },
};

export default function Main() {
  return <MainData />;
}
