"use client";

import { Box, SimpleGrid } from "@chakra-ui/react";
import RenderText from "@/components/gridText/renderText";
import RenderArrayText from "@/components/gridText/renderArrayText";
import RenderJsonText from "@/components/gridText/renderJsonText";
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
              outlineColor={blackWhite}
              borderRadius={"lg"}
              p={2}
              mb={4}
              key={index}
            >
              <ImageZoom
                originalImg={boss.image}
                thumbnail={boss.image}
                isMax={false}
              />
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
