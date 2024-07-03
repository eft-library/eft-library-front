"use client";

import { Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridArrayText from "@/components/gridText/gridArrayText";
import GridJsonText from "@/components/gridText/gridJsonText";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, BossDetail } from "@/types/types";
import DetailSkeleton from "./skeleton/detailSkeleton";
import GridTitle from "@/components/gridTitle/gridTitle";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import GridContents from "@/components/gridContents/gridContents";

export default function BossDetail({ bossList, bossId }: BossDetail) {
  const { yellowShadow } = useColorValue();
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
        shadowColor={yellowShadow}
        titleWidth="100%"
      />
      {bossList.map(
        (boss) =>
          (boss.id === bossId || bossId === true) && (
            <GridContents
              columnDesign={[2, null, 7]}
              contentsWidth="100%"
              id={boss.id}
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
