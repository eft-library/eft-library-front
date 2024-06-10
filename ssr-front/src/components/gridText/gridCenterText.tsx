import { Box, Text } from "@chakra-ui/react";
import type { GridCenterText } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridCenterText({ value }: GridCenterText) {
  const { blackWhite } = useColorValue();
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      <Text color={blackWhite} textAlign="center">
        {value}
      </Text>
    </Box>
  );
}
