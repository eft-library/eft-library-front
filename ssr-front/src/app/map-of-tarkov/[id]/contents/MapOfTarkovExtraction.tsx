"use client";

import { SimpleGrid, Image, GridItem, Text, Box } from "@chakra-ui/react";
import RenderArrayText from "@/components/gridText/renderArrayText";
import RenderText from "@/components/gridText/renderText";
import DividerContents from "@/components/dividerContents/dividerContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import type { MapOfTarkovExtraction, Column } from "@/types/types";

export default function MapOfTarkovExtraction({
  extractionList,
}: MapOfTarkovExtraction) {
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
        <SimpleGrid
          columns={[2, null, 7]}
          spacing={2}
          width={"100%"}
          outline={"1px solid"}
          outlineColor={ALL_COLOR.WHITE}
          borderRadius={"lg"}
          p={2}
          mb={6}
        >
          {column.value_kr.map((item, index) => (
            <RenderText text={item} key={index} />
          ))}
        </SimpleGrid>
        {extractionList.map((extraction, index) => (
          <SimpleGrid
            columns={[2, null, 7]}
            spacing={2}
            width={"100%"}
            outline={"1px solid"}
            outlineColor={ALL_COLOR.WHITE}
            borderRadius={"lg"}
            p={2}
            mb={4}
            key={index}
          >
            <GridItem
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image src={formatImage(extraction.image)} alt="extraction" />
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
            >
              {extraction.requirements.map((item, index) => (
                <Box key={index}>
                  <Image src={formatImage(item.image)} alt="extraction" />
                  <Text
                    color={ALL_COLOR.WHITE}
                    mt={2}
                    mb={extraction.requirements.length === index + 1 ? 0 : 10}
                    fontWeight={600}
                    textAlign="center"
                  >
                    {item.desc}
                  </Text>
                </Box>
              ))}
            </GridItem>
            <RenderArrayText arrayText={extraction.tip} />
          </SimpleGrid>
        ))}
      </Box>
    </DividerContents>
  );
}
