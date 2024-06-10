"use client";

import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { PageParent } from "@/types/types";

export default function PageParent({ children }: PageParent) {
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
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection="column"
          mb={"40px"}
          mt={"40px"}
        >
          {children}
        </Flex>
      </Flex>
    </Box>
  );
}
