import { Box, Text } from "@chakra-ui/react";
import type { GridCenterText } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function GridCenterText({
  children,
  mb = 0,
  mt = 0,
  otherColor,
  isHover = false,
}: GridCenterText) {
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
          _hover={isHover ? { color: ALL_COLOR.BEIGE } : {}}
        >
          {children}
        </Text>
      ) : (
        <Text
          color={ALL_COLOR.WHITE}
          _hover={isHover ? { color: ALL_COLOR.BEIGE } : {}}
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
