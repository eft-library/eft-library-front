import Notice from "@/components/page/notice/notice";

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
};

export default function NoticePage() {
  return <Notice />;
}
