import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function Suitcase({ color, width, height, opacity, x, y }: SVG) {
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
      <path
        className="cls-1"
        fill={ALL_COLOR.SUITCASE_ONE}
        d="M11.11,24.15a.91.91,0,0,1-1.82,0"
      />
      <path
        className="cls-1"
        fill={ALL_COLOR.SUITCASE_ONE}
        d="M18.7,24.15a.91.91,0,0,1-1.82,0"
      />
      <rect
        className="cls-2"
        fill={ALL_COLOR.SUITCASE_TWO}
        x="7.82"
        y="8.08"
        width="12.36"
        height="15.6"
      />
      <rect
        className="cls-3"
        stroke={ALL_COLOR.SUITCASE_THREE}
        strokeMiterlimit={10}
        fill="none"
        x="7.82"
        y="8.08"
        width="12.36"
        height="15.6"
        rx="0.65"
      />
      <rect
        className="cls-3"
        stroke={ALL_COLOR.SUITCASE_THREE}
        strokeMiterlimit={10}
        fill="none"
        x="11.28"
        y="3.57"
        width="5.49"
        height="4.51"
      />
      <rect
        className="cls-3"
        stroke={ALL_COLOR.SUITCASE_THREE}
        strokeMiterlimit={10}
        fill="none"
        x="11.28"
        y="2.94"
        width="5.49"
        height="0.63"
      />
      <rect
        className="cls-4"
        strokeWidth="0.5px"
        stroke={ALL_COLOR.SUITCASE_THREE}
        strokeMiterlimit={10}
        fill="none"
        x="9.33"
        y="9.75"
        width="9.4"
        height="2.11"
        rx="0.37"
      />
      <rect
        className="cls-4"
        strokeWidth="0.5px"
        stroke={ALL_COLOR.SUITCASE_THREE}
        strokeMiterlimit={10}
        fill="none"
        x="9.33"
        y="13.02"
        width="9.4"
        height="2.11"
        rx="0.37"
      />
      <rect
        className="cls-4"
        strokeWidth="0.5px"
        stroke={ALL_COLOR.SUITCASE_THREE}
        strokeMiterlimit={10}
        fill="none"
        x="9.33"
        y="16.45"
        width="9.4"
        height="2.11"
        rx="0.37"
      />
      <rect
        className="cls-4"
        strokeWidth="0.5px"
        stroke={ALL_COLOR.SUITCASE_THREE}
        strokeMiterlimit={10}
        fill="none"
        x="9.33"
        y="19.89"
        width="9.4"
        height="2.11"
        rx="0.37"
      />
      <path
        className="cls-4"
        strokeWidth="0.5px"
        stroke={ALL_COLOR.SUITCASE_THREE}
        strokeMiterlimit={10}
        fill="none"
        d="M11.11,24.15a.91.91,0,0,1-1.82,0"
      />
      <path
        className="cls-4"
        strokeWidth="0.5px"
        stroke={ALL_COLOR.SUITCASE_THREE}
        strokeMiterlimit={10}
        fill="none"
        d="M18.7,24.15a.91.91,0,0,1-1.82,0"
      />
    </svg>
  );
}
