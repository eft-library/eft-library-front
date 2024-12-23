"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box, Skeleton } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Container, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchDataWithNone } from "@/lib/api";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";

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

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 4]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {!containerList
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 4]}
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
              </GridContents>
            ))
        : containerList.map((item) => (
            <GridContents
              columnDesign={[2, null, 4]}
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
                  name={item.name_kr}
                />
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
