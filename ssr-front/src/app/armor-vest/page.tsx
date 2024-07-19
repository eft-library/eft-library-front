import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import ArmorVestDetail from "./contents/armorVestDetail";

export const metadata = {
  title: "방탄 조끼 | EFT Library",
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
    description: "EFT Library 방탄 조끼",
    images: "/og.png",
    url: "https://eftlibrary.com/armor-vest",
  },
};

export default function ArmorVest() {
  return (
    <PageParent>
      <SubHeader title="방탄 조끼" />
      <Box mb={10} />
      <ArmorVestDetail />
    </PageParent>
  );
}
