"use client";

import { Box, Flex } from "@chakra-ui/react";
import type { PageParent } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function PageParent({ children }: PageParent) {
  const { whiteBack, backWhite } = useColorValue();

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
        borderColor={backWhite}
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
