"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import RenderArrayText from "@/components/gridText/renderArrayText";
import { Box, Image, Text } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { ArmorVest, Column } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";

export default function ArmorVestDetail() {
  const { yellowShadow, blackWhite } = useColorValue();
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
      {armorVestList.map((item, index) => (
        <GridContents columnDesign={[2, null, 6]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.durability} />
          <GridCenterText value={item.class_value} />
          <RenderArrayText arrayText={item.areas_kr} />
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Text color={blackWhite} textAlign="center">
              {item.weight} kg
            </Text>
          </Box>
        </GridContents>
      ))}
    </>
  );
}
