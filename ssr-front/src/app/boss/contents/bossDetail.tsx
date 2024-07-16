"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, BossDetail } from "@/types/types";
import DetailSkeleton from "./skeleton/detailSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import dynamic from "next/dynamic";

const GridContents = dynamic(
  () => import("@/components/gridContents/gridContents"),
  { ssr: false }
);
const GridCenterText = dynamic(
  () => import("@/components/gridText/gridCenterText"),
  { ssr: false }
);
const GridTitle = dynamic(() => import("@/components/gridTitle/gridTitle"), {
  ssr: false,
});
const GridArrayText = dynamic(
  () => import("@/components/gridText/gridArrayText"),
  {
    ssr: false,
  }
);
const GridJsonText = dynamic(
  () => import("@/components/gridText/gridJsonText"),
  {
    ssr: false,
  }
);
const ImageZoom = dynamic(() => import("@/components/imageZoom/imageZoom"), {
  ssr: false,
});

export default function BossDetail({ bossList, bossId }: BossDetail) {
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.boss}`,
      setColumn
    );
  }, []);

  if (!column) return <DetailSkeleton />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
        titleWidth="100%"
      />
      {bossList.map(
        (boss) =>
          (boss.id === bossId || bossId === true) && (
            <GridContents
              columnDesign={[2, null, 7]}
              contentsWidth="100%"
              id={boss.id}
              key={boss.id}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImageZoom originalImg={boss.image} thumbnail={boss.image} />
              </Box>
              <GridCenterText>{boss.name_kr}</GridCenterText>
              <GridCenterText>{boss.faction}</GridCenterText>
              <GridJsonText
                jsonArrayText={boss.location_spawn_chance_kr}
                jatType={"location"}
                isDivider
              />
              <GridJsonText
                jsonArrayText={boss.location_spawn_chance_kr}
                jatType={"chance"}
                isDivider
                word="%"
              />
              <GridCenterText>{boss.health_total}</GridCenterText>
              <GridArrayText arrayText={boss.followers_kr} />
            </GridContents>
          )
      )}
    </Box>
  );
}
