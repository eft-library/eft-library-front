import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "타르코프 도서관",
    short_name: "타르코프 도서관",
    description:
      "타르코프 도서관 EFT LIBRARY는 Escape from Tarkov 한국어 공략 정보의 허브입니다. 한글 지도, 2D & 3D 지도, 퀘스트 가이드, 퀘스트 플래너 & 로드맵, 아이템, 보스, 이벤트, 모딩, 시세 등 게임 플레이에 필요한 모든 정보를 제공합니다.",
    start_url: "/",
    lang: "ko-KR",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/og.png",
        sizes: "192x192",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/og.png",
        sizes: "512x512",
        purpose: "maskable",
        type: "image/png",
      },
    ],
  };
}
