"use client";

import { Box, Text } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import type { BossContents, BossInfo, Column } from "@/types/types";
import ContentsSkeleton from "./skeleton/contentsSkeleton";
import React, { useEffect } from "react";
import { useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import BossHealth from "./bossHealth";
import FollowersLoot from "./followersLoot";

export default function BossContents({ boss }: BossContents) {
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.bossLoot}`,
      setColumn
    );
  }, []);

  if (!column) return <ContentsSkeleton />;

  return (
    <Box w={"95%"}>
      <DividerContents headText="위치">
        <Box>
          <Text
            mb={1}
            fontWeight={600}
            dangerouslySetInnerHTML={{
              __html: `${boss.location_guide}`,
            }}
          />
        </Box>
      </DividerContents>
      <BossHealth healthList={boss.sub_followers} />
      {boss.sub_followers.map((followers) => (
        <FollowersLoot
          follower={followers}
          column={column}
          key={followers.id}
        />
      ))}
    </Box>
  );
}
