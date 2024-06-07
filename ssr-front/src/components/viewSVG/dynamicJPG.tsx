import { ALL_COLOR } from "@/util/consts/colorConsts";
import ExtractionJPG from "@/assets/extractionJPG";
import type { AllColorKeys } from "@/util/consts/colorConsts";

interface DynamicJPGType {
  x: number;
  y: number;
  svgValue: AllColorKeys | string;
}

export default function DynamicJPG({ x, y, svgValue }: DynamicJPGType) {
  return <ExtractionJPG x={x} y={y} color={ALL_COLOR[svgValue]} />;
}
