"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import GridNotes from "@/components/gridText/gridNotes";
import { Box } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { GlassesList, Column } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function GlassesDetail() {
  const param = useSearchParams();
  const [glassesList, setGlassesList] = useState<GlassesList>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.glasses}`,
      setColumn
    );
    fetchDataWithNone(`${API_ENDPOINTS.GET_ALL_GLASSES}`, setGlassesList);
  }, []);

  useScrollMove(param.get("id"), glassesList);

  const classColumn = (column: string[]) => {
    return column.filter(
      (item) =>
        item === "사진" ||
        item === "이름" ||
        item === "보호 등급" ||
        item === "내구성" ||
        item === "실명 보호"
    );
  };

  const noClassColumn = (column: string[]) => {
    return column.filter(
      (item) =>
        item === "사진" ||
        item === "이름" ||
        item === "실명 보호" ||
        item === "노트"
    );
  };

  const floatToPercent = (value: number) => {
    if (value !== 0) {
      return Math.round(value * 100);
    } else {
      return value;
    }
  };

  if (!column || !glassesList) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={classColumn(column.value_kr)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {glassesList.class_glasses.map((item) => (
        <GridContents columnDesign={[2, null, 5]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name} </GridCenterText>
          <GridCenterText>{item.class_value} </GridCenterText>
          <GridCenterText>{item.durability} </GridCenterText>
          <GridCenterText>
            {floatToPercent(item.blindness_protection)} %
          </GridCenterText>
        </GridContents>
      ))}
      <Box mb={20} />
      <GridTitle
        columnDesign={[2, null, 4]}
        column={noClassColumn(column.value_kr)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {glassesList.no_class_glasses.map((item) => (
        <GridContents columnDesign={[2, null, 4]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
          <GridCenterText>
            {floatToPercent(item.blindness_protection)} %
          </GridCenterText>
          <GridNotes questsNotes={item.notes} isGlass />
        </GridContents>
      ))}
    </>
  );
}
