import { Box, Image, Text } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import type { BossContents, BossInfo } from "@/types/types";
import ContentsSkeleton from "./skeleton/contentsSkeleton";

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
            <Image
              key={index}
              src={boss}
              ml={index !== 0 ? 10 : 0}
              alt="health"
            />
          ))}
        </Box>
      </DividerContents>
      <DividerContents headText="전리품">
        <Box display={"flex"} alignItems={"center"}>
          {bossInfo.loot.map((boss, index) => (
            <Image
              key={index}
              src={boss}
              ml={index !== 0 ? 10 : 0}
              alt="loot"
            />
          ))}
        </Box>
      </DividerContents>
    </Box>
  );
}
