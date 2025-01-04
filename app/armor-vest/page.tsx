import ArmorVest from "@/components/custom/armorVest/armorVest";

export const metadata = {
  title: "타르코프 방탄 조끼",
  description: "타르코프 방탄 조끼 , tarkov armor vest",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 방탄 조끼",
    description: "EFT Library 방탄 조끼",
    images: "/og.png",
    url: "https://eftlibrary.com/armor-vest",
  },
};

export default function ArmorVestPage() {
  return <ArmorVest />;
}
