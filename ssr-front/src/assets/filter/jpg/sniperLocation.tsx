import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { JPG } from "@/types/types";

export default function SniperLocation({ x, y }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M14,2A12,12,0,1,0,26,14,12,12,0,0,0,14,2Zm0,23A11,11,0,1,1,25,14,11,11,0,0,1,14,25Z"
        />
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.RED}
          d="M18,13.5h6A10,10,0,0,0,14.5,4v6h-1V4A10,10,0,0,0,4,13.5h6v1H4A10,10,0,0,0,13.5,24V18h1v6A10,10,0,0,0,24,14.5H18Zm-1,.75H14.25V17h-.5V14.25H11v-.5h2.75V11h.5v2.75H17Z"
        />
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <path d="M14,3A11,11,0,1,0,25,14,11,11,0,0,0,14,3ZM4,14ZM14.5,24V18h-1v6A10,10,0,0,1,4,14.5h6v-1H4A10,10,0,0,1,13.5,4v6h1V4A10,10,0,0,1,24,13.5H18v1h6A10,10,0,0,1,14.5,24Z" />
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <polygon points="14.25 11 13.75 11 13.75 13.75 11 13.75 11 14.25 13.75 14.25 13.75 17 14.25 17 14.25 14.25 17 14.25 17 13.75 14.25 13.75 14.25 11" />
      </g>
    </>
  );
}
