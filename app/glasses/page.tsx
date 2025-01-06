import Glasses from "@/components/page/glasses/glasses";

export const metadata = {
  title: "타르코프 안경",
  description: "타르코프 안경, tarkov glasses, tarkov eyewear",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 안경",
    description: "EFT Library 안경",
    images: "/og.png",
    url: "https://eftlibrary.com/glasses",
  },
};

export default function GlassesPage() {
  return <Glasses />;
}
