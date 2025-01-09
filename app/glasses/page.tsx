import Glasses from "@/components/page/glasses/glasses";

export const metadata = {
  title: "타르코프 안경 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 안경 별 보호 등급, 내구성, 실명 보호에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 안경 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 안경 별 보호 등급, 내구성, 실명 보호에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/glasses",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 안경 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 안경 별 보호 등급, 내구성, 실명 보호에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/glasses",
  },
};

export default function GlassesPage() {
  return <Glasses />;
}
