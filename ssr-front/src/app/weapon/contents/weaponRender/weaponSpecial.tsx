"use client";

import { Image, Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, WeaponSpecial } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";
import useColorValue from "@/hooks/useColorValue";

export default function WeaponSpecial({
  specialList,
  category,
}: WeaponSpecial) {
  const { yellowShadow } = useColorValue();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.special}`,
      setColumn
    );
  }, []);

  if (!column) return <WeaponSkeleton />;

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (itemCategory: string) => {
    const isGeneralCategory = itemCategory === "Special weapons";
    const isMatchingCategory =
      itemCategory === "Special weapons" || category === "ALL";
    return isGeneralCategory && isMatchingCategory;
  };
  return (
    <>
      <GridTitle
        columnDesign={[2, null, 2]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {specialList.map((item, index) =>
        shouldRenderWeapon(item.category) ? (
          <GridContents columnDesign={[2, null, 2]} key={index}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image src={item.image} maxH={"200px"} alt={item.name} />
            </Box>
            <GridCenterText value={item.short_name} />
          </GridContents>
        ) : null
      )}
    </>
  );
}
