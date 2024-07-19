import WeaponMain from "./contents/weaponMain";

export const metadata = {
  title: "무기 | EFT Library",
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
    description: "EFT Library 무기",
    images: "/og.png",
    url: "https://eftlibrary.com/weapon",
  },
};

export default function Weapon() {
  return <WeaponMain />;
}
