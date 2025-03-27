import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function MarkedRoom({ width, height, opacity, x, y }: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 25"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
    >
      <path
        fill={ALL_COLOR.AquaBreeze}
        className="cls-1"
        d="M13,2,9.59,8.87,2,10l5.5,5.38L6.2,23,13,19.37,19.79,23l-1.3-7.6L24,10l-7.6-1.11L13,2Z"
      />
      <path d="M13,4.22,15.5,9.31l.23.47.52.08,5.6.82-4.06,4-.37.37.09.52.95,5.6-5-2.64L13,18.24l-.46.25-5,2.64,1-5.6L8.57,15l-.38-.37-4-4,5.6-.82.52-.08.23-.47L13,4.22M13,2,9.59,8.87,2,10l5.5,5.38L6.2,23,13,19.37,19.79,23l-1.3-7.6L24,10l-7.6-1.11L13,2Z" />
    </svg>
  );
}
