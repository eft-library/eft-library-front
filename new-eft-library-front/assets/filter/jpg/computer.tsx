import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "@/types/types";

export default function Computer({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M16.51,6.66H2.84v16H25.68v-16Zm-.87,10.91H11.91v1.95h1.42v2.26H6.65V19.52H8V17.57H3.71V7.49H15.64Zm9.05,4.23h-8.1V7.52h8.1Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-2"
          fill={ALL_COLOR.COMPUTER_TWO}
          x="7.65"
          y="20.52"
          width="4.68"
          height="0.26"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-2"
          fill={ALL_COLOR.COMPUTER_TWO}
          x="8.98"
          y="17.57"
          width="1.94"
          height="1.94"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-3"
          fill={ALL_COLOR.COMPUTER_THREE}
          points="7.98 16.57 11.91 16.57 11.91 16.57 14.64 16.57 14.64 8.49 4.71 8.49 4.71 16.57 7.98 16.57 7.98 16.57"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M3.71,17.57H8v1.95H6.65v2.26h6.68V19.52H11.91V17.57h3.73V7.49H3.71Zm8.62,2.95v.26H7.65v-.26ZM9,19.51V17.57h1.93v1.94Zm-4.27-11h9.93v8.08H4.71Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-4"
          fill={ALL_COLOR.COMPUTER_FOUR}
          x="17.59"
          y="11.94"
          width="6.1"
          height="0.88"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-4"
          fill={ALL_COLOR.COMPUTER_FOUR}
          x="17.59"
          y="9.74"
          width="6.1"
          height="0.85"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-4"
          fill={ALL_COLOR.COMPUTER_FOUR}
          x="17.59"
          y="10.84"
          width="6.1"
          height="0.85"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.COMPUTER_FOUR}
          d="M23.69,8.52h-6.1v1h6.1Zm-1.56.81h-.25V8.65h.25Zm.47,0h-.25V8.65h.25Zm.48,0h-.25V8.65h.25Zm.47,0H23.3V8.65h.25Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-5"
          fill={ALL_COLOR.COMPUTER_FIVE}
          x="17.59"
          y="13.08"
          width="6.1"
          height="7.72"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M16.59,21.8h8.1V7.52h-8.1Zm1-13.28h6.1v1h-6.1Zm0,1.22h6.1v.85h-6.1Zm0,1.1h6.1v.85h-6.1Zm0,1.1h6.1v.89h-6.1Zm0,1.14h6.1V20.8h-6.1Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect x="21.88" y="8.65" width="0.25" height="0.68" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon points="22.35 9.33 22.48 9.33 22.6 9.33 22.6 8.65 22.35 8.65 22.35 9.33" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect x="22.83" y="8.65" width="0.25" height="0.68" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect x="23.3" y="8.65" width="0.25" height="0.68" />
      </g>
    </>
  );
}
