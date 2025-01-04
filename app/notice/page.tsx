import Notice from "@/components/custom/notice/notice";

export const metadata = {
  title: "EFT Library 공지사항",
  description: "EFT Library 공지사항",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 공지사항",
    description: "EFT Library 공지사항",
    images: "/og.png",
    url: "https://eftlibrary.com/notice?id=1",
  },
};

export default function NoticePage() {
  return <Notice />;
}
