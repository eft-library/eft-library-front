import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function SharedExtraction({
  width,
  height,
  opacity,
  x,
  y,
}: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 26"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
    >
      <path
        fill={ALL_COLOR.LavenderDream}
        className="cls-1"
        d="M3,9.85A7,7,0,0,1,10,3a7,7,0,0,1,7,6.89C17,13.66,10,23,10,23S3,13.66,3,9.85Z"
      />
      <path d="M10,4a6,6,0,0,1,6,5.89c0,2.51-3.8,8.34-6,11.42-2.2-3.08-6-8.91-6-11.42A6,6,0,0,1,10,4m0-1A7,7,0,0,0,3,9.85C3,13.66,10,23,10,23s7-9.3,7-13.11A7,7,0,0,0,10,3Z" />
      <circle cx="9.99" cy="9.69" r="1.5" />
    </svg>
  );
}
