"use client";

import { Text, Image, Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import { formatImage } from "@/lib/formatImage";
import type { WeaponStationary, Column } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";

export default function WeaponStationary({
  stationaryList,
  category,
}: WeaponStationary) {
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.stationary}`,
      setColumn
    );
  }, []);

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (itemCategory: string) => {
    const isGeneralCategory = itemCategory === "Stationary weapons";
    const isMatchingCategory =
      itemCategory === "Stationary weapons" || category === "ALL";
    return isGeneralCategory && isMatchingCategory;
  };

  if (!column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {stationaryList.map((item, index) =>
        shouldRenderWeapon(item.category) ? (
          <GridContents columnDesign={[2, null, 5]} key={index}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                src={formatImage(item.image)}
                maxH={"200px"}
                alt={item.name}
              />
            </Box>
            <GridCenterText value={item.short_name} />
            <GridCenterText value={item.carliber} />
            <Box
              w={"100%"}
              h={"100%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              {item.modes_kr.map((mode, mIndex) => (
                <Text key={mIndex} color={ALL_COLOR.WHITE} textAlign="center">
                  {mode}
                </Text>
              ))}
            </Box>
            <GridCenterText value={item.fire_rate} />
          </GridContents>
        ) : null
      )}
    </>
  );
}
