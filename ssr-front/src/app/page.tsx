"use client";

import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import Info from "@/app/contents/info";
import News from "@/app/contents/news";
import Search from "@/app/contents/search";
import Slider from "./contents/slider";

export default function App() {
  const bgColor = useColorModeValue(ALL_COLOR.WHITE, ALL_COLOR.BACKGROUND);
  const flexBgColor = useColorModeValue(ALL_COLOR.BACKGROUND, ALL_COLOR.WHITE);
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
      paddingTop="80px"
      paddingBottom="20px"
      width="100%"
      height="auto"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="60%"
        height="100vh"
        justifyContent="center"
        border="1px"
        borderColor={flexBgColor}
        borderRadius={"lg"}
        paddingBottom={"20px"}
      >
        <Search />
        <News />
        <Slider />
        <Info />
      </Flex>
    </Box>
  );
}
