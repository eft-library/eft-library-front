import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function Drawers({ color, width, height, opacity, x, y }: SVG) {
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
      <rect
        className="cls-1"
        fill={ALL_COLOR.WHITE}
        x="7.08"
        y="1.02"
        width="14"
        height="26"
      />
      <path
        className="cls-2"
        fill={ALL_COLOR.DRAWERS_TWO}
        d="M9.1,13.17h10V8.67H9.1ZM13,9.11h2.32v1H13Z"
      />
      <path
        className="cls-2"
        fill={ALL_COLOR.DRAWERS_TWO}
        d="M9.1,19h10V14.17H9.1ZM13,14.58h2.32v1H13Z"
      />
      <path
        className="cls-2"
        fill={ALL_COLOR.DRAWERS_TWO}
        d="M9.1,25h10V20H9.1ZM13,20.44h2.32v1H13Z"
      />
      <path
        className="cls-2"
        fill={ALL_COLOR.DRAWERS_TWO}
        d="M9.1,7.67h10V3H9.1ZM13,3.5h2.32v1H13Z"
      />
      <path d="M8.1,2V26h12V2Zm11,23H9.1V20h10Zm0-6.07H9.1V14.17h10Zm0-5.78H9.1V8.67h10Zm0-5.5H9.1V3h10Z" />
      <rect x="12.99" y="3.5" width="2.31" height="1" />
      <rect x="12.99" y="9.11" width="2.31" height="1" />
      <rect x="12.99" y="14.58" width="2.31" height="1" />
      <rect x="12.99" y="20.44" width="2.31" height="1" />
    </svg>
  );
}