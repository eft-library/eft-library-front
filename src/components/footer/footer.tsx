"use client";

import { Text, Grid, GridItem, Box, Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { FooterColumn } from "@/types/types";
import { ColorMode } from "@/hooks/useColorTheme";
import FooterSkeleton from "./footerSkeleton";
import { FooterSVG } from "../viewSVG/dynamicSVG";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import Link from "next/link";

export default function Footer() {
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
      bg={ALL_COLOR.BACKGROUND}
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="auto"
    >
      <Grid templateColumns="repeat(4, 1fr)" width={"60%"} height={"300px"}>
        <GridItem colSpan={3} h="14">
          <Flex direction="column" justifyContent="center">
            <Box display={"flex"} m={1}>
              <Text
                color={ALL_COLOR.FOOTER_YELLO}
                fontWeight={"bold"}
                _hover={{ color: ALL_COLOR.MAIN_YELLO }}
              >
                <Link href="/privacy-policy-kr" target="_blank">
                  개인정보처리방침&nbsp;
                </Link>
              </Text>
              <Text
                color={ALL_COLOR.FOOTER_YELLO}
                fontWeight={"bold"}
                _hover={{ color: ALL_COLOR.MAIN_YELLO }}
              >
                <Link href="/privacy-policy-en" target="_blank">
                  (Privacy Policy), &nbsp;
                </Link>
              </Text>
              <Text
                color={ALL_COLOR.FOOTER_YELLO}
                fontWeight={"bold"}
                _hover={{ color: ALL_COLOR.MAIN_YELLO }}
              >
                <Link href="/terms" target="_blank">
                  이용 약관
                </Link>
              </Text>
            </Box>
            {column.json_value.text.map((item) => (
              <Text
                color={ALL_COLOR.WHITE}
                m={1}
                fontWeight={"bold"}
                key={item.value}
              >
                {item.value}
              </Text>
            ))}
            <Box display={"flex"} m={1}>
              <Text
                color={ALL_COLOR.FOOTER_YELLO}
                fontWeight={"bold"}
                _hover={{ color: ALL_COLOR.MAIN_YELLO }}
              >
                <Link href="https://eftlibrary.com/" target="_blank">
                  EFT Library
                </Link>
              </Text>
              <Text color={ALL_COLOR.WHITE} fontWeight={"bold"}>
                &nbsp;by&nbsp;TKL&nbsp;is licensed under&nbsp;
              </Text>
              <Text
                color={ALL_COLOR.FOOTER_YELLO}
                fontWeight={"bold"}
                _hover={{ color: ALL_COLOR.MAIN_YELLO }}
              >
                <Link
                  href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
                  target="_blank"
                  rel="license noopener noreferrer"
                >
                  CC BY-NC-ND 4.0
                </Link>
              </Text>
            </Box>
            <Link
              href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
              target="_blank"
              rel="license noopener noreferrer"
              style={{ display: "inline-block", width: "146px" }}
            >
              <Image
                m={1}
                src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png"
                alt="ND"
                h={"50px"}
                ml={"3px"}
              />
            </Link>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={1}
          h="24"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Flex display={"flex"} flexDirection={"column"} m={1}>
            <Text color={ALL_COLOR.WHITE} m={1} fontWeight={"bold"} mb={3}>
              Team TKL - HJ, SY, JY
            </Text>
            <Box display={"flex"}>
              {column.json_value.icon.map((item, index) => (
                <Box
                  ml={index === 0 ? "" : 4}
                  key={item.name}
                  cursor={"pointer"}
                  onClick={() => window.open(item.link, "_blank")}
                >
                  <FooterSVG svgValue={item.name} />
                  <Text
                    color={ALL_COLOR.WHITE}
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    {item.name}
                  </Text>
                </Box>
              ))}
            </Box>
          </Flex>
        </GridItem>
        {/* <GridItem
          colStart={3}
          colEnd={6}
          h="14"
          display="flex"
          justifyContent="flex-end"
        >
          <ColorMode />
        </GridItem> */}
      </Grid>
    </Box>
  );
}
