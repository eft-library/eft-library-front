import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { GridCenterText } from "@/types/types";

export default function GridCenterText({ value }: GridCenterText) {
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      <Text color={ALL_COLOR.WHITE} textAlign="center">
        {value}
      </Text>
    </Box>
  );
}
