"use client";

import { Box, Skeleton } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponStationary, Column } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function WeaponStationary({
  stationaryList,
  category,
}: WeaponStationary) {
  const [column, setColumn] = useState<Column>();
  const param = useSearchParams();

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

  useScrollMove(param.get("id"), stationaryList, "WEAPON");

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {stationaryList.length < 1
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 5]}
                id={`armband-null-${index}`}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Skeleton height="110px" width="110px" />
                </Box>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
              </GridContents>
            ))
        : stationaryList.map((item) =>
            shouldRenderWeapon(item.category) ? (
              <GridContents
                columnDesign={[2, null, 5]}
                key={item.id}
                id={item.id}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ImageZoom
                    originalImg={item.image}
                    thumbnail={item.image}
                    name={item.short_name}
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
