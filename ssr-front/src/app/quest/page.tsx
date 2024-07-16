import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Flex } from "@chakra-ui/react";
import "@/assets/quest.css";
import dynamic from "next/dynamic";

const NPC = dynamic(() => import("./content/npc"), {
  ssr: false,
});
const Contents = dynamic(() => import("./content/contents"), {
  ssr: false,
});

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
