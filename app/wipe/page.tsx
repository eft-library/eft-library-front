import WipeData from "./_components/wipe-data";

export const metadata = {
  title: "타르코프 초기화 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 시즌 초기화에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 초기화 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 시즌 초기화에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/wipe",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 초기화 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 시즌 초기화에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/wipe",
  },
  alternates: {
    canonical: "https://eftlibrary.com/wipe",
  },
};

export default function Wipe() {
  return <WipeData />;
}
