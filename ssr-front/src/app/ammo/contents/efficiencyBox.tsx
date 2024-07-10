import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function EfficiencyBox({ value }) {
  const checkColor = (val: number) => {
    switch (val) {
      case 6:
        return ALL_COLOR.LIGHT_GREEN;
      case 5:
        return ALL_COLOR.DARK_GREEN;
      case 4:
        return ALL_COLOR.BRIGHT_GOLD;
      case 3:
        return ALL_COLOR.DARG_BROWN;
      case 2:
        return ALL_COLOR.CHOCOLATE_BROWN;
      case 1:
        return ALL_COLOR.BURGUNDY;
      case 0:
        return ALL_COLOR.DARK_MARRON;
    }
  };

  return (
    <Box
      bg={checkColor(value)}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"lg"}
      width={10}
      height={10}
      border="1px solid"
      borderColor={ALL_COLOR.WHITE}
      ml={1}
    >
      <Text color={ALL_COLOR.WHITE} fontWeight={600}>
        {value}
      </Text>
    </Box>
  );
}
