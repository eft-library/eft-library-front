import { ALL_COLOR } from "@/util/consts/colorConsts";
import Chzzk from "@/assets/chzzk";
import Github from "@/assets/github";
import Youtube from "@/assets/youtube";
import ExtractionSVG from "@/assets/extractionSVG";
import { type DynamicSVG } from "@/types/types";

export default function DynamicSVG({ x, y, svgValue, isEnable }: DynamicSVG) {
  const itemHeight = 25;
  const itemWidth = 25;
  const footerHeigth = 40;
  const footerWidth = 40;
  switch (svgValue) {
    case "PMC_EXTRACTION":
      return (
        <ExtractionSVG
          x={x}
          y={y}
          height={itemHeight}
          width={itemWidth}
          color={ALL_COLOR.PMC_EXTRACTION}
          opacity={isEnable ? "1" : "0.5"}
        />
      );
    case "SCAV_EXTRACTION":
      return (
        <ExtractionSVG
          x={x}
          y={y}
          height={itemHeight}
          width={itemWidth}
          color={ALL_COLOR.SCAV_EXTRACTION}
          opacity={isEnable ? "1" : "0.5"}
        />
      );
    case "SHARED_EXTRACTION":
      return (
        <ExtractionSVG
          x={x}
          y={y}
          height={itemHeight}
          width={itemWidth}
          color={ALL_COLOR.SHARED_EXTRACTION}
          opacity={isEnable ? "1" : "0.5"}
        />
      );
    case "HJ":
      return <Chzzk height={footerHeigth} width={footerWidth} />;
    case "SY":
      return <Github height={footerHeigth} width={footerWidth} />;
    case "JY":
      return <Youtube height={footerHeigth} width={footerWidth} />;
  }
}
