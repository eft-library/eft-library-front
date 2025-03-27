import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function Computer({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.IronStorm}
        className="cls-1"
        x="7.64"
        y="20.48"
        width="4.68"
        height="0.26"
      />
      <rect
        fill={ALL_COLOR.IronStorm}
        className="cls-1"
        x="8.97"
        y="17.53"
        width="1.94"
        height="1.94"
      />
      <polygon
        fill={ALL_COLOR.SoftPeriwinkle}
        className="cls-2"
        points="7.97 16.53 11.91 16.53 11.91 16.53 14.63 16.53 14.63 8.45 4.71 8.45 4.71 16.53 7.97 16.53 7.97 16.53"
      />
      <path d="M3.71,17.53H8v1.95H6.64v2.26h6.68V19.48H11.91V17.53h3.72V7.45H3.71Zm8.61,2.95v.26H7.64v-.26ZM9,19.47V17.53h1.94v1.94Zm-4.26-11h9.92v8.08H4.71Z" />
      <rect
        fill={ALL_COLOR.FrostVeil}
        className="cls-3"
        x="17.58"
        y="11.9"
        width="6.1"
        height="0.88"
      />
      <rect
        fill={ALL_COLOR.FrostVeil}
        className="cls-3"
        x="17.58"
        y="9.7"
        width="6.1"
        height="0.85"
      />
      <rect
        fill={ALL_COLOR.FrostVeil}
        className="cls-3"
        x="17.58"
        y="10.8"
        width="6.1"
        height="0.85"
      />
      <path
        fill={ALL_COLOR.FrostVeil}
        className="cls-3"
        d="M23.68,8.47h-6.1v1h6.1Zm-1.56.82h-.25V8.6h.25Zm.48,0h-.25V8.6h.25Zm.48,0h-.25V8.6h.25Zm.46,0h-.25V8.6h.25Z"
      />
      <rect
        fill={ALL_COLOR.ShadowSlate}
        className="cls-4"
        x="17.58"
        y="13.03"
        width="6.1"
        height="7.72"
      />
      <path d="M16.58,21.76h8.1V7.47h-8.1Zm1-13.29h6.1v1h-6.1Zm0,1.23h6.1v.85h-6.1Zm0,1.1h6.1v.85h-6.1Zm0,1.1h6.1v.88h-6.1Zm0,1.13h6.1v7.73h-6.1Z" />
      <rect x="21.87" y="8.6" width="0.25" height="0.68" />
      <polygon points="22.35 9.29 22.47 9.29 22.6 9.29 22.6 8.61 22.35 8.61 22.35 9.29" />
      <rect x="22.83" y="8.6" width="0.25" height="0.68" />
      <rect x="23.29" y="8.6" width="0.25" height="0.68" />
    </svg>
  );
}
