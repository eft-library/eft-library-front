import Key from "@/components/page/key/key";

export const metadata = {
  title: "타르코프 열쇠 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 열쇠를 사용하는 맵과 사용 횟수에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 열쇠 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 열쇠를 사용하는 맵과 사용 횟수에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/key",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 열쇠 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 열쇠를 사용하는 맵과 사용 횟수에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/key",
  },
};

export default function KeyPage() {
  return <Key />;
}
