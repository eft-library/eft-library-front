import ArmorVest from "@/components/page/armorVest/armorVest";

export const metadata = {
  title: "타르코프 방탄 조끼 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 방톤 조끼 별 내구성, 보호 등급, 보호 부위, 무게에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 방탄 조끼 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 방톤 조끼 별 내구성, 보호 등급, 보호 부위, 무게에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/armor-vest",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 방탄 조끼 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 방톤 조끼 별 내구성, 보호 등급, 보호 부위, 무게에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/armor-vest",
  },
};

export default function ArmorVestPage() {
  return <ArmorVest />;
}
