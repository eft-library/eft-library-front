import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Heading } from "@chakra-ui/react";
import type { PageParent } from "@/types/types";

export default function BoardContainer({ children }: PageParent) {
  return (
    <Box
      w={"100%"}
      bg={ALL_COLOR.BACKGROUND}
      pb={20}
      paddingTop="80px"
      paddingBottom="20px"
    >
      <Box bg={ALL_COLOR.BACKGROUND} color={ALL_COLOR.WHITE} fontWeight="600">
        <Box textAlign="center" my={5}>
          <Heading as="h1" size="xl">
            타르코프 커뮤니티
          </Heading>
        </Box>
        <Box width="60%" mx="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
