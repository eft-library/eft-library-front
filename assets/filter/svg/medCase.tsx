import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function MedCase({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.PeachCream}
        className="cls-1"
        d="M17.06,11H4.27v4.5h20V11H17.06Zm-1.5,2.66H14.43v1.13h-.75V13.62H12.56v-.75h1.12V11.75h.75v1.12h1.13Z"
      />
      <rect
        fill={ALL_COLOR.GoldenSunrise}
        className="cls-2"
        x="4.27"
        y="16.46"
        width="20"
        height="4.5"
      />
      <path d="M18.06,10V7h-8v3H3.27V22h22V10H18.06Zm-7-2h6v2h-6ZM24.27,21h-20v-4.5h20Zm0-5.5h-20V11h20Z" />
      <polygon
        fill={ALL_COLOR.RED}
        className="cls-3"
        points="14.43 11.75 13.68 11.75 13.68 12.88 12.55 12.88 12.55 13.63 13.68 13.63 13.68 14.75 14.43 14.75 14.43 13.63 15.55 13.63 15.55 12.88 14.43 12.88 14.43 11.75"
      />
    </svg>
  );
}
