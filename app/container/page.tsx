import Container from "@/components/page/container/container";

export const metadata = {
  title: "타르코프 컨테이너 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 컨테이너 별 슬롯과 내부 크기에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 컨테이너 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 컨테이너 별 슬롯과 내부 크기에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/container",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 컨테이너 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 컨테이너 별 슬롯과 내부 크기에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/container",
  },
};

export default function ContainerPage() {
  return <Container />;
}
