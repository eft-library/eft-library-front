import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function PmcSpawn({ width, height, opacity, x, y }: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 28"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
    >
      <path
        fill={ALL_COLOR.EmeraldGreen}
        className="cls-1"
        d="M10,20c-5,0-9,1.56-9,3.5S5,27,10,27s9-1.57,9-3.5S15,20,10,20Z"
      />
      <path d="M10,20h-.5v1h1V20Z" />
      <path d="M18.91,23a1,1,0,0,0-.09-.21c0-.05-.05-.09-.07-.14l-.13-.18a.53.53,0,0,0-.12-.14,1.14,1.14,0,0,0-.15-.17L18.19,22,18,21.87l-.2-.14-.19-.13-.26-.15-.17-.09-.34-.17-.09,0a13.12,13.12,0,0,0-3-.88h0l-.71-.11h0c-.24,0-.49-.07-.74-.09h0L11.49,20v1c4.22.28,6.5,1.69,6.5,2.45S15.17,26,10,26s-8-1.65-8-2.5S4.28,21.29,8.49,21V20l-.76.06h0c-.24,0-.49.05-.73.09h0l-.72.11h0a13.37,13.37,0,0,0-3,.88l-.08,0-.34.17-.17.09-.26.15-.19.13-.2.14L1.8,22l-.16.14-.16.17-.12.14-.12.18a1,1,0,0,1-.08.14,1.8,1.8,0,0,0-.08.21s0,.08,0,.12a1.27,1.27,0,0,0-.05.34C1,25.39,5,27,10,27s9-1.57,9-3.5a1.27,1.27,0,0,0,0-.34S18.92,23,18.91,23Z" />
      <path d="M14,5a4,4,0,1,0-4.5,4V23h1v-14A4,4,0,0,0,14,5Z" />
      <circle
        fill={ALL_COLOR.EmeraldGreen}
        className="cls-1"
        cx="9.99"
        cy="4.96"
        r="3"
      />
    </svg>
  );
}
