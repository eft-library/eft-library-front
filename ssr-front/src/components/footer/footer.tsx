"use client";

import { Text, Grid, GridItem, Box, Flex } from "@chakra-ui/react";
import DynamicSVG from "../viewSVG/dynamicSVG";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { FooterColumn } from "@/types/types";
import { ColorMode } from "@/hooks/useColorTheme";
import FooterSkeleton from "./footerSkeleton";
import useColorValue from "@/hooks/useColorValue";

export default function Footer() {
  const { backWhite, whiteBack } = useColorValue();
  const [column, setColumn] = useState<FooterColumn>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.footer}`,
      setColumn
    );
  }, []);

  if (!column) return <FooterSkeleton />;

  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={whiteBack}
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
            {column.json_value.text.map((item) => (
              <Text
                color={backWhite}
                m={2}
                fontWeight={"bold"}
                key={item.value}
              >
                {item.value}
              </Text>
            ))}
            <Flex direction="row" m={1}>
              {column.json_value.icon.map((item, index) => (
                <Box
                  ml={index === 0 ? "" : 4}
                  key={item.name}
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
                    color={backWhite}
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
