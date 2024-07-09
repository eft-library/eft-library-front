"use client";

import { Box, Text } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import type { BossContents, BossInfo, Column } from "@/types/types";
import ContentsSkeleton from "./skeleton/contentsSkeleton";
import ImageZoom from "@/components/imageZoom/imageZoom";
import React, { useEffect } from "react";
import { useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import { formatImage } from "@/lib/formatImage";
import GridTitle from "@/components/gridTitle/gridTitle";
import useColorValue from "@/hooks/useColorValue";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";
import Link from "next/link";
import BossLoot from "./bossLoot";

export default function BossContents({ bossList, bossId }: BossContents) {
  const { yellowShadow } = useColorValue();
  let bossInfo: BossInfo = bossList.find((boss) => boss.id == bossId);
  const [healthId, setHealthId] = useState<string>();
  const [bossLootId, setBossLootId] = useState<string>();
  const [followersId, setFollowersId] = useState<string>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.bossLoot}`,
      setColumn
    );
  }, []);

  const clickHealth = (health: string) => {
    setHealthId(health);
  };

  const clickBossLoot = (id: string) => {
    setBossLootId(id);
  };

  const clickFollowersLoot = (id: string) => {
    setFollowersId(id);
  };

  useEffect(() => {
    if (bossInfo) {
      if (bossInfo.followers_health) {
        setHealthId(bossInfo.followers_health[0].name_kr);
      }
      if (bossInfo.boss_loot_list.length > 0) {
        setBossLootId(bossInfo.boss_loot_list[0].item_type);
      }
      if (bossInfo.followers_loot_list.length > 0) {
        setFollowersId(bossInfo.followers_loot_list[0].item_type);
      }
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
      <BossLoot lootList={bossInfo.boss_loot_list} column={column} />
      <BossLoot lootList={bossInfo.followers_loot_list} column={column} />
    </Box>
  );
}
