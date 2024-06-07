import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

interface RenderTextType {
  text: string | number;
}

export default function RenderText({ text }: RenderTextType) {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Text color={ALL_COLOR.WHITE} fontWeight={600} textAlign="center">
        {text}
      </Text>
    </Box>
  );
}
