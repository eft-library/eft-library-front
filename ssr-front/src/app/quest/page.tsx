import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Flex } from "@chakra-ui/react";
import NPC from "./content/npc";
import Contents from "./content/contents";
import "@/assets/quest.css";

export const metadata = {
  title: "타르코프 퀘스트",
  description: "타르코프 퀘스트, tarkov quest",
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
    title: "EFT Library 퀘스트",
    description: "EFT Library 퀘스트",
    images: "/og.png",
    url: "https://eftlibrary.com/quest",
  },
};

export default function Quest() {
  return (
    <PageParent>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection="column"
        mb={"40px"}
      >
        <SubHeader title="퀘스트" />
      </Flex>
      <NPC />
      <Contents />
    </PageParent>
  );
}
