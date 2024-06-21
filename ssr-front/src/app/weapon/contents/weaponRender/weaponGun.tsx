"use client";

import { Box, Text, GridItem } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponGun, Column } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";
import useColorValue from "@/hooks/useColorValue";
import GridTitle from "@/components/gridTitle/gridTitle";
import ImageZoom from "@/components/imageZoom/imageZoom";

export default function WeaponGun({ gunList, category }: WeaponGun) {
  const { blackWhite, yellowShadow } = useColorValue();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.weapon}`,
      setColumn
    );
  }, []);

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

  if (!column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 9]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
        isWeapon
      />
      {gunList.map((item) =>
        shouldRenderWeapon(item.category) ? (
          <GridContents columnDesign={[2, null, 9]} key={item.id}>
            <GridItem colSpan={2}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImageZoom originalImg={item.image} thumbnail={item.image} />
              </Box>
            </GridItem>
            <GridCenterText value={item.short_name} />
            <GridCenterText value={sliceDefaultAmmo(item.default_ammo)} />
            <Box
              w={"100%"}
              h={"100%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              {item.modes_kr.map((mode) => (
                <Text key={mode} color={blackWhite} textAlign="center">
                  {mode}
                </Text>
              ))}
            </Box>
            <GridCenterText value={item.fire_rate} />
            <GridCenterText value={item.ergonomics} />
            <GridCenterText value={item.recoil_horizontal} />
            <GridCenterText value={item.recoil_vertical} />
          </GridContents>
        ) : null
      )}
    </>
  );
}
