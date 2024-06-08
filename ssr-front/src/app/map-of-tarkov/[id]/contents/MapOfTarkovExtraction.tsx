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

export default function MapOfTarkovExtraction({
  extractionList,
}: MapOfTarkovExtractionType) {
  const [column, setColumn] = useState<ColumnType>();

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

interface ColumnType {
  id: string;
  type: string;
  update_time: string;
  value_kr: string[] | null;
  value_en: string[] | null;
  json_value: JsonValueType[] | null;
}

// JsonValueType 인터페이스 정의
interface JsonValueType {
  value: string;
  desc_en: string;
  desc_kr: string;
  order: number;
}

interface MapOfTarkovExtractionType {
  extractionList: ExtractionInfoType[];
}

interface Requirement {
  desc: string;
  image: string;
}

interface ExtractionInfoType {
  name: string;
  faction: string;
  single_use: boolean;
  tip: string[];
  update_time: string;
  image: string;
  id: string;
  always_available: boolean;
  requirements: Requirement[];
  map: string;
}
