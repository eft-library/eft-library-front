"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import GridArrayText from "@/components/gridText/gridArrayText";
import { Box, Skeleton } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { ArmorVest, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function ArmorVestDetail() {
  const param = useSearchParams();
  const [armorVestList, setArmotVestList] = useState<ArmorVest[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.armorVest}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_ARMOR_VEST, setArmotVestList);
  }, []);

  useScrollMove(param.get("id"), armorVestList);

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 6]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {!armorVestList
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 6]}
                id={`armband-null-${index}`}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Skeleton height="110px" width="110px" />
                </Box>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
              </GridContents>
            ))
        : armorVestList.map((item) => (
            <GridContents
              columnDesign={[2, null, 6]}
              key={item.id}
              id={item.id}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImageZoom
                  originalImg={item.image}
                  thumbnail={item.image}
                  name={item.name}
                />
              </Box>
              <GridCenterText>{item.name}</GridCenterText>
              <GridCenterText>{item.durability}</GridCenterText>
              <GridCenterText>{item.class_value}</GridCenterText>
              <GridArrayText arrayText={item.areas_kr} />
              <GridCenterText>{item.weight} kg</GridCenterText>
            </GridContents>
          ))}
    </>
  );
}
