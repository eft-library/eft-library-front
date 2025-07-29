import FaceCoverData from "./_components/face-cover-data";

export const metadata = {
  title: "타르코프 얼굴 커버 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 얼굴 커버 별 보호 등급, 보호 부위, 내구성, 도탄 기회, 무게에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 얼굴 커버 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 얼굴 커버 별 보호 등급, 보호 부위, 내구성, 도탄 기회, 무게에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/face-cover",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 얼굴 커버 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 얼굴 커버 별 보호 등급, 보호 부위, 내구성, 도탄 기회, 무게에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/face-cover",
  },
  alternates: {
    canonical: "https://eftlibrary.com/face-cover",
  },
};

export default function FaceCover() {
  return <FaceCoverData />;
}
