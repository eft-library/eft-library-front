import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function NoEntry({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M14,2A12,12,0,1,0,26,14,12,12,0,0,0,14,2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.RED}
          d="M14,3A11,11,0,1,0,25,14,11,11,0,0,0,14,3Zm7,12H7V13H21Z"
        />
      </g>
    </>
  );
}
