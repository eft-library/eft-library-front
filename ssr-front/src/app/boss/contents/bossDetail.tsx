"use client";

import { Box, SimpleGrid } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridArrayText from "@/components/gridText/gridArrayText";
import GridJsonText from "@/components/gridText/gridJsonText";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, BossDetail } from "@/types/types";
import DetailSkeleton from "./skeleton/detailSkeleton";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";

export default function BossDetail({ bossList, bossId }: BossDetail) {
  const { blackWhite, whiteBlack } = useColorValue();
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
      <SimpleGrid
        columns={[2, null, 7]}
        spacing={2}
        width={"100%"}
        outline={"1px solid"}
        outlineColor={blackWhite}
        bg={whiteBlack}
        borderRadius={"lg"}
        position={["-webkit-sticky", "sticky"]}
        top={16}
        p={2}
        mb={6}
      >
        {column.value_kr.map((item) => (
          <GridCenterText key={item}>{item}</GridCenterText>
        ))}
      </SimpleGrid>
      {bossList.map(
        (boss) =>
          (boss.id === bossId || bossId === true) && (
            <SimpleGrid
              columns={[2, null, 7]}
              spacing={2}
              width={"100%"}
              outline={"1px solid"}
              outlineColor={blackWhite}
              borderRadius={"lg"}
              p={2}
              mb={4}
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
              />
              <GridCenterText>{boss.health_total}</GridCenterText>
              <GridArrayText arrayText={boss.followers_kr} />
            </SimpleGrid>
          )
      )}
    </Box>
  );
}
