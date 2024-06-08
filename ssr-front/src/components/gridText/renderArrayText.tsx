import { GridItem, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { RenderArrayText } from "@/types/types";

export default function RenderArrayText({ arrayText }: RenderArrayText) {
  return (
    <GridItem
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      {arrayText.map((text, atIndex) => (
        <Text
          key={atIndex}
          color={ALL_COLOR.WHITE}
          mt={atIndex !== 0 ? 2 : 0}
          fontWeight={600}
          textAlign="center"
        >
          {text}
        </Text>
      ))}
    </GridItem>
  );
}
