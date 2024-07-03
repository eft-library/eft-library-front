import { Box, Text } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import type { BossContents, BossInfo } from "@/types/types";
import ContentsSkeleton from "./skeleton/contentsSkeleton";
import ImageZoom from "@/components/imageZoom/imageZoom";
import React from "react";

export default function BossContents({ bossList, bossId }: BossContents) {
  let bossInfo: BossInfo = bossList.find((boss) => boss.id == bossId);

  if (!bossInfo) return <ContentsSkeleton />;

  return (
    <Box w={"95%"}>
      <DividerContents headText="위치">
        <Box>
          <Text
            mb={1}
            dangerouslySetInnerHTML={{
              __html: `${bossInfo.location_guide}`,
            }}
          />
        </Box>
      </DividerContents>
      <DividerContents headText="피통">
        <Box display={"flex"} alignItems={"center"}>
          {bossInfo.health_image.map((boss, index) => (
            <React.Fragment key={index}>
              <ImageZoom originalImg={boss} thumbnail={boss} />
              <Box ml={10} />
            </React.Fragment>
          ))}
        </Box>
      </DividerContents>
      <DividerContents headText="전리품">
        <Box display={"flex"} alignItems={"center"}>
          {bossInfo.loot.map((boss, index) => (
            <React.Fragment key={index}>
              <ImageZoom originalImg={boss} thumbnail={boss} />
              <Box ml={10} />
            </React.Fragment>
          ))}
        </Box>
      </DividerContents>
    </Box>
  );
}
