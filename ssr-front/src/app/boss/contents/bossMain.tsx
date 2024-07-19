"use client";

import SubHeader from "@/components/subHeader/subHeader";
import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import PageParent from "@/components/pageParent/pageParent";
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { Box } from "@chakra-ui/react";
import BossContents from "./bossContents";
import BossDetail from "./bossDetail";
import API_ENDPOINTS from "@/config/endPoints";
import type { Boss } from "@/types/types";

export default function BossMain() {
  const [boss, setBoss] = useState<Boss[]>([]);
  const { bossId, setBossId } = useAppStore((state) => state);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_BOSS, setBoss);
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
