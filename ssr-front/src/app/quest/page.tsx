import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Flex } from "@chakra-ui/react";
import NPC from "./detail/npc";
import Contents from "./detail/contents";
import "./quest.css";

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
