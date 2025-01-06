import Container from "@/components/page/container/container";

export const metadata = {
  title: "타르코프 컨테이너",
  description: "타르코프 컨테이너, tarkov container",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 컨테이너",
    description: "EFT Library 컨테이너",
    images: "/og.png",
    url: "https://eftlibrary.com/container",
  },
};

export default function ContainerPage() {
  return <Container />;
}
