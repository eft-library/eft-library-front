import { Box, Flex } from "@chakra-ui/react";
import type { PageParent } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function PageParent({ children }: PageParent) {
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
        borderColor={ALL_COLOR.WHITE}
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
