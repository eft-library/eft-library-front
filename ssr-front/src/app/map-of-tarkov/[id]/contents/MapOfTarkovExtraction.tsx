"use client";

import { SimpleGrid, GridItem, Text, Box } from "@chakra-ui/react";
import RenderArrayText from "@/components/gridText/renderArrayText";
import RenderText from "@/components/gridText/renderText";
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
    return text.split("\n").map((line, index) => (
      <span key={index}>
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
            <GridItem key={index} colSpan={index === 0 || index === 5 ? 2 : 1}>
              <RenderText text={item} />
            </GridItem>
          ))}
        </SimpleGrid>
        {extractionList.map((extraction, index) => (
          <SimpleGrid
            columns={[2, null, 9]}
            spacing={2}
            width={"100%"}
            outline={"1px solid"}
            outlineColor={blackWhite}
            borderRadius={"lg"}
            p={2}
            mb={4}
            key={index}
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
              />
            </GridItem>

            <RenderText text={extraction.name} />
            <RenderText text={extraction.faction} />
            <RenderText text={extraction.always_available ? "✅" : "❌"} />
            <RenderText text={extraction.single_use ? "✅" : "❌"} />
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
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    {item.image && (
                      <ImageZoom
                        originalImg={item.image}
                        thumbnail={item.thumbnail}
                        needFormat
                      />
                    )}
                    <Text
                      color={blackWhite}
                      mt={2}
                      mb={extraction.requirements.length === index + 1 ? 0 : 10}
                      fontWeight={600}
                      textAlign="center"
                    >
                      {formatTextWithLineBreaks(item.desc)}
                    </Text>
                  </Box>
                ))
              ) : (
                <Text>-</Text>
              )}
            </GridItem>
            {extraction.tip.length > 0 ? (
              <RenderArrayText arrayText={extraction.tip} />
            ) : (
              <RenderText text={"-"} />
            )}
          </SimpleGrid>
        ))}
      </Box>
    </DividerContents>
  );
}
