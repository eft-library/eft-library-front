import { SimpleGrid, Text } from "@chakra-ui/react";
import type { GridTitle } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridTitle({
  columnDesign,
  column,
  isShadow,
  shadowColor,
}: GridTitle) {
  const { blackWhite } = useColorValue();
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={"95%"}
      outline={"2px solid"}
      outlineColor={blackWhite}
      borderRadius={"lg"}
      boxShadow={isShadow ? shadowColor : ""}
      p={2}
      mb={6}
    >
      {column.map((item, index) => (
        <Text
          color={blackWhite}
          key={index}
          textAlign={"center"}
          fontWeight={700}
          textShadow={isShadow ? shadowColor : ""}
        >
          {item}
        </Text>
      ))}
    </SimpleGrid>
  );
}
