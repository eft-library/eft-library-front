"use client";

import type { UserQuestDetail } from "@/types/types";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  GridItem,
  Button,
} from "@chakra-ui/react";
import GridContents from "@/components/gridContents/gridContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function UserQuestDetail({
  userQuestList,
  successQuest,
}: UserQuestDetail) {
  const allIndices = userQuestList.map((_, index) => index);

  return (
    <Box w={"95%"} h="100%">
      <Accordion allowMultiple defaultIndex={allIndices}>
        {userQuestList.map((npc) => (
          <AccordionItem key={npc.npc_id}>
            <AccordionButton
              bg={ALL_COLOR.HIDE_BLUE}
              color={ALL_COLOR.WHITE}
              _expanded={{ bg: ALL_COLOR.HIDE_RED, color: ALL_COLOR.WHITE }}
              borderRadius={"lg"}
            >
              <Box as="span" flex={1} textAlign={"left"} fontWeight={800}>
                {npc.npc_name_kr}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {npc.quest_info.map((quest) => (
                <GridContents
                  key={quest.quest_id}
                  id={quest.quest_id}
                  columnDesign={[2, null, 4]}
                  contentsWidth="100%"
                >
                  <GridItem
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                  >
                    <Text fontWeight={600}>{quest.quest_name_kr}</Text>
                  </GridItem>
                  <GridItem
                    colSpan={2}
                    display={"flex"}
                    justifyItems={"center"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                  >
                    <Box
                      display={"flex"}
                      justifyItems={"center"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      {quest.objectives_kr.map((objective, index) => (
                        <Text
                          key={index}
                          mb={1}
                          fontWeight={600}
                          dangerouslySetInnerHTML={{
                            __html: `*&nbsp;&nbsp;${objective}`,
                          }}
                        />
                      ))}
                    </Box>
                  </GridItem>
                  <GridItem
                    display={"flex"}
                    justifyItems={"center"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      w={"100px"}
                      onClick={() => successQuest(quest.quest_id, quest.next)}
                    >
                      완료
                    </Button>
                  </GridItem>
                </GridContents>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
