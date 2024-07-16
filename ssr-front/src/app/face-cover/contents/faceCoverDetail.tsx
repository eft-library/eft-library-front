"use client";

import { Box } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { FaceCoverList, Column } from "@/types/types";
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
const GridArrayText = dynamic(
  () => import("@/components/gridText/gridArrayText"),
  {
    ssr: false,
  }
);
const ImageZoom = dynamic(() => import("@/components/imageZoom/imageZoom"), {
  ssr: false,
});

export default function FaceCoverDetail() {
  const param = useSearchParams();
  const [faceCoverList, setFaceCoverList] = useState<FaceCoverList>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.faceCover}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_FACE_COVER, setFaceCoverList);
  }, []);

  useScrollMove(param.get("id"), faceCoverList);

  const noClassColumn = (column: string[]) => {
    return column.filter((item) => item === "사진" || item === "이름");
  };

  if (!column || !faceCoverList) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {faceCoverList.class_face_cover.map((item) => (
        <GridContents columnDesign={[2, null, 7]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
          <GridCenterText>{item.class_value}</GridCenterText>
          <GridArrayText arrayText={item.areas_kr} />
          <GridCenterText>{item.durability}</GridCenterText>
          <GridCenterText>{item.ricochet_str_kr}</GridCenterText>
          <GridCenterText>{item.weight} kg</GridCenterText>
        </GridContents>
      ))}
      <Box mb={20} />
      <GridTitle
        columnDesign={[2, null, 2]}
        column={noClassColumn(column.value_kr)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {faceCoverList.no_class_face_cover.map((item) => (
        <GridContents columnDesign={[2, null, 2]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
        </GridContents>
      ))}
    </>
  );
}
