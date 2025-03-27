import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function DeadBody({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.PaleSilver}
        className="cls-1"
        d="M19.89,4.41H8.17v16.7H19.89ZM16.57,9.57v.75H14.78V16.2h-1.5V10.32H11.49V8.82h1.79V7h1.5V8.82h1.79Z"
      />
      <rect
        fill={ALL_COLOR.PaleSilver}
        className="cls-1"
        x="4.49"
        y="22.11"
        width="19"
        height="1"
      />
      <path d="M20.89,3.41H7.17v17.7H3.49v3h21v-3h-3.6Zm-12.72,1H19.89v16.7H8.17Zm15.32,17.7v1h-19v-1Z" />
      <polygon points="14.78 7.04 14.03 7.04 13.28 7.04 13.28 8.82 11.49 8.82 11.49 10.32 13.28 10.32 13.28 16.2 14.78 16.2 14.78 10.32 16.57 10.32 16.57 9.57 16.57 8.82 14.78 8.82 14.78 7.04" />
    </svg>
  );
}
