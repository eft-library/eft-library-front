"use client";

import { Box, Skeleton, Text } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import type { BossContents, Column } from "@/types/types";
import React, { useEffect } from "react";
import { useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import BossHealth from "./bossHealth";
import FollowersLoot from "./followersLoot";
import ImgWithZoom from "@/components/boardDetail/imgWithZoom";
import "@/assets/editor.css";
import AdBanner from "@/components/adsense/adBanner";

export default function BossContents({ boss }: BossContents) {
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.bossLoot}`,
      setColumn
    );
  }, []);

  return (
    <Box w={"100%"}>
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <DividerContents headText="위치">
        {!boss ? (
          <Skeleton height="120px" width="100%" />
        ) : (
          <ImgWithZoom content={boss.location_guide} />
        )}
      </DividerContents>
      {!boss ? (
        <>
          <Skeleton height="400px" width="100%" />
          <br />
          <Skeleton height="400px" width="100%" />
        </>
      ) : (
        <>
          <BossHealth healthList={boss.sub_followers} />
          {boss.sub_followers.map((followers) => (
            <FollowersLoot
              follower={followers}
              column={column}
              key={followers.id}
            />
          ))}
        </>
      )}
    </Box>
  );
}
