"use client";

import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { Key, Column, KeyDetail } from "@/types/types";
import { Box, GridItem, Text } from "@chakra-ui/react";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridArrayText from "@/components/gridText/gridArrayText";
import GridNotes from "@/components/gridText/gridNotes";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function KeyDetail({ category }: KeyDetail) {
  const param = useSearchParams();
  const { yellowShadow } = useColorValue();
  const [keyList, setKeyList] = useState<Key[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.key}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_KEY, setKeyList);
  }, []);

  useScrollMove(param.get("id"), keyList, "KEY");

  const checkViewKey = (mapValue: Array<string>, keyCategory: string) => {
    return keyCategory === "ALL" || mapValue.includes(keyCategory);
  };

  if (!column || !keyList) return <WeaponSkeleton />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {keyList.map((item) =>
        checkViewKey(item.map_value, category) ? (
          <GridContents
            columnDesign={[2, null, 5]}
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
            <GridCenterText>{item.name} </GridCenterText>
            <GridArrayText arrayText={item.use_map_kr} />
            <GridCenterText>{item.uses}</GridCenterText>
            <GridNotes notes={item.related_quests} />
          </GridContents>
        ) : null
      )}
    </Box>
  );
}
