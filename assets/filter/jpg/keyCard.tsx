import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function KeyCard({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          x="1.85"
          y="7"
          width="24.3"
          height="14.16"
          rx="2.74"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          x="3.12"
          y="8.03"
          width="21.84"
          height="12.08"
          rx="1.09"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M23.17,20.48H4.83A2.29,2.29,0,0,1,2.54,18.2V9.94A2.29,2.29,0,0,1,4.83,7.66H23.17a2.29,2.29,0,0,1,2.29,2.28V18.2A2.29,2.29,0,0,1,23.17,20.48ZM4.83,8.41A1.54,1.54,0,0,0,3.29,9.94V18.2a1.54,1.54,0,0,0,1.54,1.53H23.17a1.54,1.54,0,0,0,1.54-1.53V9.94a1.54,1.54,0,0,0-1.54-1.53Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <text
          className="cls-2"
          fontSize={"4px"}
          transform="translate(7.86 13.91)"
        >
          LABS
        </text>
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect x="4.15" y="12.91" width="0.5" height="2.31" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <line
          className="cls-3"
          x1="21.05"
          y1="8.4"
          x2="21.05"
          y2="19.73"
          fill="none"
          stroke={ALL_COLOR.KEY_CARD_THREE}
          strokeMiterlimit={10}
          strokeWidth={0.75}
        />
      </g>
    </>
  );
}
