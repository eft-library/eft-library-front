import { GridItem, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

interface RenderArrayTextType {
  arrayText: string[];
}

export default function RenderArrayText({ arrayText }: RenderArrayTextType) {
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
