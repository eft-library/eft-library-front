"use client";

import { Box, SimpleGrid, Text, Image, GridItem } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponGun, Column } from "@/types/types";

export default function WeaponGun({ gunList, category }: WeaponGun) {
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

  if (!column) return null;

  return (
    <>
      <SimpleGrid
        columns={[2, null, 9]}
        spacing={2}
        width={"95%"}
        outline={"2px solid"}
        outlineColor={ALL_COLOR.WHITE}
        borderRadius={"lg"}
        boxShadow={ALL_COLOR.BOX_SHADOW}
        p={2}
        mb={6}
      >
        {column.value_kr.map((item, index) => (
          <GridItem key={index} colSpan={index === 0 ? 2 : 1}>
            <Text
              color={ALL_COLOR.WHITE}
              key={index}
              textAlign={"center"}
              fontWeight={700}
              textShadow={ALL_COLOR.YELLOW_SHADOW}
            >
              {item}
            </Text>
          </GridItem>
        ))}
      </SimpleGrid>
      {gunList.map((item, index) =>
        shouldRenderWeapon(item.category) ? (
          <GridContents columnDesign={[2, null, 9]} key={index}>
            <GridItem colSpan={2}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Image src={item.image} maxH={"200px"} alt={item.name} />
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
              {item.modes_kr.map((mode, mIndex) => (
                <Text key={mIndex} color={ALL_COLOR.WHITE} textAlign="center">
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