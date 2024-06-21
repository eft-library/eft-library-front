"use client";

import { Box, Text } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import type { QuestContents } from "@/types/types";
import ContentsSkeleton from "../../skeleton/contentsSkeleton";
import useColorValue from "@/hooks/useColorValue";

export default function QuestContents({ quest }: QuestContents) {
  const { blackWhite } = useColorValue();
  if (!quest) return <ContentsSkeleton />;

  return (
    <Box w={"95%"}>
      <DividerContents headText="목표">
        <Box>
          {quest.objectives_kr.map((objectives) => (
            <Text
              key={objectives}
              color={blackWhite}
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
          {quest.rewards_kr.map((rewards) => (
            <Text
              key={rewards}
              color={blackWhite}
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
            color={blackWhite}
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
