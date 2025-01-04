import HeadWear from "@/components/custom/headWear/headWear";

export const metadata = {
  title: "타르코프 방탄모",
  description: "타르코프 방탄모, tarkov headwear, tarkov helmet",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 방탄모",
    description: "EFT Library 방탄모",
    images: "/og.png",
    url: "https://eftlibrary.com/head-wear",
  },
};

export default function HeadWearPage() {
  return <HeadWear />;
}
