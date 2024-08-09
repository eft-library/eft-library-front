import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { SVG } from "@/types/types";

export default function Etc({ color, width, height, opacity, x, y }: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
    >
      <rect
        className="cls-1"
        fill={ALL_COLOR.WHITE}
        x="7.37"
        y="7.51"
        width="6.34"
        height="6.34"
      />
      <path d="M6.87,7V21.18H21V7H6.87ZM13.71,20.7H7.37V14.35h6.34ZM7.37,13.85V7.51h6.34v6.34ZM20.56,20.7H14.21V14.35h6.35ZM14.21,7.51h6.35v6.34H14.21Z" />
      <rect
        className="cls-2"
        fill={ALL_COLOR.ETC_TWO}
        x="14.21"
        y="7.51"
        width="6.34"
        height="6.34"
      />
      <rect
        className="cls-3"
        fill={ALL_COLOR.ETC_THREE}
        x="7.37"
        y="14.35"
        width="6.34"
        height="6.34"
      />
      <rect
        className="cls-4"
        fill={ALL_COLOR.ETC_FOUR}
        x="14.21"
        y="14.35"
        width="6.34"
        height="6.34"
      />
      <path
        className="cls-1"
        fill={ALL_COLOR.WHITE}
        d="M21,6.53H6.37V21.68H21.53V6.53Zm0,7.32v7.33H6.87V7H21Z"
      />
    </svg>
  );
}
