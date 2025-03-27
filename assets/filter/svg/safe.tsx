import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function Safe({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.DustySilver}
        className="cls-1"
        d="M22.86,5.48h-17v17h17ZM21.42,21h-14V7h14Z"
      />
      <circle
        fill={ALL_COLOR.DustySilver}
        className="cls-1"
        cx="11.07"
        cy="14.58"
        r="0.5"
      />
      <path
        fill={ALL_COLOR.DustySilver}
        className="cls-1"
        d="M20.42,18.08h-.7v-2h.7v-4h-.7v-2h.7V8h-12V20h12Zm-9.35-2a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,11.07,16.08Z"
      />
      <path d="M4.86,23.48h19v-19h-19Zm1-18h17v17h-17Z" />
      <path d="M7.42,21h14V7h-14Zm1-13h12v2.11h-.7v2h.7v4h-.7v2h.7V20h-12Z" />
      <path d="M11.07,13.08a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,11.07,13.08Zm0,2a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5.51.51,0,0,1,.5.5A.5.5,0,0,1,11.07,15.08Z" />
    </svg>
  );
}
