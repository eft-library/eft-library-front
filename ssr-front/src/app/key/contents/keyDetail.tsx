"use client";

import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { Key, Column, KeyDetail } from "@/types/types";
import { Box, Image } from "@chakra-ui/react";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import RenderArrayText from "@/components/gridText/renderArrayText";
import useColorValue from "@/hooks/useColorValue";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";

export default function KeyDetail({ category }: KeyDetail) {
  const { yellowShadow } = useColorValue();
  const [keyList, setKeyList] = useState<Key[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.key}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_KEY, setKeyList);
  }, []);

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
        columnDesign={[2, null, 4]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {keyList.map((item, index) =>
        checkViewKey(item.map_value, category) ? (
          <GridContents columnDesign={[2, null, 4]} key={index}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image src={item.image} maxH={"200px"} alt={item.name} />
            </Box>
            <GridCenterText value={item.name} />
            <RenderArrayText arrayText={item.use_map_kr} />
            <GridCenterText value={item.uses} />
          </GridContents>
        ) : null
      )}
    </Box>
  );
}
