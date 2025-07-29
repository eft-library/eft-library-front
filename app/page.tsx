import MainData from "./_components/main-data";

export const metadata = {
  title: "타르코프 도서관 - EFT LIBRARY",
  description:
    "타르코프 도서관 EFT LIBRARY는 Escape from Tarkov 한국어 공략 정보의 허브입니다. 한글 지도, 2D & 3D 지도, 퀘스트 가이드, 퀘스트 플래너 & 로드맵, 아이템, 보스, 이벤트, 모딩, 시세 등 게임 플레이에 필요한 모든 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT LIBRARY",
    title: "타르코프 도서관 - EFT LIBRARY",
    description:
      "타르코프 도서관 EFT LIBRARY는 Escape from Tarkov 한국어 공략 정보의 허브입니다. 한글 지도, 2D & 3D 지도, 퀘스트 가이드, 퀘스트 플래너 & 로드맵, 아이템, 보스, 이벤트, 모딩, 시세 등 게임 플레이에 필요한 모든 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/",
  },
};
export default function Main() {
  return <MainData />;
}
