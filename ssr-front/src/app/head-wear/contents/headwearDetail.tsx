"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import GridArrayText from "@/components/gridText/gridArrayText";
import { Box } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { HeadwearList, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchDataWithNone } from "@/lib/api";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function HeadWearDetail() {
  const param = useSearchParams();
  const { yellowShadow } = useColorValue();
  const [headWearList, setHeadWearList] = useState<HeadwearList>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.headwear}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_HEAD_WEAR, setHeadWearList);
  }, []);

  useScrollMove(param.get("id"), headWearList);

  const noClassColumn = (column: string[]) => {
    return column.filter((item) => item === "사진" || item === "이름");
  };

  if (!column || !headWearList) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {headWearList.class_headwear.map((item) => (
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
        shadowColor={yellowShadow}
      />
      {headWearList.no_class_headwear.map((item) => (
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
