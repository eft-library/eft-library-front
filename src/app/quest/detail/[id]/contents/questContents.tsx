"use client";

import { Box, Text, GridItem, Skeleton } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import type { QuestContents, Column } from "@/types/types";
import GridTitle from "@/components/gridTitle/gridTitle";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import GridContents from "@/components/gridContents/gridContents";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import GridCenterText from "@/components/gridText/gridCenterText";
import Link from "next/link";
import ImgWithZoom from "@/components/imageZoom/imgWithZoom";
import AdBanner from "@/components/adsense/adBanner";

export default function QuestContents({ quest }: QuestContents) {
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.questRelated}`,
      setColumn
    );
  }, []);

  return (
    <Box w={"100%"}>
      {!quest ? (
        <Skeleton height="200px" width="100%" />
      ) : (
        quest.requirements_kr && (
          <DividerContents headText="요구사항">
            <Box>
              {quest.requirements_kr.map((requirements) => (
                <Text
                  key={requirements}
                  mt={1}
                  fontWeight={700}
                  dangerouslySetInnerHTML={{
                    __html: `*&nbsp;&nbsp;${requirements}`,
                  }}
                />
              ))}
            </Box>
          </DividerContents>
        )
      )}

      <DividerContents headText="목표">
        <Box>
          {!quest ? (
            <Skeleton height="200px" width="100%" />
          ) : (
            quest.objectives_kr.map((objectives) => (
              <Text
                key={objectives}
                mt={1}
                fontWeight={700}
                dangerouslySetInnerHTML={{
                  __html: `*&nbsp;&nbsp;${objectives}`,
                }}
              />
            ))
          )}
        </Box>
      </DividerContents>
      <DividerContents headText="보상">
        <Box mb={10}>
          {!quest ? (
            <Skeleton height="200px" width="100%" />
          ) : (
            quest.rewards_kr.map((rewards) => (
              <Text
                key={rewards}
                mt={1}
                fontWeight={700}
                dangerouslySetInnerHTML={{
                  __html: `*&nbsp;&nbsp;${rewards}`,
                }}
              />
            ))
          )}
        </Box>
      </DividerContents>
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      {!quest ? (
        <></>
      ) : (
        ((quest.sub && quest.sub.length > 0) || quest.guide) && (
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
                    column={column}
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
                          name={item.item_name_kr}
                        />
                      </Box>
                      <Link
                        href={`${item.item_link}${item.item_id}`}
                        scroll={false}
                      >
                        <GridCenterText isHover>
                          {item.item_name_kr}
                        </GridCenterText>
                      </Link>
                      <GridCenterText>{item.count}</GridCenterText>
                      <Box
                        w={"100%"}
                        h={"100%"}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection={"column"}
                      >
                        <Text
                          color={
                            item.in_raid ? ALL_COLOR.RED : ALL_COLOR.YELLOW
                          }
                          _hover={{ color: ALL_COLOR.BEIGE }}
                          textAlign="center"
                          fontWeight={600}
                        >
                          {item.in_raid ? "Y" : "N"}
                        </Text>
                      </Box>
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
            <Box fontWeight={600}>
              <ImgWithZoom content={quest.guide} />
            </Box>
          </DividerContents>
        )
      )}
    </Box>
  );
}
