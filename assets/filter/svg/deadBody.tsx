import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function DeadBody({ color, width, height, opacity, x, y }: SVG) {
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
        className="cls-1"
        fill={ALL_COLOR.DEAD_BODY_ONE}
        d="M19.9,4.45H8.18v16.7H19.9ZM16.57,9.61v.75H14.79v5.88h-1.5V10.36H11.5V8.86h1.79V7.08h1.5V8.86h1.78Z"
      />
      <path
        className="cls-2"
        fill={ALL_COLOR.WHITE}
        d="M21.84,20.26V2.52H6.23V20.36H2.6V25H25.4V20.26Zm2.65,3.89h-21v-3H7.18V3.45H20.9v17.7h3.59Z"
      />
      <rect
        className="cls-1"
        fill={ALL_COLOR.DEAD_BODY_ONE}
        x="4.49"
        y="22.15"
        width="19"
        height="1"
      />
      <path d="M20.9,3.45H7.18v17.7H3.49v3h21v-3H20.9Zm-12.72,1H19.9v16.7H8.18Zm15.31,17.7v1h-19v-1Z" />
      <polygon points="14.79 7.08 14.04 7.08 13.29 7.08 13.29 8.86 11.5 8.86 11.5 10.36 13.29 10.36 13.29 16.24 14.79 16.24 14.79 10.36 16.57 10.36 16.57 9.61 16.57 8.86 14.79 8.86 14.79 7.08" />
    </svg>
  );
}
