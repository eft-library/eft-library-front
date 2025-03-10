import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function MedCase({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M19,9V6H9V9H2.27V23h24V9Zm6.23,2V22h-22V10h6.79V7h8v3h7.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          x="11.06"
          y="8"
          width="6"
          height="2"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.MED_CASE_TWO}
          d="M17.06,11H4.27v4.5h20V11H17.06Zm-1.5,2.67H14.44v1.12h-.75V13.67H12.56v-.75h1.13V11.79h.75v1.13h1.12Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-3"
          fill={ALL_COLOR.MED_CASE_THREE}
          x="4.27"
          y="16.5"
          width="20"
          height="4.5"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M18.06,10V7h-8v3H3.27V22h22V10H18.06Zm-7-2h6v2h-6ZM24.27,21h-20V16.5h20Zm0-5.5h-20V11h20Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-4"
          fill={ALL_COLOR.RED}
          points="14.44 11.79 13.69 11.79 13.69 12.92 12.56 12.92 12.56 13.67 13.69 13.67 13.69 14.79 14.44 14.79 14.44 13.67 15.56 13.67 15.56 12.92 14.44 12.92 14.44 11.79"
        />
      </g>
    </>
  );
}
