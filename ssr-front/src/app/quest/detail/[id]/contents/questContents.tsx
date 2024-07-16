"use client";

import { Box, Text, GridItem } from "@chakra-ui/react";
import type { QuestContents, Column } from "@/types/types";
import ContentsSkeleton from "../../skeleton/contentsSkeleton";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import dynamic from "next/dynamic";

const GridContents = dynamic(
  () => import("@/components/gridContents/gridContents"),
  { ssr: false }
);
const GridCenterText = dynamic(
  () => import("@/components/gridText/gridCenterText"),
  { ssr: false }
);
const GridTitle = dynamic(() => import("@/components/gridTitle/gridTitle"), {
  ssr: false,
});
const DividerContents = dynamic(
  () => import("@/components/dividerContents/dividerContents"),
  {
    ssr: false,
  }
);
const ImageZoom = dynamic(() => import("@/components/imageZoom/imageZoom"), {
  ssr: false,
});

export default function QuestContents({ quest }: QuestContents) {
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.questRelated}`,
      setColumn
    );
  }, []);

  if (!quest || !column) return <ContentsSkeleton />;

  return (
    <Box w={"95%"}>
      <DividerContents headText="목표">
        <Box>
          {quest.objectives_kr.map((objectives) => (
            <Text
              key={objectives}
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
          {quest.rewards_kr.map((rewards) => (
            <Text
              key={rewards}
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
        {quest.sub && quest.sub.length > 0 && (
          <>
            <Text fontWeight={800} mb={4}>
              관련 퀘스트 아이템
            </Text>

            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <GridTitle
                columnDesign={[2, null, 6]}
                column={column.value_kr}
                isShadow
                shadowColor={ALL_COLOR.YELLOW_SHADOW}
                isQuest
                titleWidth="100%"
              />
              {quest.sub.map((item) => (
                <GridContents
                  contentsWidth="100%"
                  columnDesign={[2, null, 6]}
                  key={item.item_id}
                  id={item.item_id}
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <ImageZoom
                      originalImg={item.item_image}
                      thumbnail={item.item_image}
                    />
                  </Box>
                  <GridCenterText>{item.item_name}</GridCenterText>
                  <GridCenterText>{item.count}</GridCenterText>
                  <GridCenterText>
                    {item.type !== "KEY" && (
                      <Text
                        color={item.in_raid ? ALL_COLOR.RED : ALL_COLOR.YELLOW}
                      >
                        {item.in_raid ? "Y" : "N"}
                      </Text>
                    )}
                  </GridCenterText>
                  <GridItem
                    colSpan={2}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    {item.desc_text &&
                      item.desc_text.map((desc, index) => (
                        <Box
                          key={index}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Text>{desc}</Text>
                        </Box>
                      ))}
                  </GridItem>
                </GridContents>
              ))}
            </Box>
          </>
        )}
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
