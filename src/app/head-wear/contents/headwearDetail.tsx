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
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { filterColumnValues } from "@/lib/columnFilter";

export default function HeadWearDetail() {
  const param = useSearchParams();
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

  if (!headWearList) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {headWearList.class_headwear.map((item) => (
        <GridContents columnDesign={[2, null, 7]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom
              originalImg={item.image}
              thumbnail={item.image}
              name={item.name}
            />
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
        column={filterColumnValues(column, ["사진", "이름"])}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {headWearList.no_class_headwear.map((item) => (
        <GridContents columnDesign={[2, null, 2]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom
              originalImg={item.image}
              thumbnail={item.image}
              name={item.name}
            />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
        </GridContents>
      ))}
    </>
  );
}
