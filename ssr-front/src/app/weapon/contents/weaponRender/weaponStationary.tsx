"use client";

import { Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponStationary, Column } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";

export default function WeaponStationary({
  stationaryList,
  category,
}: WeaponStationary) {
  const { yellowShadow } = useColorValue();
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
        shadowColor={yellowShadow}
      />
      {stationaryList.map((item) =>
        shouldRenderWeapon(item.category) ? (
          <GridContents columnDesign={[2, null, 5]} key={item.id}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ImageZoom
                originalImg={item.image}
                thumbnail={item.image}
                needFormat
              />
            </Box>
            <GridCenterText>{item.short_name}</GridCenterText>
            <GridCenterText>{item.carliber}</GridCenterText>
            <Box
              w={"100%"}
              h={"100%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              {item.modes_kr.map((mode) => (
                <GridCenterText key={mode}>{mode}</GridCenterText>
              ))}
            </Box>
            <GridCenterText>{item.fire_rate}</GridCenterText>
          </GridContents>
        ) : null
      )}
    </>
  );
}
