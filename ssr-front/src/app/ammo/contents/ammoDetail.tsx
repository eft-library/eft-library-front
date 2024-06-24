"use client";

import { Box, GridItem } from "@chakra-ui/react";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import useColorValue from "@/hooks/useColorValue";
import type { AmmoDetail, Ammo, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { useScrollMove } from "@/hooks/useScrollMove";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import EfficiencyBox from "./efficiencyBox";

export default function AmmoDetail({ category }: AmmoDetail) {
  const param = useSearchParams();
  const { yellowShadow } = useColorValue();
  const [ammoList, setAmmoList] = useState<Ammo[]>(null);
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.ammo}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_AMMO, setAmmoList);
  }, []);

  useScrollMove(param.get("id"), ammoList, "AMMO");

  const checkViewAmmo = (ammoCategory: string) => {
    return category === "ALL" || category === ammoCategory;
  };

  const floatToPercent = (value: number) => {
    if (value !== 0) {
      return Math.round(value * 100);
    } else {
      return value;
    }
  };

  if (!ammoList || !column) return <WeaponSkeleton />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <GridTitle
        columnDesign={[2, null, 11]}
        column={column.value_kr}
        isShadow
        isAmmo
        shadowColor={yellowShadow}
      />
      {ammoList.map((item) =>
        checkViewAmmo(item.category) ? (
          <GridContents columnDesign={[2, null, 11]} key={item.id} id={item.id}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ImageZoom originalImg={item.image} thumbnail={item.image} />
            </Box>
            <GridCenterText>{item.name} </GridCenterText>
            <GridCenterText>{item.damage} </GridCenterText>
            <GridCenterText>{item.penetration_power} </GridCenterText>
            <GridCenterText>{item.armor_damage}</GridCenterText>
            <GridCenterText>
              {floatToPercent(item.accuracy_modifier)}
            </GridCenterText>
            <GridCenterText>
              {floatToPercent(item.recoil_modifier)}
            </GridCenterText>
            <GridCenterText>
              {floatToPercent(item.light_bleed_modifier)}
            </GridCenterText>
            <GridCenterText>
              {floatToPercent(item.heavy_bleed_modifier)}
            </GridCenterText>
            <GridItem
              colSpan={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {item.efficiency.map((efficiency) => (
                <EfficiencyBox value={efficiency} />
              ))}
            </GridItem>
          </GridContents>
        ) : null
      )}
    </Box>
  );
}
