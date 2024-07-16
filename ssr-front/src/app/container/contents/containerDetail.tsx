"use client";

import { Box } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Container, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchDataWithNone } from "@/lib/api";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";
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

export default function ContainerDetail() {
  const param = useSearchParams();
  const [containerList, setContainerList] = useState<Container[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.container}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_CONTAINER, setContainerList);
  }, []);

  useScrollMove(param.get("id"), containerList);

  if (!containerList || !column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 4]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {containerList.map((item) => (
        <GridContents columnDesign={[2, null, 4]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name_kr}</GridCenterText>
          <GridCenterText>{item.capacity}</GridCenterText>
          <GridCenterText>
            {item.grids[0].width} x {item.grids[0].height}
          </GridCenterText>
        </GridContents>
      ))}
    </>
  );
}
