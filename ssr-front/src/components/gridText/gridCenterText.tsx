import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

interface GridCenterTextProps {
  value: string | number;
}

export default function GridCenterText({ value }: GridCenterTextProps) {
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
