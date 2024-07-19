import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import ProvisionsDetail from "./contents/provisionsDetail";

export const metadata = {
  title: "식량 | EFT Library",
  description: "EFT Library",
  keywords: [
    "tarkov",
    "타르코프 퀘스트 공략",
    "타르코프 지도",
    "타르코프",
    "타르코프 정보",
    "타르코프 퀘스트",
    "타르코프 공략",
    "타르코프 하이드아웃 정보",
  ],
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library",
    description: "EFT Library 식량",
    images: "/og.png",
    url: "https://eftlibrary.com/provisions",
  },
};

export default function Provisions() {
  return (
    <PageParent>
      <SubHeader title="식량" />
      <Box mb={10} />
      <ProvisionsDetail />
    </PageParent>
  );
}
