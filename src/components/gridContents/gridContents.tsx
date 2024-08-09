import { SimpleGrid } from "@chakra-ui/react";
import type { GridContents } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function GridContents({
  children,
  columnDesign,
  id,
  contentsWidth = "95%",
  isHideout = false,
  padding = 0,
}: GridContents) {
  const param = useSearchParams();

  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={contentsWidth}
      outline={"1px solid"}
      outlineColor={ALL_COLOR.WHITE}
      borderRadius={"lg"}
      justifyItems={isHideout ? "center" : ""}
      p={2}
      mb={4}
      id={id}
      padding={padding}
      bg={param.get("id") === id ? ALL_COLOR.HILIGHT_GRAY : ""}
    >
      {children}
    </SimpleGrid>
  );
}
