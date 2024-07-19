import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import HeadsetDetail from "./contents/headsetDetail";

export const metadata = {
  title: "헤드셋 | EFT Library",
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
    description: "EFT Library 헤드셋",
    images: "/og.png",
    url: "https://eftlibrary.com/headset",
  },
};

export default function Headset() {
  return (
    <PageParent>
      <SubHeader title="헤드셋" />
      <Box mb={10} />
      <HeadsetDetail />
    </PageParent>
  );
}
