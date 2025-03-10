import Rank from "@/components/page/rank/rank";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "타르코프 아이템 랭크  - EFT Library",
  description: "타르코프 아이템 랭크 페이지.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 아이템 랭크 - EFT Library",
    description: "타르코프 아이템 랭크 페이지.",
    images: "/og.png",
    url: "https://eftlibrary.com/rank",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 아이템 랭크 - EFT Library",
    description: "타르코프 아이템 랭크 페이지.",
    images: "/og.png",
    url: "https://eftlibrary.com/rank",
  },
  alternates: {
    canonical: "https://eftlibrary.com/rank",
  },
};

export default function RankPage() {
  return <Rank />;
}
