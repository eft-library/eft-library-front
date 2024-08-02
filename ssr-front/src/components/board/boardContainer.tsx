import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Heading } from "@chakra-ui/react";
import type { PageParent } from "@/types/types";

export default function BoardContainer({ children }: PageParent) {
  return (
    <Box
      w={"100%"}
      bg={ALL_COLOR.BLACK}
      pb={20}
      paddingTop="80px"
      paddingBottom="20px"
    >
      <Box
        bg="black"
        color="white"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        <Box textAlign="center" my={5}>
          <Heading size="2xl">타르코프 커뮤니티</Heading>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
