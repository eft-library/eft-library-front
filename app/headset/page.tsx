import HeadsetData from "./_components/headset-data";

export const metadata = {
  title: "타르코프 헤드셋 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 헤드셋 종류와 사진에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 헤드셋 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 헤드셋 종류와 사진에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/headset",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 헤드셋 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 헤드셋 종류와 사진에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/headset",
  },
  alternates: {
    canonical: "https://eftlibrary.com/headset",
  },
};

export default function Headset() {
  return <HeadsetData />;
}
