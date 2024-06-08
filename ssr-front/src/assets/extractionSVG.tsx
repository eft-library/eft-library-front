import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { ExtractionSVG } from "@/types/types";

export default function ExtractionSVG({
  color,
  width,
  height,
  opacity,
  x,
  y,
}: ExtractionSVG) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
      viewBox="0 0 22 32"
      //   style={{ enableBackground: "new 0 0 22 32" }}
      xmlSpace="preserve"
    >
      <g>
        <rect x="0" fill={ALL_COLOR.WHITE} width="24" height="34" />
      </g>
      <g>
        <path
          fill={ALL_COLOR.BLACK}
          d="M22,2v30H2V2H22 M23,1H1v32h22V1L23,1z"
        />
      </g>
      <g>
        <path
          fill={ALL_COLOR.BLACK}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          fill={ALL_COLOR.BLACK}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          fill={ALL_COLOR.BLACK}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          fill={ALL_COLOR.BLACK}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          fill={ALL_COLOR.BLACK}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          fill={ALL_COLOR.BLACK}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <polygon
          fill={color ? color : ALL_COLOR.SVG_EXTRACTION_BLUE}
          points="23,1 7,4.76 7,29.24 23,33 	"
        />
      </g>
      <g>
        <path
          fill={ALL_COLOR.BLACK}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <path
        fill={ALL_COLOR.BLACK}
        d="M22,2v29.74L8,28.44V5.56l14-3.29 M23,1L7,4.76v24.47L23,33V1L23,1z"
      />
      <g>
        <path
          fill={ALL_COLOR.BLACK}
          d="M10,16c-0.55,0-1,0.45-1,1s0.45,1,1,1s1-0.45,1-1S10.55,16,10,16L10,16z"
        />
      </g>
    </svg>
  );
}
