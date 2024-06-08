import { SimpleGrid } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { type ReactNode } from "react";
import type { GridContents } from "@/types/types";

export default function GridContents({ children, columnDesign }: GridContents) {
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={"95%"}
      outline={"1px solid"}
      outlineColor={ALL_COLOR.WHITE}
      borderRadius={"lg"}
      p={2}
      mb={4}
    >
      {children}
    </SimpleGrid>
  );
}
