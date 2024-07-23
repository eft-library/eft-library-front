import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Text } from "@chakra-ui/react";

export default function InfoBox({ desc, value }) {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      border={"1px solid"}
      borderColor={ALL_COLOR.WHITE}
      borderRadius={"lg"}
      p={4}
    >
      <Text fontWeight={600} color={ALL_COLOR.YELLOW} mb={2}>
        {desc}
      </Text>
      <Text fontWeight={600}>{value}</Text>
    </Box>
  );
}
