"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Backpack, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchDataWithNone } from "@/lib/api";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function BackpackDetail() {
  const param = useSearchParams();
  const [backpackList, setBackpackList] = useState<Backpack[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.backpack}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_BACKPACK, setBackpackList);
  }, []);

  useScrollMove(param.get("id"), backpackList);

  if (!backpackList || !column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {backpackList.map((item) => (
        <GridContents columnDesign={[2, null, 5]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
          <GridCenterText>{item.capacity} </GridCenterText>
          <GridCenterText>
            {item.grids[0].width} x {item.grids[0].height}
          </GridCenterText>
          <GridCenterText>{item.weight} kg</GridCenterText>
        </GridContents>
      ))}
    </>
  );
}
