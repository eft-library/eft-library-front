"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import GridArrayText from "@/components/gridText/gridArrayText";
import { Box, Skeleton } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { FaceCoverList, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchDataWithNone } from "@/lib/api";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { filterColumnValues } from "@/lib/columnFilter";

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

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {!faceCoverList
        ? Array(7)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 7]}
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
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
              </GridContents>
            ))
        : faceCoverList.class_face_cover.map((item) => (
            <GridContents
              columnDesign={[2, null, 7]}
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
      {!faceCoverList
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 2]}
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
              </GridContents>
            ))
        : faceCoverList.no_class_face_cover.map((item) => (
            <GridContents
              columnDesign={[2, null, 2]}
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
            </GridContents>
          ))}
    </>
  );
}
