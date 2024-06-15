"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box, Image } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { Provisions, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import useColorValue from "@/hooks/useColorValue";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";

export default function ProvisionsDetail() {
  const { yellowShadow } = useColorValue();
  const [provisionList, setProvisionList] = useState<Provisions[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.food_drink}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_FOOD_DRINK, setProvisionList);
  }, []);

  if (!column || !provisionList) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {provisionList.map((item, index) => (
        <GridContents columnDesign={[2, null, 5]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name_kr} />
          </Box>
          <GridCenterText value={item.name_kr} />
          <GridCenterText value={item.energy} isEffect />
          <GridCenterText value={item.hydration} isEffect />
          <GridCenterText value={item.name_kr} />
        </GridContents>
      ))}
    </>
  );
}
