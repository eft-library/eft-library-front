"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import GridArrayText from "@/components/gridText/gridArrayText";
import { Box } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { RigList, Column } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { useScrollMove } from "@/hooks/useScrollMove";
import { filterColumnValues } from "@/lib/columnFilter";

export default function RigDetail() {
  const param = useSearchParams();
  const [rigList, setRigList] = useState<RigList>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.rig}`,
      setColumn
    );
    fetchDataWithNone(`${API_ENDPOINTS.GET_ALL_RIG}`, setRigList);
  }, []);

  useScrollMove(param.get("id"), rigList);

  if (!rigList) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {rigList.class_rig.map((item) => (
        <GridContents columnDesign={[2, null, 7]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom
              originalImg={item.image}
              thumbnail={item.image}
              name={item.name}
            />
          </Box>
          <GridCenterText>{item.name} </GridCenterText>
          <GridCenterText>{item.durability} </GridCenterText>
          <GridCenterText>{item.capacity} </GridCenterText>
          <GridCenterText>{item.class_value} </GridCenterText>
          <GridArrayText arrayText={item.areas_kr} />
          <GridCenterText>{item.weight} kg</GridCenterText>
        </GridContents>
      ))}
      <Box mb={20} />
      <GridTitle
        columnDesign={[2, null, 4]}
        column={filterColumnValues(column, ["사진", "이름", "슬롯", "무게"])}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {rigList.no_class_rig.map((item) => (
        <GridContents columnDesign={[2, null, 4]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom
              originalImg={item.image}
              thumbnail={item.image}
              name={item.name}
            />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
          <GridCenterText>{item.capacity}</GridCenterText>
          <GridCenterText>{item.weight} kg</GridCenterText>
        </GridContents>
      ))}
    </>
  );
}
