import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Flex } from "@chakra-ui/react";
import NPC from "./content/npc";
import Contents from "./content/contents";
import "@/assets/quest.css";

export const metadata = {
  title: "타르코프 퀘스트",
  description: "타르코프 퀘스트, tarkov quest",
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
