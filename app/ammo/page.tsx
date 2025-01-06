import Ammo from "@/components/page/ammo/ammo";

export const metadata = {
  title: "타르코프 탄약",
  description: "타르코프 탄약 및 총알, tarkov ammo",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 탄약",
    description: "EFT Library 탄약",
    images: "/og.png",
    url: "https://eftlibrary.com/ammo",
  },
};

export default function AmmoPage() {
  return <Ammo />;
}
