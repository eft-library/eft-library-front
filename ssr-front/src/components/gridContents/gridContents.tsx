import { SimpleGrid } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { type ReactNode } from "react";

interface GridContentsType {
  children: ReactNode;
  columnDesign: Array<number | null>;
}

export default function GridContents({
  children,
  columnDesign,
}: GridContentsType) {
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
