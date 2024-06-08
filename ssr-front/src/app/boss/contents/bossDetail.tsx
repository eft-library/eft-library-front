"use client";

import { Box, SimpleGrid, Image } from "@chakra-ui/react";
import RenderText from "@/components/gridText/renderText";
import RenderArrayText from "@/components/gridText/renderArrayText";
import RenderJsonText from "@/components/gridText/renderJsonText";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { Column, BossDetail } from "@/types/types";

export default function BossDetail({ bossList, bossId }: BossDetail) {
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.boss}`,
      setColumn
    );
  }, []);

  if (!column) return null;

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
        outlineColor={ALL_COLOR.WHITE}
        borderRadius={"lg"}
        p={2}
        mb={6}
      >
        {column.value_kr.map((item, index) => (
          <RenderText text={item} key={index} />
        ))}
      </SimpleGrid>
      {bossList.map(
        (boss, index) =>
          (boss.id === bossId || bossId === true) && (
            <SimpleGrid
              columns={[2, null, 7]}
              spacing={2}
              width={"100%"}
              outline={"1px solid"}
              outlineColor={ALL_COLOR.WHITE}
              borderRadius={"lg"}
              p={2}
              mb={4}
              key={index}
            >
              <Image src={boss.image} alt={boss.name_kr} />
              <RenderText text={boss.name_kr} />
              <RenderText text={boss.faction} />
              <RenderJsonText
                jsonArrayText={boss.location_spawn_chance_kr}
                jatType={"location"}
                isDivider
              />
              <RenderJsonText
                jsonArrayText={boss.location_spawn_chance_kr}
                jatType={"chance"}
                isDivider
              />
              <RenderText text={boss.health_total} />
              <RenderArrayText arrayText={boss.followers_kr} />
            </SimpleGrid>
          )
      )}
    </Box>
  );
}
