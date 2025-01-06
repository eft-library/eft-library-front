import ArmBand from "@/components/page/armBand/armBand";

export const metadata = {
  title: "타르코프 완장",
  description: "타르코프 완장, tarkov arm band",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 완장",
    description: "EFT Library 완장",
    images: "/og.png",
    url: "https://eftlibrary.com/arm-band",
  },
};

export default function ArmBandPage() {
  return <ArmBand />;
}
