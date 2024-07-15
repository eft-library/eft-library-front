import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { JPG } from "@/types/types";

export default function ScavExtraction({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M2,9.93A8,8,0,0,1,10.05,2,8,8,0,0,1,18.1,9.93c0,4.38-8,15.07-8,15.07S2,14.31,2,9.93Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.SCAV_EXTRACTION_TWO}
          d="M3,9.9A7,7,0,0,1,10,3a7,7,0,0,1,7,6.9C17,13.71,10,23,10,23S3,13.71,3,9.9Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M10,4a6,6,0,0,1,6,5.9c0,2.5-3.8,8.33-6,11.41C7.8,18.23,4,12.4,4,9.9A6,6,0,0,1,10,4m0-1A7,7,0,0,0,3,9.9C3,13.71,10,23,10,23s7-9.29,7-13.1A7,7,0,0,0,10,3Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <circle cx="10" cy="9.73" r="1.5" />
      </g>
    </>
  );
}
