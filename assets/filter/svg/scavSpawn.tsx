import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function ScavSpawn({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.Red}
        className="cls-1"
        d="M10,18m-8,2.5,16,0M10,18m0-1c-5,0-9,1.56-9,3.5S5,24,10,24s9-1.57,9-3.5S15,17,10,17Z"
      />
      <path d="M10,18c5.18,0,8,1.65,8,2.5S15.17,23,10,23s-8-1.65-8-2.5S4.82,18,10,18m0-1c-5,0-9,1.56-9,3.5S5,24,10,24s9-1.57,9-3.5S15,17,10,17Z" />
      <path
        fill={ALL_COLOR.Red}
        className="cls-1"
        d="M3,7.85A7,7,0,0,1,10,1a7,7,0,0,1,7,6.89C17,11.66,10,21,10,21S3,11.66,3,7.85Z"
      />
      <path d="M10,2a6,6,0,0,1,6,5.89c0,2.51-3.8,8.34-6,11.42-2.2-3.08-6-8.91-6-11.42A6,6,0,0,1,10,2m0-1A7,7,0,0,0,3,7.85C3,11.66,10,21,10,21s7-9.3,7-13.11A7,7,0,0,0,10,1Z" />
      <circle cx="9.99" cy="5.96" r="1.5" />
      <path d="M10,7.46s-3,0-3,2.25V12h6V9.71C13,7.46,10,7.46,10,7.46Z" />
    </svg>
  );
}
