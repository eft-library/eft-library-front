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
import GridNotes from "@/components/gridText/gridNotes";
import GridTitle from "@/components/gridTitle/gridTitle";
import useColorValue from "@/hooks/useColorValue";

export default function LootDetail({ category }: LootDetail) {
  const param = useSearchParams();
  const { yellowShadow } = useColorValue();
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
          <GridContents
            columnDesign={[2, null, 3]}
            key={item.id}
            id={item.id}
            isHideout
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ImageZoom originalImg={item.image} thumbnail={item.image} />
            </Box>
            <GridCenterText>{item.name_kr} </GridCenterText>
            <GridNotes notes={item.notes} />
          </GridContents>
        ) : null
      )}
    </Box>
  );
}
