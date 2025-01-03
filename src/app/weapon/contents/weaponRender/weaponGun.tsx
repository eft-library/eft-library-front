"use client";

import { Box, GridItem, Skeleton } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponGun, Column } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import GridTitle from "@/components/gridTitle/gridTitle";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function WeaponGun({ gunList, category }: WeaponGun) {
  const [column, setColumn] = useState<Column>();
  const param = useSearchParams();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.weapon}`,
      setColumn
    );
  }, []);

  useScrollMove(param.get("id"), gunList, "WEAPON");

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (itemCategory: string) => {
    const isGeneralCategory =
      itemCategory !== "Special weapons" &&
      itemCategory !== "Stationary weapons";
    const isMatchingCategory = itemCategory === category || category === "ALL";
    return isGeneralCategory && isMatchingCategory;
  };
  // 무기 문자열 자르기
  const sliceDefaultAmmo = (defaultAmmo: string) => {
    if (!defaultAmmo) return "";

    const pattern = "mm";
    const handGunPattern = "ACP";

    const index = defaultAmmo.indexOf(pattern);
    const handGunIndex = defaultAmmo.indexOf(handGunPattern);

    if (index !== -1) {
      return defaultAmmo.substring(0, index + pattern.length);
    } else if (handGunIndex !== -1) {
      return defaultAmmo.substring(0, handGunIndex + handGunPattern.length);
    } else {
      return defaultAmmo;
    }
  };

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 9]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
        isWeapon
      />
      {gunList.length < 1
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 9]}
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
        : gunList.map((item) =>
            shouldRenderWeapon(item.category) ? (
              <GridContents
                columnDesign={[2, null, 9]}
                key={item.id}
                id={item.id}
              >
                <GridItem colSpan={2}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <ImageZoom
                      originalImg={item.image}
                      thumbnail={item.image}
                      name={item.short_name}
                    />
                  </Box>
                </GridItem>
                <GridCenterText>{item.short_name}</GridCenterText>
                <GridCenterText>
                  {sliceDefaultAmmo(item.default_ammo)}
                </GridCenterText>
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
                <GridCenterText>{item.ergonomics}</GridCenterText>
                <GridCenterText>{item.recoil_horizontal}</GridCenterText>
                <GridCenterText>{item.recoil_vertical}</GridCenterText>
              </GridContents>
            ) : null
          )}
    </>
  );
}
