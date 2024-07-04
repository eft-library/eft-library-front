import { SimpleGrid } from "@chakra-ui/react";
import type { GridContents } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridContents({
  children,
  columnDesign,
  id,
  contentsWidth = "95%",
  isHideout = false,
}: GridContents) {
  const { blackWhite } = useColorValue();
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={contentsWidth}
      outline={"1px solid"}
      outlineColor={blackWhite}
      borderRadius={"lg"}
      justifyItems={isHideout ? "center" : ""}
      p={2}
      mb={4}
      id={id}
    >
      {children}
    </SimpleGrid>
  );
}
