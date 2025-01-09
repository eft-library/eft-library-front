import ArmBand from "@/components/page/armBand/armBand";

export const metadata = {
  title: "타르코프 완장 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 완장 종류와 사진에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 완장 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 완장 종류와 사진에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/arm-band",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 완장 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 완장 종류와 사진에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/arm-band",
  },
};

export default function ArmBandPage() {
  return <ArmBand />;
}
