"use client";

import { Box, GridItem, Text } from "@chakra-ui/react";
import type { LootDetail, Loot, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { useScrollMove } from "@/hooks/useScrollMove";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import useColorValue from "@/hooks/useColorValue";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function LootDetail({ category }: LootDetail) {
  const param = useSearchParams();
  const { yellowShadow, blackWhite, beige } = useColorValue();
  const [lootList, setLootList] = useState<Loot[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.loot}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_LOOT, setLootList);
  }, []);

  useScrollMove(param.get("id"), lootList, "LOOT");

  const checkViewLoot = (lootCategory: string) => {
    return category === "ALL" || category === lootCategory;
  };

  if (!lootList || !column) return <WeaponSkeleton />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <GridTitle
        columnDesign={[2, null, 3]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {lootList.map((item) =>
        checkViewLoot(item.category) ? (
          <GridContents columnDesign={[2, null, 3]} key={item.id} id={item.id}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ImageZoom originalImg={item.image} thumbnail={item.image} />
            </Box>
            <GridCenterText>{item.name} </GridCenterText>
            <GridItem
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text color={ALL_COLOR.LIGHT_YELLO} fontWeight={600}>
                퀘스트
              </Text>
              {item.notes.quest &&
                item.notes.quest.map((quest) => (
                  <Link href={`/quest/detail/${quest.id}`}>
                    <Text
                      color={blackWhite}
                      fontWeight={600}
                      _hover={{ color: beige }}
                    >
                      -&nbsp;{quest.name_kr}
                    </Text>
                  </Link>
                ))}
            </GridItem>
          </GridContents>
        ) : null
      )}
    </Box>
  );
}
