import { SimpleGrid, Text, GridItem } from "@chakra-ui/react";
import type { GridTitle } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridTitle({
  columnDesign,
  column,
  isShadow,
  shadowColor,
  isWeapon = false,
}: GridTitle) {
  const { blackWhite, whiteBlack } = useColorValue();
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={"95%"}
      outline={"2px solid"}
      outlineColor={blackWhite}
      borderRadius={"lg"}
      bg={whiteBlack}
      boxShadow={isShadow ? shadowColor : ""}
      position={["-webkit-sticky", "sticky"]}
      top={16}
      p={2}
      mb={6}
    >
      {column.map((item, index) => (
        <GridItem key={index} colSpan={isWeapon ? (index === 0 ? 2 : 1) : 1}>
          <Text
            flexGrow={1}
            color={blackWhite}
            key={index}
            textAlign={"center"}
            fontWeight={700}
            textShadow={isShadow ? shadowColor : ""}
          >
            {item}
          </Text>
        </GridItem>
      ))}
    </SimpleGrid>
  );
}
