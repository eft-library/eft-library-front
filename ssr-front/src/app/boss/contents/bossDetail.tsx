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

interface BossDetailType {
  bossList: BossType[];
  bossId: string | true;
}

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

interface ColumnType {
  id: string;
  type: string;
  update_time: string;
  value_kr: string[] | null;
  value_en: string[] | null;
  json_value: JsonValueType[] | null;
}

// JsonValueType 인터페이스 정의
interface JsonValueType {
  value: string;
  desc_en: string;
  desc_kr: string;
  order: number;
}

export default function BossDetail({ bossList, bossId }: BossDetailType) {
  const [column, setColumn] = useState<ColumnType>();

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
