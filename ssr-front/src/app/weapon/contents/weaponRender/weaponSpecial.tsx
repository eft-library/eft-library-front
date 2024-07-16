"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, WeaponSpecial } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";
import dynamic from "next/dynamic";

const GridContents = dynamic(
  () => import("@/components/gridContents/gridContents"),
  { ssr: false }
);
const GridCenterText = dynamic(
  () => import("@/components/gridText/gridCenterText"),
  { ssr: false }
);
const GridTitle = dynamic(() => import("@/components/gridTitle/gridTitle"), {
  ssr: false,
});
const ImageZoom = dynamic(() => import("@/components/imageZoom/imageZoom"), {
  ssr: false,
});

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
              <ImageZoom originalImg={item.image} thumbnail={item.image} />
            </Box>
            <GridCenterText>{item.short_name}</GridCenterText>
          </GridContents>
        ) : null
      )}
    </>
  );
}
