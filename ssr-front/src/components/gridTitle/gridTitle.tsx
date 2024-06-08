import { SimpleGrid, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { GridTitle } from "@/types/types";

export default function GridTitle({
  columnDesign,
  column,
  isShadow,
  shadowColor,
}: GridTitle) {
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={"95%"}
      outline={"2px solid"}
      outlineColor={ALL_COLOR.WHITE}
      borderRadius={"lg"}
      boxShadow={isShadow ? shadowColor : ""}
      p={2}
      mb={6}
    >
      {column.map((item, index) => (
        <Text
          color={ALL_COLOR.WHITE}
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
