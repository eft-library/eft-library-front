import { Box, Text } from "@chakra-ui/react";
import type { GridCenterText } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function GridCenterText({
  value,
  isEffect = false,
}: GridCenterText) {
  const { blackWhite } = useColorValue();

  const checkPlus = (effect: number | string) => {
    if (typeof effect === "number") {
      if (effect == 0) {
        return blackWhite;
      } else if (effect > 0) {
        return ALL_COLOR.LIGHT_BLUE;
      } else {
        return ALL_COLOR.RED;
      }
    }
  };

  const addPlusMinus = (text: number | string) => {
    if (typeof text === "number") {
      if (text > 0) {
        return `+${text}`;
      } else {
        return text;
      }
    }
  };

  return (
    <Box
      w={"100%"}
      h={"100%"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      {isEffect ? (
        <Text color={checkPlus(value)} textAlign="center">
          {addPlusMinus(value)}
        </Text>
      ) : (
        <Text color={blackWhite} textAlign="center">
          {value}
        </Text>
      )}
    </Box>
  );
}
