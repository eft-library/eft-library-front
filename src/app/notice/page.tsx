import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import NoticeDetail from "./contents/noticeDetail";

export const metadata = {
  title: "타르코프 커뮤니티 공지",
  description: "타르코프 커뮤니티 공지",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 공지",
    description: "EFT Library 공지",
    images: "/og.png",
    url: "https://eftlibrary.com/notice",
  },
};

export default function Notice() {
  return (
    <PageParent>
      <SubHeader title="공지" />
      <Box mb={10} />
      <NoticeDetail />
    </PageParent>
  );
}
