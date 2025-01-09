import Loot from "@/components/page/loot/loot";

export const metadata = {
  title: "타르코프 전리품 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 전리품으로 에너지 용품, 기타, 도구, 가연성 물질, 전자 제품, 의료용품, 귀중품, 가정용품, 건축 자재, 정보 아이템, 특수 장비, 화폐, 퀘스트 아이템에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 전리품 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 전리품으로 에너지 용품, 기타, 도구, 가연성 물질, 전자 제품, 의료용품, 귀중품, 가정용품, 건축 자재, 정보 아이템, 특수 장비, 화폐, 퀘스트 아이템에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/loot",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 전리품 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 전리품으로 에너지 용품, 기타, 도구, 가연성 물질, 전자 제품, 의료용품, 귀중품, 가정용품, 건축 자재, 정보 아이템, 특수 장비, 화폐, 퀘스트 아이템에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/loot",
  },
};

export default function LootPage() {
  return <Loot />;
}
