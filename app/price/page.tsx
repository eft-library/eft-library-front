import Price from "@/components/page/price/price";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "EFT Library 아이템 시세 - EFT Library",
  description: "EFT Library 아이템 시세 페이지.",
  openGraph: {
    siteName: "EFT Library",
    title: "EFT Library 아이템 시세 - EFT Library",
    description: "EFT Library 아이템 시세 페이지.",
    images: "/og.png",
    url: "https://eftlibrary.com/price",
  },
  twitter: {
    siteName: "EFT Library",
    title: "EFT Library 아이템 시세 - EFT Library",
    description: "EFT Library  아이템 시세 페이지.",
    images: "/og.png",
    url: "https://eftlibrary.com/price",
  },
};

export default function PricePage() {
  return <Price />;
}
