import HeadWear from "@/components/page/headWear/headWear";

export const metadata = {
  title: "타르코프 방탄모 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 방탄모 별 보호 등급, 보호 부위, 내구성, 도탄 기회, 무게에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 방탄모 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 방탄모 별 보호 등급, 보호 부위, 내구성, 도탄 기회, 무게에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/head-wear",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 방탄모 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 방탄모 별 보호 등급, 보호 부위, 내구성, 도탄 기회, 무게에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/head-wear",
  },
  alternates: {
    canonical: "https://eftlibrary.com/head-wear",
  },
};

export default function HeadWearPage() {
  return <HeadWear />;
}
