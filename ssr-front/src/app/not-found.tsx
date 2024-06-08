"use client";

import Logo from "@/assets/logo";
import { Box, Flex, Text, SimpleGrid, GridItem } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function NotFound() {
  const size = useWindowSize();
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
      paddingTop="80px"
      paddingBottom="20px"
      width="100%"
      height="calc(100vh - 220px)"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="90%"
        justifyContent="center"
        paddingBottom={"20px"}
      >
        <SimpleGrid columns={[2, null, 2]} spacing={2} width={"100%"}>
          <GridItem
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Text
                color={ALL_COLOR.WHITE}
                mb={6}
                style={{ fontSize: size.width ? size.width / 30 : "inherit" }}
              >
                404 ERROR
              </Text>
              <Text
                style={{ fontSize: size.width ? size.width / 80 : "inherit" }}
                color={ALL_COLOR.WHITE}
                mb={2}
              >
                Page Not Found
              </Text>
              <Text
                size={"sm"}
                color={ALL_COLOR.WHITE}
                style={{ fontSize: size.width ? size.width / 80 : "inherit" }}
              >
                죄송합니다. 페이지를 찾을 수 없습니다.
              </Text>
            </Box>
          </GridItem>
          <Logo
            width={size.width ? size.width / 2.5 : 400}
            height={size.height ? size.height / 2.5 : 300}
          />
        </SimpleGrid>
        {/* <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Text
              color={ALL_COLOR.WHITE}
              mb={6}
              style={{ fontSize: size.width ? size.width / 30 : "inherit" }}
            >
              404 ERROR
            </Text>
            <Text
              style={{ fontSize: size.width ? size.width / 80 : "inherit" }}
              color={ALL_COLOR.WHITE}
              mb={2}
            >
              Page Not Found
            </Text>
            <Text
              size={"sm"}
              color={ALL_COLOR.WHITE}
              style={{ fontSize: size.width ? size.width / 80 : "inherit" }}
            >
              죄송합니다. 페이지를 찾을 수 없습니다.
            </Text>
          </Box>
          <Logo
            width={size.width ? size.width / 2 : 400}
            height={size.height ? size.height / 2 : 300}
          />
        </Box> */}
      </Flex>
    </Box>
  );
}
