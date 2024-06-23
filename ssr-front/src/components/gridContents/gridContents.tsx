import { SimpleGrid } from "@chakra-ui/react";
import type { GridContents } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridContents({
  children,
  columnDesign,
  id,
}: GridContents) {
  const { blackWhite } = useColorValue();
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={"95%"}
      outline={"1px solid"}
      outlineColor={blackWhite}
      borderRadius={"lg"}
      p={2}
      mb={4}
      id={id}
    >
      {children}
    </SimpleGrid>
  );
}
