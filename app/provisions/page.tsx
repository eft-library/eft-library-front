import Provisions from "@/components/custom/provisions/provisions";

export const metadata = {
  title: "타르코프 식량",
  description: "타르코프 식량, tarkov provisions, tarkov food",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 식량",
    description: "EFT Library 식량",
    images: "/og.png",
    url: "https://eftlibrary.com/provisions",
  },
};

export default function ProvisionsPage() {
  return <Provisions />;
}
