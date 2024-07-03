"use client";

import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import DividerContents from "@/components/dividerContents/dividerContents";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import type { MapOfTarkovExtraction, Column } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";

export default function MapOfTarkovExtraction({
  extractionList,
}: MapOfTarkovExtraction) {
  const { blackWhite, whiteBlack } = useColorValue();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.extraction}`,
      setColumn
    );
  }, []);

  // 줄바꿈 처리
  const formatTextWithLineBreaks = (text: string) => {
    return text.split("\n").map((line) => (
      <span key={line}>
        {line}
        <br />
      </span>
    ));
  };

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
        <SimpleGrid
          columns={[2, null, 9]}
          spacing={2}
          width={"100%"}
          outline={"1px solid"}
          position={["-webkit-sticky", "sticky"]}
          outlineColor={blackWhite}
          borderRadius={"lg"}
          bg={whiteBlack}
          top={16}
          p={2}
          mb={6}
        >
          {column.value_kr.map((item, index) => (
            <GridItem key={item} colSpan={index === 0 || index === 5 ? 2 : 1}>
              <GridCenterText>{item}</GridCenterText>
            </GridItem>
          ))}
        </SimpleGrid>
        {extractionList.map((extraction) => (
          <SimpleGrid
            columns={[2, null, 9]}
            spacing={2}
            width={"100%"}
            outline={"1px solid"}
            outlineColor={blackWhite}
            borderRadius={"lg"}
            p={2}
            mb={4}
            key={extraction.id}
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
            <GridItem
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
              colSpan={2}
            >
              {extraction.requirements.length > 0 ? (
                extraction.requirements.map((item, index) => (
                  <Box
                    key={item.desc}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    {item.image && (
                      <ImageZoom
                        originalImg={item.image}
                        thumbnail={item.thumbnail}
                        needFormat
                        isMax={false}
                      />
                    )}
                    <GridCenterText
                      mt={2}
                      mb={extraction.requirements.length === index + 1 ? 0 : 10}
                    >
                      {formatTextWithLineBreaks(item.desc)}
                    </GridCenterText>
                  </Box>
                ))
              ) : (
                <GridCenterText>-</GridCenterText>
              )}
            </GridItem>
            {extraction.tip && extraction.tip.length > 0 ? (
              extraction.tip.map((item, index) => (
                <Box
                  key={item.desc}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  {item.image && (
                    <ImageZoom
                      originalImg={item.image}
                      thumbnail={item.thumbnail}
                      needFormat
                      isMax={false}
                    />
                  )}
                  <GridCenterText
                    mt={2}
                    mb={extraction.requirements.length === index + 1 ? 0 : 10}
                  >
                    {formatTextWithLineBreaks(item.desc)}
                  </GridCenterText>
                </Box>
              ))
            ) : (
              <GridCenterText>-</GridCenterText>
            )}
          </SimpleGrid>
        ))}
      </Box>
    </DividerContents>
  );
}
