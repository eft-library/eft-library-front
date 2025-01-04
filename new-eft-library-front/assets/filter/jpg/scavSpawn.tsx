import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function ScavSpawn({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M14.4,16.46C16.26,13.4,18,10,18,7.93a8,8,0,0,0-16,0C2,10,3.74,13.4,5.6,16.46c-3.31.74-5.6,2.27-5.6,4C0,23,4.48,25,10,25s10-2,10-4.5C20,18.73,17.71,17.2,14.4,16.46Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.RED}
          d="M10,18,2,20.5m16,0M10,18m0-1c-5,0-9,1.57-9,3.5S5,24,10,24s9-1.57,9-3.5S15,17,10,17Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M10,18c5.18,0,8,1.65,8,2.5S15.18,23,10,23s-8-1.65-8-2.5S4.82,18,10,18m0-1c-5,0-9,1.57-9,3.5S5,24,10,24s9-1.57,9-3.5S15,17,10,17Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.RED}
          d="M3,7.9A7,7,0,0,1,10,1a7,7,0,0,1,7,6.9C17,11.71,10,21,10,21S3,11.71,3,7.9Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M10,2a6,6,0,0,1,6,5.9c0,2.5-3.8,8.33-6,11.41C7.8,16.23,4,10.4,4,7.9A6,6,0,0,1,10,2m0-1A7,7,0,0,0,3,7.9C3,11.71,10,21,10,21s7-9.29,7-13.1A7,7,0,0,0,10,1Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <circle cx="10" cy="6" r="1.5" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M10,7.5s-3,0-3,2.25V12h6V9.75C13,7.5,10,7.5,10,7.5Z" />
      </g>
    </>
  );
}
