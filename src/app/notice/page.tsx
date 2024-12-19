import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import NoticeDetail from "./contents/noticeDetail";

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

export default function Notice() {
  return (
    <PageParent>
      <SubHeader title="공지사항" />
      <Box mb={10} />
      <NoticeDetail />
    </PageParent>
  );
}
