import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { SVG } from "@/types/types";

export default function MineArea({ color, width, height, opacity, x, y }: SVG) {
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
        className="cls-1"
        fill={ALL_COLOR.WHITE}
        d="M27.87,2.15,30,1H0L15,24,30,1Z"
      />
      <path
        className="cls-2"
        fill={ALL_COLOR.MINE_AREA_TWO}
        d="M26.16,3,28,2H2L15,22,28,2Z"
      />
      <path
        className="cls-3"
        fill={ALL_COLOR.MINE_AREA_THREE}
        d="M20,9.05h0V9h0c-.07-1.12-2.22-2-5-2s-4.89.87-5,2h0V9h0a3.83,3.83,0,0,0,0,1c.61,2,4.78,2,5,2s4.35,0,5-2A4,4,0,0,0,20,9.05Zm-.47.87"
      />
      <path d="M20,9.05h0V9h0c-.07-1.12-2.22-2-5-2s-4.89.87-5,2h0V9h0a3.83,3.83,0,0,0,0,1c.61,2,4.78,2,5,2s4.35,0,5-2A4,4,0,0,0,20,9.05Zm-5-1.6c2.65,0,4.5.84,4.5,1.6s-1.85,1.59-4.5,1.59-4.5-.84-4.5-1.59S12.35,7.45,15,7.45Zm0,4.1s-4,0-4.5-1.62h0A7.33,7.33,0,0,0,15,11.09a7.3,7.3,0,0,0,4.5-1.17C18.94,11.53,15,11.55,15,11.55Z" />
      <ellipse
        className="cls-4"
        fill={ALL_COLOR.RED}
        cx="15"
        cy="8.5"
        rx="1"
        ry="0.5"
      />
      <path d="M15,8.2c.5,0,.8.19.8.3s-.3.3-.8.3-.8-.19-.8-.3.3-.3.8-.3M15,8c-.55,0-1,.22-1,.5s.45.5,1,.5,1-.22,1-.5S15.55,8,15,8Z" />
      <path
        className="cls-4"
        fill={ALL_COLOR.RED}
        d="M26.16,3,15,20.17,3.84,3H26.16M28,2H2L15,22,28,2Z"
      />
    </svg>
  );
}
