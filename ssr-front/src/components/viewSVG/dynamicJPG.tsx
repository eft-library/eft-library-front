import { ALL_COLOR } from "@/util/consts/colorConsts";
import ExtractionJPG from "@/assets/extractionJPG";
import type { DynamicJPG } from "@/types/types";

export default function DynamicJPG({ x, y, svgValue }: DynamicJPG) {
  return <ExtractionJPG x={x} y={y} color={ALL_COLOR[svgValue]} />;
}
