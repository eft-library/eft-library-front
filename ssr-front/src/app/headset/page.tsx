import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import HeadsetDetail from "./contents/headsetDetail";

export const metadata = {
  title: "헤드셋 | EFT Library",
  description: "EFT Library",
  keywords: [
    "타르코프",
    "타르코프 퀘스트 공략",
    "타르코프 지도",
    "타르코프 정보",
    "타르코프 퀘스트",
    "타르코프 공략",
    "타르코프 하이드아웃",
    "타르코프 한국어",
    "타르코프 도서관",
    "타르코프 보스",
    "타르코프 한글 지도",
    "타르코프 가이드",
    "타르코프 이벤트",
    "타르코프 커뮤니티",
    "타르코프 퀘스트 플래너",
    "escape from tarkov",
    "tarkov",
    "EFT Library",
    "TKL",
    "tarkov library",
    "escape from tarkov library",
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
