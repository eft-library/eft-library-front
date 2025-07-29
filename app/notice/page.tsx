import NoticeData from "./_components/notice-data";

export const metadata = {
  title: "EFT Library 공지사항 - EFT Library",
  description: "EFT Library 사이트 관련 공지사항.",
  openGraph: {
    siteName: "EFT Library",
    title: "EFT Library 공지사항 - EFT Library",
    description: "EFT Library 사이트 관련 공지사항.",
    images: "/og.png",
    url: "https://eftlibrary.com/notice?id=1",
  },
  twitter: {
    siteName: "EFT Library",
    title: "EFT Library 공지사항 - EFT Library",
    description: "EFT Library 사이트 관련 공지사항.",
    images: "/og.png",
    url: "https://eftlibrary.com/notice?id=1",
  },
  alternates: {
    canonical: "https://eftlibrary.com/notice?id=1",
  },
};

export default function Notice() {
  return <NoticeData />;
}
