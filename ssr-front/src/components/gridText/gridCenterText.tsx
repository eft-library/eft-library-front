import { Box, Text } from "@chakra-ui/react";
import type { GridCenterText } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridCenterText({
  children,
  mb = 0,
  mt = 0,
  otherColor,
}: GridCenterText) {
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
      {otherColor ? (
        <Text
          color={otherColor}
          textAlign="center"
          fontWeight={600}
          mb={mb}
          mt={mt}
        >
          {children}
        </Text>
      ) : (
        <Text
          color={blackWhite}
          textAlign="center"
          fontWeight={600}
          mb={mb}
          mt={mt}
        >
          {children}
        </Text>
      )}
    </Box>
  );
}
