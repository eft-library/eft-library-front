import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Flex } from "@chakra-ui/react";
import NPC from "./content/npc";
import Contents from "./content/contents";
import "@/assets/quest.css";

export const metadata = {
  title: "퀘스트 | EFT Library",
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
