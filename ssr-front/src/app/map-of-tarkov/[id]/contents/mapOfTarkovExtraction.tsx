"use client";

import { GridItem, Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import DividerContents from "@/components/dividerContents/dividerContents";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import type { MapOfTarkovExtraction, Column } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import GridImageText from "@/components/gridText/girdImageText";

export default function MapOfTarkovExtraction({
  extractionList,
}: MapOfTarkovExtraction) {
  const { yellowShadow } = useColorValue();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.extraction}`,
      setColumn
    );
  }, []);

  if (!column) return null;

  return (
    <DividerContents headText="탈출구">
      <Box
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        width={"100%"}
        flexDirection={"column"}
      >
        <GridTitle
          columnDesign={[2, null, 10]}
          column={column.value_kr}
          isShadow
          shadowColor={yellowShadow}
          titleWidth="100%"
          isExtraction
        />
        {extractionList.map((extraction) => (
          <GridContents
            columnDesign={[2, null, 10]}
            contentsWidth="100%"
            id={extraction.id}
          >
            <GridItem
              display="flex"
              colSpan={2}
              justifyContent="center"
              alignItems="center"
            >
              <ImageZoom
                originalImg={extraction.image}
                thumbnail={extraction.image_thumbnail}
                needFormat
                isMax={false}
              />
            </GridItem>
            <GridCenterText>{extraction.name}</GridCenterText>
            <GridCenterText>{extraction.faction}</GridCenterText>
            <GridCenterText>
              {extraction.always_available ? "✅" : "❌"}
            </GridCenterText>
            <GridCenterText>
              {extraction.single_use ? "✅" : "❌"}
            </GridCenterText>
            <GridImageText jsonList={extraction.requirements} />
            <GridImageText jsonList={extraction.tip} />
          </GridContents>
        ))}
      </Box>
    </DividerContents>
  );
}
