import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function Safe({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M3.92,3.5v21h21V3.5Zm20,20h-19v-19h19Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.SAFE_TWO}
          d="M22.87,5.52h-17v17h17ZM21.42,21h-14V7h14Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <circle
          className="cls-2"
          fill={ALL_COLOR.SAFE_TWO}
          cx="11.07"
          cy="14.62"
          r="0.5"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.SAFE_TWO}
          d="M20.42,18.12h-.69v-2h.69v-4h-.69v-2h.69V8h-12V20h12Zm-9.35-2a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,11.07,16.12Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M4.87,23.52h19v-19h-19Zm1-18h17v17h-17Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M7.42,21h14V7h-14Zm1-13h12v2.11h-.69v2h.69v4h-.69v2h.69V20h-12Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M11.07,13.12a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,11.07,13.12Zm0,2a.5.5,0,0,1-.5-.5.51.51,0,0,1,.5-.5.5.5,0,0,1,.5.5A.5.5,0,0,1,11.07,15.12Z" />
      </g>
    </>
  );
}
