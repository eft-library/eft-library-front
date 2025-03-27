import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function MedItem({ width, height, opacity, x, y }: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
      viewBox="0 0 28 28"
    >
      <polygon
        fill={ALL_COLOR.Red}
        className="cls-1"
        points="15.76 7.48 13.44 7.48 13.44 12.75 8.15 12.75 8.15 15.07 13.44 15.07 13.44 20.37 15.76 20.37 15.76 15.07 21.04 15.08 21.04 12.75 15.76 12.75 15.76 7.48"
      />
      <path
        fill={ALL_COLOR.EbonyShade}
        className="cls-2"
        d="M16.26,12.25V7H12.94v5.27H7.65v3.32h5.29v5.3h3.32v-5.3h5.28V12.25ZM21,15.08H15.76v5.3H13.44v-5.3H8.15V12.75h5.29V7.48h2.32v5.27H21Z"
      />
    </svg>
  );
}
