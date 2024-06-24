import { SimpleGrid, Text, GridItem } from "@chakra-ui/react";
import type { GridTitle } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridTitle({
  columnDesign,
  column,
  isShadow,
  shadowColor,
  isWeapon = false,
  isAmmo = false,
}: GridTitle) {
  const { blackWhite, whiteBlack } = useColorValue();

  const checkColSpan = (index: number) => {
    if (isWeapon) {
      if (index === 0) {
        return 2;
      } else {
        1;
      }
    } else if (isAmmo) {
      if (index === 9) {
        return 2;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  };

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
        <GridItem key={item} colSpan={checkColSpan(index)}>
          <Text
            flexGrow={1}
            color={blackWhite}
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
