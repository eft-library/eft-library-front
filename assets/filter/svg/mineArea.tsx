import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function MineArea({ width, height, opacity, x, y }: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 25"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
    >
      <path
        fill={ALL_COLOR.SunshineYellow}
        className="cls-1"
        d="M26.15,3,28,2H2L15,22,28,2Z"
      />
      <path
        fill={ALL_COLOR.ForestGreen}
        className="cls-2"
        d="M20,9h0A.11.11,0,0,1,20,9h0c-.07-1.12-2.22-2-5-2s-4.89.87-5,2h0A.07.07,0,0,0,10,9h0a4.47,4.47,0,0,0,0,1c.62,2,4.79,2,5,2s4.35,0,5-2A4.73,4.73,0,0,0,20,9Zm-.48.88"
      />
      <path d="M20,9h0A.11.11,0,0,1,20,9h0c-.07-1.12-2.22-2-5-2s-4.89.87-5,2h0A.07.07,0,0,0,10,9h0a4.47,4.47,0,0,0,0,1c.62,2,4.79,2,5,2s4.35,0,5-2A4.73,4.73,0,0,0,20,9ZM15,7.41c2.66,0,4.5.84,4.5,1.59s-1.84,1.59-4.5,1.59-4.5-.83-4.5-1.59S12.34,7.41,15,7.41Zm0,4.09s-4,0-4.5-1.61v0A7.27,7.27,0,0,0,15,11.05a7.37,7.37,0,0,0,4.5-1.17C18.93,11.48,15,11.5,15,11.5Z" />
      <ellipse
        fill={ALL_COLOR.RED}
        className="cls-3"
        cx="14.99"
        cy="8.46"
        rx="1"
        ry="0.5"
      />
      <path d="M15,8.16c.5,0,.8.19.8.3s-.3.3-.8.3-.8-.2-.8-.3.31-.3.8-.3M15,8c-.55,0-1,.22-1,.5s.45.5,1,.5,1-.23,1-.5S15.55,8,15,8Z" />
      <path
        fill={ALL_COLOR.RED}
        className="cls-3"
        d="M26.15,3,15,20.12,3.84,3H26.15M28,2H2L15,22,28,2Z"
      />
    </svg>
  );
}
