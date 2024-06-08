"use client";

import { Text, Grid, GridItem, Box, Flex } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import DynamicSVG from "../viewSVG/dynamicSVG";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";

// IconType 인터페이스 정의
interface IconType {
  link: string;
  name: string;
}

// TextType 인터페이스 정의
interface TextType {
  value: string;
}

// FooterJsonValue 인터페이스 정의
interface FooterJsonValue {
  icon: IconType[];
  text: TextType[];
}

// FooterColumn 인터페이스 정의
interface FooterColumnType {
  id: string;
  json_value: FooterJsonValue;
  type: string;
}

export default function Footer() {
  const [column, setColumn] = useState<FooterColumnType>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.footer}`,
      setColumn
    );
  }, []);

  if (!column) return null;

  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={ALL_COLOR.BACKGROUND}
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="auto"
    >
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        width={"60%"}
        height={"220px"}
      >
        <GridItem colSpan={1} h="14">
          <Flex direction="column" justifyContent="center">
            {column.json_value.text.map((item, index) => (
              <Text
                color={ALL_COLOR.WHITE}
                m={2}
                fontWeight={"bold"}
                key={index}
              >
                {item.value}
              </Text>
            ))}
            <Flex direction="row" m={1}>
              {column.json_value.icon.map((item, index) => (
                <Box
                  ml={index === 0 ? "" : 4}
                  key={index}
                  cursor={"pointer"}
                  onClick={() => window.open(item.link, "_blank")}
                >
                  <DynamicSVG
                    svgValue={item.name}
                    isEnable={true}
                    x={0}
                    y={0}
                  />
                  <Text
                    color={ALL_COLOR.WHITE}
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    {item.name}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} h="14" />
        <GridItem colStart={3} colEnd={6} h="14" />
      </Grid>
    </Box>
  );
}
