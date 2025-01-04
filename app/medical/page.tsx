import Medical from "@/components/custom/medical/medical";

export const metadata = {
  title: "타르코프 의료품",
  description: "타르코프 의료품, tarkov medical",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 의료품",
    description: "EFT Library 의료품",
    images: "/og.png",
    url: "https://eftlibrary.com/medical",
  },
};

export default function MedicalPage() {
  return <Medical />;
}
