import { SimpleGrid } from "@chakra-ui/react";
import type { GridContents } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import { useSearchParams } from "next/navigation";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function GridContents({
  children,
  columnDesign,
  id,
  contentsWidth = "95%",
  isHideout = false,
}: GridContents) {
  const param = useSearchParams();
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
      bg={param.get("id") === id ? ALL_COLOR.MED_BAG_FIVE : ""}
    >
      {children}
    </SimpleGrid>
  );
}
