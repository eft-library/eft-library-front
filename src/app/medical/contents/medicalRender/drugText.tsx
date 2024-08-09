import { Text, Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function DrugText({ label, value, positive }) {
  return (
    <Box display="flex" mb={4}>
      <Text fontWeight={600}>{label} :&nbsp;</Text>
      <Text
        fontWeight={600}
        color={positive ? ALL_COLOR.LIGHT_BLUE : ALL_COLOR.RED}
      >
        {value}
      </Text>
    </Box>
  );
}
