import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function SniperScavSpawn({ width, height, opacity, x, y }: SVG) {
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
      <circle
        fill={ALL_COLOR.RED}
        className="cls-1"
        cx="13.99"
        cy="13.96"
        r="10"
      />
      <path d="M25,13.46A11,11,0,0,0,14.49,3V1h-1V3A11,11,0,0,0,3,13.46H1v1H3A11,11,0,0,0,13.49,24.93v2h1v-2A11,11,0,0,0,25,14.46h2v-1Zm-1,1a10,10,0,0,1-9.48,9.47V20h-1v4A10,10,0,0,1,4,14.46H8v-1H4A10,10,0,0,1,13.49,4V8h1V4A10,10,0,0,1,24,13.46H20v1Z" />
      <circle cx="13.99" cy="10.96" r="2" />
      <path d="M14,13s-4,0-4,3v3h8V16C18,13,14,13,14,13Z" />
    </svg>
  );
}
