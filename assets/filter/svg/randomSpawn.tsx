import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function RandomSpawn({ width, height, opacity, x, y }: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
      viewBox="0 0 28 28"
    >
      <rect
        fill={ALL_COLOR.PureWhite}
        className="cls-1"
        x="7.36"
        y="7.47"
        width="6.34"
        height="6.34"
      />
      <path d="M6.86,7V21.14H21V7H6.86ZM13.7,20.65H7.36V14.31H13.7ZM7.36,13.81V7.47H13.7v6.34Zm13.19,6.84H14.21V14.31h6.34ZM14.21,7.47h6.34v6.34H14.21Z" />
      <rect
        fill={ALL_COLOR.ScarletRed}
        className="cls-2"
        x="14.21"
        y="7.47"
        width="6.34"
        height="6.34"
      />
      <rect
        fill={ALL_COLOR.ElectricBlue}
        className="cls-3"
        x="7.36"
        y="14.31"
        width="6.34"
        height="6.34"
      />
      <rect
        fill={ALL_COLOR.LemonYellow}
        className="cls-4"
        x="14.21"
        y="14.31"
        width="6.34"
        height="6.34"
      />
    </svg>
  );
}
