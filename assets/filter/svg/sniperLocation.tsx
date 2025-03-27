import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function SniperLocation({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.Red}
        className="cls-1"
        d="M18,13.46h6A10,10,0,0,0,14.49,4v6h-1V4A10,10,0,0,0,4,13.46h6v1H4a10,10,0,0,0,9.47,9.47V18h1v6A10,10,0,0,0,24,14.46H18Zm-1,.75H14.24V17h-.5V14.21H11v-.5h2.75V11h.5v2.75H17Z"
      />
      <path d="M14,3A11,11,0,1,0,25,14,11,11,0,0,0,14,3ZM4,14Zm10.5,10V18h-1v6A10,10,0,0,1,4,14.46h6v-1H4A10,10,0,0,1,13.49,4v6h1V4A10,10,0,0,1,24,13.46H18v1h6A10,10,0,0,1,14.49,23.93Z" />
      <polygon points="14.24 10.96 13.74 10.96 13.74 13.71 10.99 13.71 10.99 14.21 13.74 14.21 13.74 16.96 14.24 16.96 14.24 14.21 16.99 14.21 16.99 13.71 14.24 13.71 14.24 10.96" />
    </svg>
  );
}
