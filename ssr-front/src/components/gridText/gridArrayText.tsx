import { GridItem, Text } from "@chakra-ui/react";
import type { GridArrayText } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridArrayText({ arrayText }: GridArrayText) {
  const { blackWhite } = useColorValue();
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
          color={blackWhite}
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
