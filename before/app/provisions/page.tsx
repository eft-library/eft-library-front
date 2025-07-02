import Provisions from "@/components/page/provisions/provisions";

export const metadata = {
  title: "타르코프 식량 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 식량 별 에너지, 수분, 효과에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 식량 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 식량 별 에너지, 수분, 효과에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/provisions",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 식량 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 식량 별 에너지, 수분, 효과에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/provisions",
  },
  alternates: {
    canonical: "https://eftlibrary.com/provisions",
  },
};

export default function ProvisionsPage() {
  return <Provisions />;
}
