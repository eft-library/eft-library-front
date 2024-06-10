import { Box, Text } from "@chakra-ui/react";
import type { RenderText } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function RenderText({ text }: RenderText) {
  const { blackWhite } = useColorValue();
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Text color={blackWhite} fontWeight={600} textAlign="center">
        {text}
      </Text>
    </Box>
  );
}
