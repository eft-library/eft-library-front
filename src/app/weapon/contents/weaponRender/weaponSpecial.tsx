"use client";

import { Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, WeaponSpecial } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function WeaponSpecial({
  specialList,
  category,
}: WeaponSpecial) {
  const [column, setColumn] = useState<Column>();
  const param = useSearchParams();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.special}`,
      setColumn
    );
  }, []);

  useScrollMove(param.get("id"), specialList, "WEAPON");

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
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {specialList.map((item) =>
        shouldRenderWeapon(item.category) ? (
          <GridContents columnDesign={[2, null, 2]} key={item.id} id={item.id}>
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
            <GridCenterText>{item.short_name}</GridCenterText>
          </GridContents>
        ) : null
      )}
    </>
  );
}
