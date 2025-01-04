import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function SniperScavSpawn({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M28,12.49h-2A12,12,0,0,0,15.5,2.1V0h-3V2.12A12,12,0,0,0,2.16,12.5H0v3H2.15A12,12,0,0,0,12.5,25.89V28h3V25.9A12,12,0,0,0,25.94,15.5H28Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <circle className="cls-2" fill={ALL_COLOR.RED} cx="14" cy="14" r="10" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M25,13.5A11,11,0,0,0,14.5,3V1h-1V3A11,11,0,0,0,3,13.5H1v1H3A11,11,0,0,0,13.5,25v2h1V25A11,11,0,0,0,25,14.5h2v-1Zm-1,1A10,10,0,0,1,14.5,24V20h-1v4A10,10,0,0,1,4,14.5H8v-1H4A10,10,0,0,1,13.5,4V8h1V4A10,10,0,0,1,24,13.5H20v1Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <circle cx="14" cy="11" r="2" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M14,13s-4,0-4,3v3h8V16C18,13,14,13,14,13Z" />
      </g>
    </>
  );
}
