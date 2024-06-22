"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import GridArrayText from "@/components/gridText/gridArrayText";
import { Box } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { ArmorVest, Column } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import ImageZoom from "@/components/imageZoom/imageZoom";

export default function ArmorVestDetail() {
  const { yellowShadow } = useColorValue();
  const [armorVestList, setArmotVestList] = useState<ArmorVest[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.armorVest}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_ARMOR_VEST, setArmotVestList);
  }, []);

  if (!armorVestList || !column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 6]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {armorVestList.map((item) => (
        <GridContents columnDesign={[2, null, 6]} key={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
          <GridCenterText>{item.durability}</GridCenterText>
          <GridCenterText>{item.class_value}</GridCenterText>
          <GridArrayText arrayText={item.areas_kr} />
          <GridCenterText>{item.weight} kg</GridCenterText>
        </GridContents>
      ))}
    </>
  );
}
