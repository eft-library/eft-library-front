import MedicalData from "./_components/medical-data";

export const metadata = {
  title: "타르코프 의료품 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 의료품으로 진통제, 주사기, 부상 치료, 회복, 버프, 디버프 등의 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 의료품 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 의료품으로 진통제, 주사기, 부상 치료, 회복, 버프, 디버프 등의 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/medical",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 의료품 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 의료품으로 진통제, 주사기, 부상 치료, 회복, 버프, 디버프 등의 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/medical",
  },
  alternates: {
    canonical: "https://eftlibrary.com/medical",
  },
};

export default function Medical() {
  return <MedicalData />;
}
