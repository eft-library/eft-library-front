"use client";

import {
  Text,
  Grid,
  GridItem,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import DynamicSVG from "../viewSVG/dynamicSVG";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { FooterColumn } from "@/types/types";
import { ColorMode } from "@/hooks/useColorTheme";

export default function Footer() {
  const [column, setColumn] = useState<FooterColumn>();
  const bgColor = useColorModeValue(ALL_COLOR.WHITE, ALL_COLOR.BACKGROUND);
  const textColor = useColorModeValue(ALL_COLOR.BACKGROUND, ALL_COLOR.WHITE);

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
      bg={bgColor}
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
              <Text color={textColor} m={2} fontWeight={"bold"} key={index}>
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
                    color={textColor}
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
        <GridItem
          colStart={3}
          colEnd={6}
          h="14"
          display="flex"
          justifyContent="flex-end"
        >
          <ColorMode />
        </GridItem>
      </Grid>
    </Box>
  );
}
