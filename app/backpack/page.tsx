import Backpack from "@/components/page/backpack/backpack";

export const metadata = {
  title: "타르코프 가방",
  description: "타르코프 가방, tarkov backpack",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 가방",
    description: "EFT Library 가방",
    images: "/og.png",
    url: "https://eftlibrary.com/backpack",
  },
};

export default function BackpackPage() {
  return <Backpack />;
}
