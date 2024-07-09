"use client";

import { Box, Text } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import type { BossContents, BossInfo } from "@/types/types";
import ContentsSkeleton from "./skeleton/contentsSkeleton";
import ImageZoom from "@/components/imageZoom/imageZoom";
import React, { useEffect } from "react";
import { useState } from "react";
import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import { formatImage } from "@/lib/formatImage";

export default function BossContents({ bossList, bossId }: BossContents) {
  let bossInfo: BossInfo = bossList.find((boss) => boss.id == bossId);
  const [healthId, setHealthId] = useState<string>();

  const clickHealth = (health: string) => {
    setHealthId(health);
  };

  useEffect(() => {
    if (bossInfo && bossInfo.followers_health) {
      setHealthId(bossInfo.followers_health[0].name_kr);
    }
  }, [bossInfo]);

  if (!bossInfo) return <ContentsSkeleton />;

  return (
    <Box w={"95%"}>
      <DividerContents headText="위치">
        <Box>
          <Text
            mb={1}
            fontWeight={600}
            dangerouslySetInnerHTML={{
              __html: `${bossInfo.location_guide}`,
            }}
          />
        </Box>
      </DividerContents>

      {bossInfo.followers_health && (
        <DividerContents headText="피통">
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            w={"100%"}
            h={"100%"}
            mt={-6}
          >
            <ContentsSelector
              onClickEvent={clickHealth}
              itemList={bossInfo.followers_health}
              currentId={healthId}
              selectorId="name_kr"
              isSpace={false}
              itemDesc="name_kr"
              isEng
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {bossInfo.followers_health.map(
                (health) =>
                  health.name_kr === healthId && (
                    <ImageZoom
                      key={health.name_en}
                      isBoss
                      originalImg={formatImage(health.image)}
                      thumbnail={formatImage(health.image)}
                    />
                  )
              )}
            </Box>
          </Box>
        </DividerContents>
      )}
      <DividerContents headText="전리품">
        <Box display={"flex"} alignItems={"center"}></Box>
      </DividerContents>
      <DividerContents headText="추종자 전리품">
        <Text>asd</Text>
      </DividerContents>
    </Box>
  );
}
