import Loot from "@/components/custom/loot/loot";

export const metadata = {
  title: "타르코프 전리품",
  description: "타르코프 전리품, tarkov loot",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 전리품",
    description: "EFT Library 전리품",
    images: "/og.png",
    url: "https://eftlibrary.com/loot",
  },
};

export default function LootPage() {
  return <Loot />;
}
