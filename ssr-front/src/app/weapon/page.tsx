import WeaponMain from "./contents/weaponMain";

export const metadata = {
  title: "타르코프 무기",
  description: "타르코프 무기, 타르코프 총, tarkov weapon, tarkov gun",
  keywords: [
    "타르코프",
    "타르코프 퀘스트 공략",
    "타르코프 지도",
    "타르코프 정보",
    "타르코프 퀘스트",
    "타르코프 공략",
    "타르코프 하이드아웃",
    "타르코프 한국어",
    "타르코프 도서관",
    "타르코프 보스",
    "타르코프 한글 지도",
    "타르코프 가이드",
    "타르코프 이벤트",
    "타르코프 커뮤니티",
    "타르코프 퀘스트 플래너",
    "escape from tarkov",
    "tarkov",
    "EFT Library",
    "TKL",
    "tarkov library",
    "escape from tarkov library",
  ],
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 무기",
    description: "EFT Library 무기",
    images: "/og.png",
    url: "https://eftlibrary.com/weapon",
  },
  alternates: {
    canonical: "./",
  },
};

export default function Weapon() {
  return <WeaponMain />;
}
