import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function NoEntry({ width, height, opacity, x, y }: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
    >
      <path
        fill={ALL_COLOR.PureWhite}
        className="cls-1"
        d="M14,3A11,11,0,1,0,25,14,11,11,0,0,0,14,3Z"
      />
      <path
        fill={ALL_COLOR.RED}
        className="cls-2"
        d="M14,3A11,11,0,1,0,25,14,11,11,0,0,0,14,3Zm7,12H7V13H21Z"
      />
    </svg>
  );
}
