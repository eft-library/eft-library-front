import { Box, Text } from "@chakra-ui/react";
import type { GridCenterText } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridCenterText({
  children,
  mb = 0,
  mt = 0,
  otherColor,
  isHover = false,
}: GridCenterText) {
  const { blackWhite, beige } = useColorValue();

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
          _hover={isHover ? { color: beige } : {}}
        >
          {children}
        </Text>
      ) : (
        <Text
          color={blackWhite}
          _hover={isHover ? { color: beige } : {}}
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
