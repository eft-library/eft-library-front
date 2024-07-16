"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { Box } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import type { Boss } from "@/types/types";
import dynamic from "next/dynamic";

const ContentsSelector = dynamic(
  () => import("@/components/contentsSelector/contentsSelector"),
  { ssr: false }
);
const BossContents = dynamic(() => import("./contents/bossContents"), {
  ssr: false,
});
const BossDetail = dynamic(() => import("./contents/bossDetail"), {
  ssr: false,
});

export default function Boss() {
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
