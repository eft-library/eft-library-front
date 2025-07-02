import Backpack from "@/components/page/backpack/backpack";

export const metadata = {
  title: "타르코프 가방 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 가방 별 슬롯, 그리드 크기, 무게에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 가방 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 가방 별 슬롯, 그리드 크기, 무게에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/backpack",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 가방 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 가방 별 슬롯, 그리드 크기, 무게에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/backpack",
  },
  alternates: {
    canonical: "https://eftlibrary.com/backpack",
  },
};

export default function BackpackPage() {
  return <Backpack />;
}
