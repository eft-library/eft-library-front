"use client";

import SubHeader from "@/components/subHeader/subHeader";
import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import PageParent from "@/components/pageParent/pageParent";
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { Box } from "@chakra-ui/react";
import BossContents from "./contents/bossContents";
import BossDetail from "./contents/bossDetail";

interface SpawnChance {
  order: number;
  chance: number;
  location: string;
}

interface BossType {
  id: string;
  name_kr: string;
  name_en: string;
  image: string;
  health_total: number;
  loot: string[];
  spawn: string[];
  faction: string;
  location_spawn_chance_en: SpawnChance[];
  location_spawn_chance_kr: SpawnChance[];
  followers_en: string[];
  followers_kr: string[];
  health_image: string[];
  location_guide: string;
  update_time: string;
}

export default function Boss() {
  const [boss, setBoss] = useState<BossType[]>([]);
  const { bossId, setBossId } = useAppStore((state) => state);

  useEffect(() => {
    fetchDataWithNone(`/api/boss/all`, setBoss);
  }, []);

  const onClickBoss = (bossValue: string) => {
    setBossId(bossValue);
  };

  return (
    <PageParent>
      <SubHeader title="보스" />
      <ContentsSelector
        onClickEvent={onClickBoss}
        itemList={boss}
        currentId={bossId}
        selectorId={"id"}
        itemDesc="name_kr"
      />
      <Box w={"95%"}>
        <BossDetail bossList={boss} bossId={bossId} />
      </Box>
      <BossContents bossList={boss} bossId={bossId} />
    </PageParent>
  );
}
