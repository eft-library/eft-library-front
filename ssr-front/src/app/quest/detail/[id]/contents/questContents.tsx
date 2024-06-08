import { Box, Text } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { QuestContents } from "@/types/types";

export default function QuestContents({ quest }: QuestContents) {
  return (
    <Box w={"95%"}>
      <DividerContents headText="목표">
        <Box>
          {quest.objectives_kr.map((objectives, index) => (
            <Text
              key={index}
              color={ALL_COLOR.WHITE}
              mt={1}
              fontWeight={700}
              fontSize="lg"
              dangerouslySetInnerHTML={{
                __html: `*&nbsp;&nbsp;${objectives}`,
              }}
            />
          ))}
        </Box>
      </DividerContents>
      <DividerContents headText="보상">
        <Box>
          {quest.rewards_kr.map((rewards, index) => (
            <Text
              key={index}
              color={ALL_COLOR.WHITE}
              mt={1}
              fontWeight={700}
              fontSize="lg"
              dangerouslySetInnerHTML={{
                __html: `*&nbsp;&nbsp;${rewards}`,
              }}
            />
          ))}
        </Box>
      </DividerContents>
      <DividerContents headText="가이드">
        <Box>
          <Text
            color={ALL_COLOR.WHITE}
            mt={1}
            fontWeight={700}
            fontSize="lg"
            dangerouslySetInnerHTML={{
              __html: `${quest.guide}`,
            }}
          />
        </Box>
      </DividerContents>
    </Box>
  );
}
